import path from 'path';
import { readFileSync } from 'fs';
import { parseTgChannel } from '../tg-parser';

const sampleHtml = readFileSync(path.resolve(__dirname, 'sample.html'), 'utf8');

const SAMPLE_EVENTS = [
  'Відбій тривоги в Донецька область',
  'Повітряна тривога в Донецька область',
  'Повітряна тривога в Дніпропетровська область',
  'Повітряна тривога в Херсонська область',
  'Повітряна тривога в Миколаївська область',
  'Відбій тривоги в Дніпропетровська область',
  'Відбій тривоги в Миколаївська область',
  'Відбій тривоги в Херсонська область',
  'Повітряна тривога в Харківська область',
  'Повітряна тривога в Запорізька область',
  'Відбій тривоги в Харківська область',
  'Відбій тривоги в Донецька область',
  'Відбій тривоги в Запорізька область',
  'Повітряна тривога в Сумська область',
  'Відбій тривоги в Сумська область',
  'Повітряна тривога в Запорізька область',
  'Відбій тривоги в Запорізька область',
  'Загроза артобстрілу',
  'Повітряна тривога в Чернігівська область',
  'Повітряна тривога в Сумська область',
] as const;

const CHANNEL_NAME = 'air_alert_ua';

const fetchMock = jest
  .spyOn(global, 'fetch')
  .mockImplementation(() => Promise.resolve(new Response(sampleHtml)));

it('Should parse TG channel', async () => {
  const messages = await parseTgChannel(CHANNEL_NAME);
  console.log(messages);

  expect(fetchMock).toHaveBeenCalledWith(`https://t.me/s/${CHANNEL_NAME}`);

  expect(messages).toHaveLength(20);

  messages.forEach((message, i) => {
    expect(message).toContain(SAMPLE_EVENTS[i]);
  });
});
