import { IProcessedEntry } from '../interfaces/IProcessedEntry';

export interface IDataStorage {
  /**
   * Takes the processed entry and saves it into the data storage (API, database, etc - depends on the final implementation)
   *
   * @param entry
   */
  insertEntry(entry: IProcessedEntry): Promise<void>;
}
