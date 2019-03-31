import { inject, injectable } from 'inversify';
import { TYPES } from '../../types';
import { ISearchEngineParser } from '../search-engine-parser/ISearchEngineParser';
import { IConfig } from '../../IConfig';
import { IJmdictEntryProcessor } from './IJmdictEntryProcessor';
import { IJmdictEntry } from '../interfaces/IJmdictEntry';
import { SourceDictionary } from '../interfaces/IProcessedEntry';
import { ILogger } from '../logger/ILogger';
import { scoped } from '../logger/Logger';

@injectable()
export class JmdictEntryProcessor implements IJmdictEntryProcessor {
  @inject(TYPES.SearchEngineParser)
  private readonly searchEngineParser: ISearchEngineParser;

  @inject(TYPES.Config)
  private readonly config: IConfig;

  @inject(TYPES.Logger)
  @scoped('jmdict-entry-processor')
  private readonly logger: ILogger;

  public async process(data: IJmdictEntry) {
    if (data.id) {
      this.logger.log(
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
          sourceDictionary: SourceDictionary.jmdict,
          sourceFile: this.config.jmdictArchiveUrl,
          modifiedAt: new Date(),
          searchEngineResults,
        },
      };

      this.logger.log(transformedData.searchEngineResults);

      return transformedData;
      // todo - add info (JLPT tags, example sentences, search engine results count, common, conjugations)
    }
  }
}
