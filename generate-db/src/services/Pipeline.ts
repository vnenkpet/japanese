import { TYPES } from '../types';
import { inject, injectable } from 'inversify';
import { IPipeline } from './IPipeline';
import { IDataStorage } from './data-storage/IDataStorage';

import { IJob } from './jobs/IJob';
import { ILogger } from './logger/ILogger';
import { scoped } from './logger/Logger';

@injectable()
export class Pipeline implements IPipeline {
  @inject(TYPES.DataStroage)
  private readonly dataStorage: IDataStorage;

  @inject(TYPES.ParseDatabaseJob)
  private readonly parseDatabaseJob: IJob;

  @inject(TYPES.AddMetadataJob)
  private readonly addMetadataJob: IJob;

  @inject(TYPES.Logger)
  @scoped('main')
  private readonly logger: ILogger;

  /**
   * Process everything in-memory using streams for efficiency
   */
  public async run() {
    this.logger.log('Running command...');

    this.logger.log(
      'Parsing JSON from github and saving raw data to database...',
    );
    await this.parseDatabaseJob.run();
    this.logger.log('Processing raw data and adding metadata...');
    await this.addMetadataJob.run();

    this.dataStorage.close();
  }
}
