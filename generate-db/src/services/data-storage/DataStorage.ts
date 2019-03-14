import { IDataStorage } from './IDataStroage';
import { IParsedEntry } from '../interfaces/IParsedEntry';
import { injectable, inject } from 'inversify';
import { TYPES } from 'src/types';
import { IConfig } from 'src/IConfig';
import { MongoClient } from 'mongodb';

enum CollectionNames {
  Entries = 'entries',
}

@injectable()
export class DataStorage implements IDataStorage {
  private connection: MongoClient;
  private dbName: string;

  public constructor(
    @inject(TYPES.Config) private readonly config: IConfig,
  ) {}

  /**
   * This needs to be called before binding in DI
   */
  public async connect() {
    const mongoUri = this.config.mongoConnectionUri;
    this.dbName = mongoUri.split('/').slice(-1)[0];
    this.connection = await MongoClient.connect(mongoUri);
  }

  public async insertEntry(entry: IParsedEntry) {
    this.connection.db(this.dbName).collection(CollectionNames.Entries).insertOne(entry);
  }
}
