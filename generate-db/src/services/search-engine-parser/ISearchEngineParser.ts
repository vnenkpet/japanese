import { IJmdictEntry } from '../interfaces/IJmdictEntry';
import { IJmnedictEntry } from '../interfaces/IJmnedictEntry';

export interface ISearchEngineParser {
  /**
   * Search for this entry in Japanese and return the results count
   *
   * @param entry Jmdict entry as is save in the archive
   */
  getResultsCountForJmdictEntry(entry: IJmdictEntry): Promise<number>;

  /**
   * Search for this entry in Japanese and return the results count
   *
   * @param entry Jmnedict entry as is save in the archive
   */
  getResultsCountForJmnedictEntry(entry: IJmnedictEntry): Promise<number>;
}
