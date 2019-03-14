import 'reflect-metadata';

import { createContainer } from './inversify.config';
import { TYPES } from './types';
import { IMain } from './services/IMain';

async function run() {
  const container = await createContainer();
  const main = container.get<IMain>(TYPES.Main);
  await main.run();
}

run();
