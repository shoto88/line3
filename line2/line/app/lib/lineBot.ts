import { messagingApi, Message } from '@line/bot-sdk';

const config = {
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN!,
  channelSecret: process.env.LINE_CHANNEL_SECRET!,
};

const client = new messagingApi.MessagingApiClient(config);


export async function replyMessage(replyToken: string, messages: any[]) {
  await client.replyMessage({
    replyToken: replyToken,
    messages: messages,
  });
}

export async function getProfile(userId: string) {
  return await client.getProfile(userId);
}