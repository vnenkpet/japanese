import { IJob } from './IJob';
import got from 'got';
import { injectable, inject } from 'inversify';
import { TYPES } from '../../types';
import { IExtractService } from '../extract-service/IExtractService';
import { IDataStorage } from '../data-storage/IDataStorage';
import { IConfig } from '../../IConfig';

@injectable()
export class ParseDatabaseJob implements IJob {
  @inject(TYPES.ExtractService)
  private readonly extractService: IExtractService;

  @inject(TYPES.DataStroage)
  private readonly dataStorage: IDataStorage;

  @inject(TYPES.Config)
  private readonly config: IConfig;

  public async run() {
    const url = this.config.jmdictArchiveUrl;
    await this.dataStorage.dropTempCollection();

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
