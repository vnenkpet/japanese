import { Container } from 'inversify';
import { IExtractService } from './services/extract-service/IExtractService';
import { ExtractService } from './services/extract-service/ExtractService';
import { TYPES } from './types';
import { Pipeline } from './services/Pipeline';
import { IPipeline } from './services/IPipeline';
import { IConfig } from './IConfig';
import { Config } from './Config';
import { ISearchEngineParser } from './services/search-engine-parser/ISearchEngineParser';
import { BingEngineParser } from './services/search-engine-parser/BingEngineParser';
import { IJmdictEntryProcessor } from './services/jmdict-entry-processor/IJmdictEntryProcessor';
import { JmdictEntryProcessor } from './services/jmdict-entry-processor/JmdictEntryProcessor';
import { IDataStorage } from './services/data-storage/IDataStorage';
import { DataStorage } from './services/data-storage/DataStorage';
import { IParseDatabaseJob } from './services/jobs/IParseDatabaseJob';
import { ParseDatabaseJob } from './services/jobs/ParseDatabaseJob';
import { IAddMetadataJob } from './services/jobs/IAddMetadataJob';
import { AddMetadataJob } from './services/jobs/AddMetadataJob';
import { Logger } from './services/logger/Logger';
import { ILogger } from './services/logger/ILogger';

export function createBasicContainer() {
  const container = new Container();
  container.bind<IConfig>(TYPES.Config).to(Config);

  // scoped console log using debug
  container.bind<ILogger>(TYPES.Logger).toDynamicValue(context => {
    const namedMetadata = context.currentRequest.target.getNamedTag();
    const named = namedMetadata ? namedMetadata.value : '';
    // this way we log to the console only when DEBUG var is set to "job,job:*"
    return new Logger('job', named);
  });

  container.bind<IPipeline>(TYPES.Pipeline).to(Pipeline);
  container.bind<IExtractService>(TYPES.ExtractService).to(ExtractService);
  container
    .bind<ISearchEngineParser>(TYPES.SearchEngineParser)
    .to(BingEngineParser);
  container
    .bind<IJmdictEntryProcessor>(TYPES.JmdictEntryProcessor)
    .to(JmdictEntryProcessor);

  container
    .bind<IParseDatabaseJob>(TYPES.ParseDatabaseJob)
    .to(ParseDatabaseJob);
  container.bind<IAddMetadataJob>(TYPES.AddMetadataJob).to(AddMetadataJob);

  container.bind<IDataStorage>(TYPES.DataStroage).to(DataStorage);

  return container;
}

export async function initRuntimeContainer(container: Container) {
  const dataStorage = container.get<IDataStorage>(TYPES.DataStroage);
  await dataStorage.connect();
  container
    .rebind<IDataStorage>(TYPES.DataStroage)
    .toConstantValue(dataStorage);
  return container;
}
