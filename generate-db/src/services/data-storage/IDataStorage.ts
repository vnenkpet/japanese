import { IProcessedEntry } from '../interfaces/IProcessedEntry';
import { IJmdictEntry } from '../interfaces/IJmdictEntry';
import { IConnection } from './IConnection';

export interface IConnectionParams {
  first: number;
  after?: string;
}

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
  insertUnprocessedJmdictEntry(entry: IJmdictEntry): Promise<void>;

  /**
   * Deletes an unprocessed enty by jmdict ID
   *
   * @param id
   */
  deleteUnprocessedEntry(id: string): Promise<void>;

  /**
   * Fetches unprocessed entries in graphql-like connection
   *
   * @param params
   */
  getUnprocessedEntriesConnection(
    params: IConnectionParams,
  ): Promise<IConnection<IJmdictEntry>>;

  dropTempCollection(): Promise<void>;
  dropEntriesCollection(): Promise<void>;

  getTempCollectionCount(): Promise<number>;
}
