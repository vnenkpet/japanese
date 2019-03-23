import { IDataStorage } from './IDataStroage';
import { IProcessedEntry } from '../interfaces/IProcessedEntry';
import { injectable, inject } from 'inversify';
import { TYPES } from 'src/types';
import { IConfig } from 'src/IConfig';
import { MongoClient, Collection } from 'mongodb';
import { IJmdictEntry } from '../interfaces/IJmdictEntry';

enum CollectionNames {
  Entries = 'entries',
  Temp = 'temp',
}

@injectable()
export class DataStorage implements IDataStorage {
  private connection: MongoClient;
  private dbName: string;
  private collections: {
    entries?: Collection<IProcessedEntry>;
    temp?: Collection<IJmdictEntry>;
  } = { entries: null, temp: null };

  public constructor(@inject(TYPES.Config) private readonly config: IConfig) {}

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
    this.collections.entries.insertOne(entry);
  }

  public async insertUnprocessedJmdictEntry(entry: IJmdictEntry) {
    this.collections.temp.insertOne(entry);
  }

  public close() {
    return this.connection.close();
  }
}
