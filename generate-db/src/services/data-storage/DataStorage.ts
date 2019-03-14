import { IDataStorage } from './IDataStroage';
import { IProcessedEntry } from '../interfaces/IProcessedEntry';
import { injectable, inject } from 'inversify';
import { TYPES } from 'src/types';
import { IConfig } from 'src/IConfig';
import { MongoClient, Collection } from 'mongodb';

enum CollectionNames {
  Entries = 'entries',
}

@injectable()
export class DataStorage implements IDataStorage {
  private connection: MongoClient;
  private dbName: string;
  private collections: {
    entries?: Collection<IProcessedEntry>;
  } = {entries: null};

  public constructor(
    @inject(TYPES.Config) private readonly config: IConfig,
  ) {}

  /**
   * This needs to be called before binding in DI
   */
  public async connect() {
    const mongoUri = this.config.mongoConnectionUri;
    this.dbName = mongoUri.split('/').slice(-1)[0];
    this.connection = await MongoClient.connect(mongoUri, { useNewUrlParser: true });
    this.collections.entries = this.connection.db(this.dbName).collection(CollectionNames.Entries);
  }

  public async insertEntry(entry: IProcessedEntry) {
    this.collections.entries.insertOne(entry);
  }
}
