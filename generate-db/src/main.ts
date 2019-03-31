import 'reflect-metadata';

import { createRuntimContainer } from './inversify.config';
import { TYPES } from './types';
import { IPipeline } from './services/IPipeline';

async function run() {
  const container = await createRuntimContainer();
  const pipeline = container.get<IPipeline>(TYPES.Pipeline);
  await pipeline.run();
}

run();
