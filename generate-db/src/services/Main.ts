import { TYPES } from '../types';
import { inject, injectable } from 'inversify';
import { IMain } from './IMain';
import { IDataStorage } from './data-storage/IDataStroage';

import Debug from 'debug';
import { IParseDatabaseJob } from './jobs/IParseDatabaseJob';
import { IAddMetadataJob } from './jobs/IAddMetadataJob';
const debug = Debug('command:main');

@injectable()
export class Main implements IMain {
  @inject(TYPES.DataStroage)
  private readonly dataStorage: IDataStorage;

  @inject(TYPES.ParseDatabaseJob)
  private readonly parseDatabaseJob: IParseDatabaseJob;

  @inject(TYPES.AddMetadataJob)
  private readonly addMetadataJob: IAddMetadataJob;

  public async run() {
    debug('Running command...');

    await this.parseDatabaseJob.run();
    await this.addMetadataJob.run();

    this.dataStorage.close();
  }
}
