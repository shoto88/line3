// import { createClient } from '@supabase/supabase-js';
// import { middleware, MessageAPIResponseBase, WebhookRequestBody } from '@line/bot-sdk';
// import { NextApiRequest, NextApiResponse } from 'next';
// import { replyMessage, getProfile } from '../../lib/lineBot';
// import { getTicketMessage, getStatusMessage, getHoursMessage, getHolidayMessage, getTicketConfirmationMessage, getWaitingTimeMessage } from '../../lib/messages';
// import { isBusinessHours } from '../../lib/businessHours';
// const { verifySignature } = middleware;
// import { Ticket } from '../../types/ticket';
// const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

// const config = {
//   channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN!,
//   channelSecret: process.env.LINE_CHANNEL_SECRET!,
// };

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === 'POST') {
//     const body: WebhookRequestBody = req.body;
//     const signature = req.headers['x-line-signature'] as string;

//     if (!verifySignature(config.channelSecret, JSON.stringify(body), signature)) {
//       return res.status(401).json({ message: 'Invalid signature' });
//     }

//     const events = body.events;
//     for (const event of events) {
//       if (event.type === 'message' && event.message.type === 'text') {
//         const userMessage = event.message.text;
//         const replyToken = event.replyToken;
//         const userId = event.source.userId;

//         let messages: MessageAPIResponseBase[] = [];

//         if (userMessage === '発券する') {
//           const now = new Date();
//           if (!isBusinessHours(now)) {
//             messages = [getHoursMessage() as MessageAPIResponseBase];
//           } else {
//             const { data: ticket, error: ticketError } = await supabase
//               .from('tickets')
//               .select('waiting_number, current_number')
//               .single();

//             if (ticketError) {
//               console.error('Error fetching ticket:', ticketError);
//               return res.status(500).json({ message: 'Internal Server Error' });
//             }

//             if (!ticket) {
//               console.error('Ticket not found');
//               return res.status(404).json({ message: 'Ticket not found' });
//             }

//             messages = [getStatusMessage(ticket.waiting_number, ticket.current_number) as MessageAPIResponseBase, getTicketMessage(ticket.waiting_number) as MessageAPIResponseBase];
//           }
//         } else if (userMessage === '発券') {
//           const { data: existingTicket, error: existingTicketError } = await supabase
//             .from('tickets')
//             .select('*')
//             .eq('user_id', userId)
//             .single();

//           if (existingTicketError) {
//             console.error('Error fetching existing ticket:', existingTicketError);
//             return res.status(500).json({ message: 'Internal Server Error' });
//           }

//           if (existingTicket) {
//             messages = [
//               { type: 'text', text: 'すでに発券済みです。' } as MessageAPIResponseBase,
//               getTicketConfirmationMessage(existingTicket.ticket_number) as MessageAPIResponseBase,
//             ];
//           } else {
//             const { data: ticket, error: ticketError } = await supabase
//               .from('tickets')
//               .select('waiting_number')
//               .single();

//             if (ticketError) {
//               console.error('Error fetching ticket:', ticketError);
//               return res.status(500).json({ message: 'Internal Server Error' });
//             }

//             if (!ticket) {
//               console.error('Ticket not found');
//               return res.status(404).json({ message: 'Ticket not found' });
//             }

//             const ticketNumber = ticket.waiting_number + 1;
//             const profile = await getProfile(userId);
//             if (!profile || !profile.displayName) {
//               console.error('Profile not found or displayName is undefined');
//               return res.status(500).json({ message: 'Internal Server Error' });
//             }
//             const userName = profile.displayName;

//             await supabase
//               .from('tickets')
//               .insert({
//                 ticket_number: ticketNumber,
//                 user_name: userName,
//                 user_id: userId,
//               });

//             await supabase
//               .from('tickets')
//               .update({ waiting_number: ticketNumber })
//               .eq('id', 1);

//             messages = [
//               { type: 'text', text: 'https://www.melp.life/inquiries/new?c=F5moJ9k28I5SAZ2mhdE9ZhkeJU8E-g36-tExyIG78rPhc33sIrAuw3g4AWHLSg1Z' } as MessageAPIResponseBase,
//               getTicketConfirmationMessage(ticketNumber) as MessageAPIResponseBase,
//             ];
//           }
//         } else if (userMessage === 'キャンセル') {
//           messages = [{ type: 'text', text: '発券をキャンセルしました。' } as MessageAPIResponseBase];
//         } else if (userMessage === '今何番目？') {
//           const { data: ticket, error: ticketError } = await supabase
//             .from('tickets')
//             .select('waiting_number, current_number')
//             .single();

//           if (ticketError) {
//             console.error('Error fetching ticket:', ticketError);
//             return res.status(500).json({ message: 'Internal Server Error' });
//           }

//           if (!ticket) {
//             console.error('Ticket not found');
//             return res.status(404).json({ message: 'Ticket not found' });
//           }

//           messages = [getStatusMessage(ticket.waiting_number, ticket.current_number) as MessageAPIResponseBase];
//         } else if (userMessage === '診察券') {
//           const { data: existingTicket, error: existingTicketError } = await supabase
//             .from('tickets')
//             .select('*')
//             .eq('user_id', userId)
//             .single();

//           if (existingTicketError) {
//             console.error('Error fetching existing ticket:', existingTicketError);
//             return res.status(500).json({ message: 'Internal Server Error' });
//           }

//           if (existingTicket) {
//             messages = [getTicketConfirmationMessage(existingTicket.ticket_number) as MessageAPIResponseBase];
//           } else {
//             messages = [{ type: 'text', text: 'まだ発券されていません。' } as MessageAPIResponseBase];
//           }
//         } else if (userMessage === '待ち時間') {
//           const { data: existingTicket, error: existingTicketError } = await supabase
//             .from('tickets')
//             .select('*')
//             .eq('user_id', userId)
//             .single();

//           if (existingTicketError) {
//             console.error('Error fetching existing ticket:', existingTicketError);
//             return res.status(500).json({ message: 'Internal Server Error' });
//           }

//           if (existingTicket) {
//             const { data: ticket, error: ticketError } = await supabase
//               .from('tickets')
//               .select('waiting_number, current_number')
//               .single();

//             if (ticketError) {
//               console.error('Error fetching ticket:', ticketError);
//               return res.status(500).json({ message: 'Internal Server Error' });
//             }

//             if (!ticket) {
//               console.error('Ticket not found');
//               return res.status(404).json({ message: 'Ticket not found' });
//             }

//             messages = [getWaitingTimeMessage(existingTicket.ticket_number, ticket.waiting_number, ticket.current_number, existingTicket.user_id) as MessageAPIResponseBase];
//           } else {
//             messages = [{ type: 'text', text: 'まだ発券されていません。' } as MessageAPIResponseBase];
//           }
//         } else if (userMessage === '利用時間') {
//           messages = [getHoursMessage() as MessageAPIResponseBase];
//         }

//         if (messages.length > 0) {
//           await replyMessage(replyToken, messages);
//         }
//       }
//     }

//     res.status(200).json({ message: 'OK' });
//   } else {
//     res.status(405).json({ message: 'Method not allowed' });
//   }
// }
import { createClient } from '@supabase/supabase-js';
import * as line from '@line/bot-sdk';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { replyMessage } from '../../lib/lineBot';
import { getTicketMessage, getStatusMessage, getHoursMessage, getHolidayMessage, getTicketConfirmationMessage, getWaitingTimeMessage } from '../../lib/messages';
import { isBusinessHours } from '../../lib/businessHours';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

const lineConfig = {
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN!,
  channelSecret: process.env.LINE_CHANNEL_SECRET!,
};

const lineClient = new line.Client(lineConfig);

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const signature = req.headers.get('x-line-signature') as string;

  if (!line.validateSignature(JSON.stringify(body), signature, lineConfig.channelSecret)) {
    return new NextResponse(JSON.stringify({ message: 'Invalid signature' }), { status: 401 });
  }

  const events = body.events;
  for (const event of events) {
    if (event.type === 'message' && event.message.type === 'text') {
      const userMessage = event.message.text;
      const replyToken = event.replyToken;
      const userId = event.source.userId;

    let messages: any[] = [];

    if (userMessage === '発券する') {
      const now = new Date();
      if (!isBusinessHours(now)) {
        messages = [{ type: 'text', text: getHoursMessage() }];
      } else {
        const { data: ticket, error: ticketError } = await supabase
          .from('tickets')
          .select('waiting_number, current_number')
          .single();

        if (ticketError || !ticket) {
          console.error('Error fetching ticket:', ticketError);
          messages = [{ type: 'text', text: 'エラーが発生しました。' }];
        } else {
          messages = [
            { type: 'text', text: getStatusMessage(ticket.waiting_number, ticket.current_number) },
            { type: 'text', text: getTicketMessage(ticket.waiting_number) },
          ];
        }
      }
    } else if (userMessage === '発券') {
      const { data: existingTicket, error: existingTicketError } = await supabase
        .from('tickets')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (existingTicketError) {
        console.error('Error fetching existing ticket:', existingTicketError);
        messages = [{ type: 'text', text: 'エラーが発生しました。' }];
      } else if (existingTicket) {
        messages = [
          { type: 'text', text: 'すでに発券済みです。' },
          { type: 'text', text: getTicketConfirmationMessage(existingTicket.ticket_number) },
        ];
      } else {
        const { data: ticket, error: ticketError } = await supabase
          .from('tickets')
          .select('waiting_number')
          .single();

        if (ticketError || !ticket) {
          console.error('Error fetching ticket:', ticketError);
          messages = [{ type: 'text', text: 'エラーが発生しました。' }];
        } else {
          const ticketNumber = ticket.waiting_number + 1;
          await supabase.from('tickets').update({ waiting_number: ticketNumber }).eq('id', 1);

          messages = [
            { type: 'text', text: 'チケットが発行されました。' },
            { type: 'text', text: getTicketConfirmationMessage(ticketNumber) },
          ];
        }
      }
    } else if (userMessage === 'キャンセル') {
      messages = [{ type: 'text', text: '発券をキャンセルしました。' }];
    } else if (userMessage === '今何番目？') {
      const { data: ticket, error: ticketError } = await supabase
        .from('tickets')
        .select('waiting_number, current_number')
        .single();

      if (ticketError || !ticket) {
        console.error('Error fetching ticket:', ticketError);
        messages = [{ type: 'text', text: 'エラーが発生しました。' }];
      } else {
        messages = [{ type: 'text', text: getStatusMessage(ticket.waiting_number, ticket.current_number) }];
      }
    } else if (userMessage === '診察券') {
      const { data: existingTicket, error: existingTicketError } = await supabase
        .from('tickets')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (existingTicketError) {
        console.error('Error fetching existing ticket:', existingTicketError);
        messages = [{ type: 'text', text: 'エラーが発生しました。' }];
      } else if (existingTicket) {
        messages = [{ type: 'text', text: getTicketConfirmationMessage(existingTicket.ticket_number) }];
      } else {
        messages = [{ type: 'text', text: 'まだ発券されていません。' }];
      }
    } else if (userMessage === '待ち時間') {
      const { data: existingTicket, error: existingTicketError } = await supabase
        .from('tickets')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (existingTicketError) {
        console.error('Error fetching existing ticket:', existingTicketError);
        messages = [{ type: 'text', text: 'エラーが発生しました。' }];
      } else if (existingTicket) {
        const { data: ticket, error: ticketError } = await supabase
          .from('tickets')
          .select('waiting_number, current_number')
          .single();

        if (ticketError || !ticket) {
          console.error('Error fetching ticket:', ticketError);
          messages = [{ type: 'text', text: 'エラーが発生しました。' }];
        } else {
          messages = [{ type: 'text', text: getWaitingTimeMessage(existingTicket.ticket_number, existingTicket.waiting_number, existingTicket.current_number, ticket.current_number) }];
        }
      } else {
        messages = [{ type: 'text', text: 'まだ発券されていません。' }];
      }
    } else if (userMessage === '利用時間') {
      messages = [{ type: 'text', text: getHoursMessage() }];
    }

    if (messages.length > 0) {
      await replyMessage(replyToken, messages);
    }
  return new NextResponse(JSON.stringify({ message: 'OK' }), { status: 200 });
}
  }
}