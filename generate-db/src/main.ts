import 'reflect-metadata';

import { createRuntimContainer } from './inversify.config';
import { TYPES } from './types';
import { IPipeline } from './services/IPipeline';

async function run() {
  console.log('Creating container');
  const container = await createRuntimContainer();
  const pipeline = container.get<IPipeline>(TYPES.Pipeline);
  console.log('Running pipeline');
  await pipeline.run();
}

run();
