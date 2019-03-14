import { Container } from 'inversify';
import { IExtractService } from './services/extract-service/IExtractService';
import { ExtractService } from './services/extract-service/ExtractService';
import { TYPES } from './types';
import { Main } from './services/Main';
import { IMain } from './services/IMain';
import { IConfig } from './IConfig';
import { Config } from './config';
import { ISearchEngineParser } from './services/search-engine-parser/ISearchEngineParser';
import { BingEngineParser } from './services/search-engine-parser/BingEngineParser';
import { IJmdictEntryProcessor } from './services/jmdict-entry-processor/IJmdictEntryProcessor';
import { JmdictEntryProcessor } from './services/jmdict-entry-processor/JmdictEntryProcessor';
import { IDataStorage } from './services/data-storage/IDataStroage';
import { DataStorage } from './services/data-storage/DataStorage';

export async function createContainer(): Promise<Container> {
  const container = new Container();
  container.bind<IConfig>(TYPES.Config).to(Config);
  container.bind<IMain>(TYPES.Main).to(Main);
  container.bind<IExtractService>(TYPES.ExtractService).to(ExtractService);
  container
    .bind<ISearchEngineParser>(TYPES.SearchEngineParser)
    .to(BingEngineParser);
  container
    .bind<IJmdictEntryProcessor>(TYPES.JmdictEntryProcessor)
    .to(JmdictEntryProcessor);

  const dataStorage = new DataStorage(container.get(TYPES.Config));
  await dataStorage.connect();
  container.bind<IDataStorage>(TYPES.DataStroage).toConstantValue(dataStorage);

  return container;
}
