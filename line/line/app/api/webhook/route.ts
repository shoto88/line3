import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { validateSignature } from '@line/bot-sdk';
import { getTicketMessage, getStatusMessage, getHoursMessage, getHolidayMessage, getTicketConfirmationMessage, getWaitingTimeMessage } from '../../../utils/flexMessage';
import { isBusinessHours } from '../../../utils/dateUtils';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!,
);

const config = {
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN!,
  channelSecret: process.env.LINE_CHANNEL_SECRET!,
};

async function replyMessage(replyToken: string, messages: any[]) {
  const url = 'https://api.line.me/v2/bot/message/reply';
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${config.channelAccessToken}`,
  };
  const body = JSON.stringify({ replyToken, messages });

  const response = await fetch(url, { method: 'POST', headers, body });
  return response.json();
}

async function getProfile(userId: string) {
  const url = `https://api.line.me/v2/bot/profile/${userId}`;
  const headers = {
    'Authorization': `Bearer ${config.channelAccessToken}`,
  };

  const response = await fetch(url, { method: 'GET', headers });
  return response.json();
}

export async function POST(request: Request) {
  const signature = request.headers.get('x-line-signature');
  const body = await request.text();

  if (!validateSignature(body, config.channelSecret, signature ?? '')) {
    return new NextResponse('Invalid signature', { status: 401 });
  }

  const events = JSON.parse(body).events;
  for (const event of events) {
    if (event.type === 'message' && event.message.type === 'text') {
      const userMessage = event.message.text;
      const replyToken = event.replyToken;
      const userId = event.source.userId;

      let messages: any[] = [];

      if (userMessage === '発券する') {
        const now = new Date();
        if (!isBusinessHours(now)) {
          messages = [getHoursMessage()];
        } else {
          const { data: settingData, error: settingError } = await supabase.from('settings').select('*').single();
          if (settingError) {
            console.error('Error fetching settings:', settingError);
            return new NextResponse('Internal Server Error', { status: 500 });
          }
          const setting = settingData!;
          messages = [getStatusMessage(setting.waiting_number, setting.current_number, setting.average_waiting_time), getTicketMessage(setting.waiting_number)];
        }
      } else if (userMessage === '発券') {
        const { data: existingTicket, error: existingTicketError } = await supabase.from('tickets').select('*').eq('user_id', userId).single();
        if (existingTicketError && existingTicketError.code !== 'PGRST116') {
          console.error('Error fetching existing ticket:', existingTicketError);
          return new NextResponse('Internal Server Error', { status: 500 });
        }

        if (existingTicket) {
          messages = [
            { type: 'text', text: 'すでに発券済みです。' },
            getTicketConfirmationMessage(existingTicket.ticket_number),
          ];
        } else {
          const { data: settingData, error: settingError } = await supabase.from('settings').select('*').single();
          if (settingError) {
            console.error('Error fetching settings:', settingError);
            return new NextResponse('Internal Server Error', { status: 500 });
          }
          const setting = settingData!;
          const ticketNumber = setting.waiting_number + 1;
          const profile = await getProfile(userId);
          const userName = profile.displayName;

          const { error: insertError } = await supabase.from('tickets').insert({
            ticket_number: ticketNumber,
            user_name: userName,
            user_id: userId,
            issued_at: new Date(),
          });
          if (insertError) {
            console.error('Error inserting ticket:', insertError);
            return new NextResponse('Internal Server Error', { status: 500 });
          }

          const { error: updateError } = await supabase.from('settings').update({ waiting_number: ticketNumber }).eq('id', setting.id);
          if (updateError) {
            console.error('Error updating settings:', updateError);
            return new NextResponse('Internal Server Error', { status: 500 });
          }

          messages = [
            { type: 'text', text: 'https://www.melp.life/inquiries/new?c=F5moJ9k28I5SAZ2mhdE9ZhkeJU8E-g36-tExyIG78rPhc33sIrAuw3g4AWHLSg1Z' },
            getTicketConfirmationMessage(ticketNumber),
          ];
        }
      } else if (userMessage === 'キャンセル') {
        messages = [{ type: 'text', text: '発券をキャンセルしました。' }];
      } else if (userMessage === '今何番目？') {
        const { data: settingData, error: settingError } = await supabase.from('settings').select('*').single();
        if (settingError) {
          console.error('Error fetching settings:', settingError);
          return new NextResponse('Internal Server Error', { status: 500 });
        }
        const setting = settingData!;
        messages = [getStatusMessage(setting.waiting_number, setting.current_number, setting.average_waiting_time)];
      } else if (userMessage === '診察券') {
        const { data: existingTicket, error: existingTicketError } = await supabase.from('tickets').select('*').eq('user_id', userId).single();
        if (existingTicketError && existingTicketError.code !== 'PGRST116') {
          console.error('Error fetching existing ticket:', existingTicketError);
          return new NextResponse('Internal Server Error', { status: 500 });
        }

        if (existingTicket) {
          messages = [getTicketConfirmationMessage(existingTicket.ticket_number)];
        } else {
          messages = [{ type: 'text', text: 'まだ発券されていません。' }];
        }
      } else if (userMessage === '待ち時間') {
        const { data: existingTicket, error: existingTicketError } = await supabase.from('tickets').select('*').eq('user_id', userId).single();
        if (existingTicketError && existingTicketError.code !== 'PGRST116') {
          console.error('Error fetching existing ticket:', existingTicketError);
          return new NextResponse('Internal Server Error', { status: 500 });
        }

        if (existingTicket) {
          const { data: settingData, error: settingError } = await supabase.from('settings').select('*').single();
          if (settingError) {
            console.error('Error fetching settings:', settingError);
            return new NextResponse('Internal Server Error', { status: 500 });
          }
          const setting = settingData!;
          messages = [getWaitingTimeMessage(existingTicket.ticket_number, setting.waiting_number, setting.current_number, setting.average_waiting_time)];
        } else {
          messages = [{ type: 'text', text: 'まだ発券されていません。' }];
        }
      } else if (userMessage === '利用時間') {
        messages = [getHoursMessage()];
      }

      if (messages.length > 0) {
        await replyMessage(replyToken, messages);
      }
    }
  }

  return new NextResponse('OK', { status: 200 });
}