import { IDataStorage } from './IDataStroage';
import { IParsedEntry } from '../interfaces/IParsedEntry';
import { injectable } from 'inversify';

@injectable()
export class DataStorage implements IDataStorage {
  public async insertEntry(entry: IParsedEntry) {
    throw new Error('Not implemented');
    return;
  }
}
