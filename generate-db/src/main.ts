import 'reflect-metadata';

import { createBasicContainer, initRuntimeContainer } from './inversify.config';
import { TYPES } from './types';
import { IPipeline } from './services/IPipeline';

async function run() {
  const container = createBasicContainer();
  await initRuntimeContainer(container);
  const pipeline = container.get<IPipeline>(TYPES.Pipeline);
  await pipeline.run();
}

run();
