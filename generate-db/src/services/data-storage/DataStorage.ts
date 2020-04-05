import { IDataStorage } from './IDataStorage';
import { IProcessedEntry } from '../interfaces/IProcessedEntry';
import { injectable, inject } from 'inversify';
import { TYPES } from '../../types';
import { IConfig } from '../../IConfig';
import { MongoClient, Collection } from 'mongodb';
import { IJmdictEntry } from '../interfaces/IJmdictEntry';
import { IConnection } from './IConnection';
import { ILogger } from '../logger/ILogger';
import { scoped } from '../logger/Logger';

enum CollectionNames {
  Entries = 'entries',
  Temp = 'temp',
}

@injectable()
export class DataStorage implements IDataStorage {
  @inject(TYPES.Config) private readonly config: IConfig;
  @inject(TYPES.Logger)
  @scoped('data-storage')
  private readonly logger: ILogger;

  private connection: MongoClient;
  private dbName: string;
  private collections: {
    entries?: Collection<IProcessedEntry>;
    temp?: Collection<IJmdictEntry & { metaCursor: number }>;
  } = { entries: null, temp: null };

  /**
   * This needs to be called before binding in DI
   */
  public async connect() {
    const mongoUri = this.config.mongoConnectionUri;
    this.dbName = mongoUri.split('/').slice(-1)[0];
    this.connection = await MongoClient.connect(mongoUri, {
      useNewUrlParser: true,
    });

    this.collections.entries = this.connection
      .db(this.dbName)
      .collection(CollectionNames.Entries);

    this.collections.temp = this.connection
      .db(this.dbName)
      .collection(CollectionNames.Temp);
  }

  public async insertEntry(entry: IProcessedEntry) {
    await this.collections.entries.insertOne(entry);
  }

  public async insertUnprocessedJmdictEntry(entry: IJmdictEntry) {
    this.logger.log(`Inserting entry ${entry.id}`);
    await this.collections.temp.insertOne({
      ...entry,
      metaCursor: Number(entry.id),
    });
  }

  public async deleteUnprocessedEntry(id: string) {
    await this.collections.temp.deleteOne({ id });
  }

  public async getUnprocessedEntriesConnection({
    first,
    after,
  }): Promise<IConnection<IJmdictEntry>> {
    this.logger.log(
      `Getting connection with first ${first} result(s) after ${after}`,
    );
    const [totalCount, items] = await Promise.all([
      this.collections.temp.count(),
      this.collections.temp
        .find(this.getFindQueryForCursor(after))
        .sort({ metaCursor: 1 })
        .limit(first)
        .toArray(),
    ]);

    const endCursor = items[items.length - 1].metaCursor.toString();
    const hasNextPage =
      (await this.collections.temp.count(
        this.getFindQueryForCursor(endCursor),
      )) > 0;

    return {
      total: totalCount,
      edges: items.map(item => ({
        node: item,
        cursor: item.id,
      })),
      items,
      pageInfo: {
        startCursor: after,
        endCursor,
        hasNextPage,
      },
    };
  }

  public close() {
    return this.connection.close();
  }

  public async dropTempCollection() {
    try {
      await this.collections.temp.drop();
    } catch (e) {
      this.logger.log("Can't drop collection, proceeding...");
    }
    await this.collections.temp.createIndex('metaCursor');
  }

  public async dropEntriesCollection() {
    try {
      await this.collections.entries.drop();
    } catch (e) {
      this.logger.log("Can't drop collection, proceeding...");
    }
    await this.collections.temp.createIndex('metaCursor');
  }

  public getTempCollectionCount() {
    return this.collections.temp.count();
  }

  private getFindQueryForCursor(cursor: string) {
    return cursor ? { metaCursor: { $gt: Number(cursor) } } : {};
  }
}
