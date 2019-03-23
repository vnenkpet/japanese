import { IParseDatabaseJob } from './IParseDatabaseJob';
import * as got from 'got';
import { injectable, inject } from 'inversify';
import { TYPES } from 'src/types';
import { IExtractService } from '../extract-service/IExtractService';
import { IDataStorage } from '../data-storage/IDataStroage';
import { IConfig } from 'src/IConfig';

@injectable()
export class ParseDatabaseJob implements IParseDatabaseJob {
  @inject(TYPES.ExtractService)
  private readonly extractService: IExtractService;

  @inject(TYPES.DataStroage)
  private readonly dataStorage: IDataStorage;

  @inject(TYPES.Config)
  private readonly config: IConfig;

  public async run() {
    const url = this.config.jmdictArchiveUrl;

    // first, extract json and save result to db
    await this.extractService.extractJsonFromStream(
      got.stream.get(url),
      'words.*',
      async data => {
        await this.dataStorage.insertUnprocessedJmdictEntry(data);
      },
    );
  }
}
