import { parse } from 'node-html-parser';

const TG_BASE_URL = 'https://t.me/s/';

/**
 * Parses TG channel.
 *
 * @param channelName TG channel name
 * @returns array of latest messages in the channel
 */
export async function parseTgChannel(channelName: string) {
  const response = await fetch(TG_BASE_URL + channelName);

  if (!response.ok) {
    throw Error(response.statusText);
  }

  const html = await response.text();
  const root = parse(html);
  const messages = root.querySelectorAll('.tgme_widget_message_text');
  console.log(`Found ${messages.length} messages`);

  return messages.map((message) => message.innerText);
}
