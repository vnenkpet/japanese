import 'reflect-metadata';

import { container } from './inversify.config';
import { TYPES } from './types';
import { IMain } from './services/IMain';

async function run(archiveUrl: string) {
  const main = container.get<IMain>(TYPES.Main);
  await main.run(archiveUrl);
}

run(
  process.env.ARCHIVE_URL
    ? process.env.ARCHIVE_URL
    : 'https://github.com/scriptin/jmdict-simplified/releases/download/3.0.1/jmdict-eng-common-3.0.1.json.tgz',
);
