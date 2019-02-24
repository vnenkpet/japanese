import { IParsedEntry } from '../interfaces/IParsedEntry';

export interface IDataStorage {
  /**
   * Takes the processed entry and saves it into the data storage (API, database, etc - depends on the final implementation)
   *
   * @param entry
   */
  insertEntry(entry: IParsedEntry): Promise<void>;
}
