import 'reflect-metadata';

import { container } from './inversify.config';
import { TYPES } from './types';
import { IMain } from './services/IMain';

async function run() {
  const main = container.get<IMain>(TYPES.Main);
  await main.run();
}

run();
