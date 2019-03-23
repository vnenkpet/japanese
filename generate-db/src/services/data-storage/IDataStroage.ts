import { IProcessedEntry } from '../interfaces/IProcessedEntry';
import { IJmdictEntry } from '../interfaces/IJmdictEntry';

export interface IDataStorage {
  /**
   * Connects to the database - this needs to be called asynchronously before binding
   */
  connect(): Promise<void>;

  /**
   * Closes the connection to the database - this needs to be called at the end of the script
   */
  close(): Promise<void>;

  /**
   * Takes the processed entry and saves it into the data storage (API, database, etc - depends on the final implementation)
   *
   * @param entry
   */
  insertEntry(entry: IProcessedEntry): Promise<void>;

  /**
   * Takes the unprocessed entry and saves it to a temporary collection
   *
   * @param entry
   */
  insertUnprocessedJmdictEntry(entry: IJmdictEntry);
}
