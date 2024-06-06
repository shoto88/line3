import { Client, ClientConfig, Message, Profile } from '@line/bot-sdk';

const clientConfig: ClientConfig = {
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN || '',
  channelSecret: process.env.LINE_CHANNEL_SECRET,
};

const client = new Client(clientConfig);

export async function replyMessage(replyToken: string, messages: Message[]) {
  await client.replyMessage(replyToken, messages);
}

export async function getProfile(userId: string): Promise<Profile> {
  return await client.getProfile(userId);
}

export default client;