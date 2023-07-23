import { areasState } from './area-state.js';
import { updateArea } from './db/db.js';
import { parseTgChannel } from './tg/tg-parser.js';

const CHANNEL_NAME = 'air_alert_ua';
const ALERT_ON = 'Повітряна тривога в';
const ALERT_OFF = 'Відбій тривоги в';

export async function update() {
  const messages = await parseTgChannel(CHANNEL_NAME);
  console.log(messages);

  messages.forEach((message) => {
    areasState.forEach((areasState, i) => {
      if (message.includes(areasState.name)) {
        if (message.includes(ALERT_ON)) {
          areasState.alert = 1;
        } else if (message.includes(ALERT_OFF)) {
          areasState.alert = 0;
        }
        updateArea({ id: i, ...areasState, updated: new Date().toISOString() });
      }
    });
  });
}

await update();
