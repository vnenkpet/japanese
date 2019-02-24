import Debug from 'debug';
import { inject, injectable } from 'inversify';
import { TYPES } from '../../types';
import { ISearchEngineParser } from '../search-engine-parser/ISearchEngineParser';
import { IConfig } from '../../IConfig';
import { IJmdictEntryProcessor } from './IJmdictEntryProcessor';
import { IJmdictEntry } from '../interfaces/IJmdictEntry';
import { IDataStorage } from '../data-storage/IDataStroage';
import { SourceDictionary } from '../interfaces/IParsedEntry';

const debug = Debug('command:jmdict-entry-processor');

@injectable()
export class JmdictEntryProcessor implements IJmdictEntryProcessor {
  @inject(TYPES.SearchEngineParser)
  private readonly searchEngineParser: ISearchEngineParser;

  @inject(TYPES.Config)
  private readonly config: IConfig;

  @inject(TYPES.DataStroage)
  private readonly dataSorage: IDataStorage;

  public async process(data: IJmdictEntry) {
    if (data.id) {
      debug(
        `${data.id} \t ${
          data.kanji[0] ? data.kanji[0].text : data.kana[0].text
        } \t ${data.sense[0].gloss[0].text}`,
      );

      const searchEngineResults = await this.searchEngineParser.getResultsCountForJmdictEntry(
        data,
      );

      const transformedData = {
        ...data,
        ...{
          source: SourceDictionary.jmdict,
          sourceFile: this.config.jmdictArchiveUrl,
          modifiedAt: new Date().toISOString(),
          searchEngineResults,
        },
      };

      debug(transformedData.searchEngineResults);

      await this.dataSorage.insertEntry(transformedData);

      // todo - insert into data storage, add info (JLPT tags, example sentences, search engine results count, common, conjugations)
    }
  }
}
