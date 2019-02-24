import { TYPES } from '../types';
import { IExtractService } from './extract-service/IExtractService';
import { inject, injectable } from 'inversify';
import { IMain } from './IMain';
import * as got from 'got';
import { IConfig } from 'src/IConfig';
import { IJmdictEntryProcessor } from './jmdict-entry-processor/IJmdictEntryProcessor';

import Debug from 'debug';
const debug = Debug('command:main');

@injectable()
export class Main implements IMain {
  @inject(TYPES.ExtractService)
  private readonly extractService: IExtractService;

  @inject(TYPES.Config)
  private readonly config: IConfig;

  @inject(TYPES.JmdictEntryProcessor)
  private readonly jmdictEntryProcessor: IJmdictEntryProcessor;

  public async run() {
    debug('Running command...');
    const url = this.config.jmdictArchiveUrl;

    await this.extractService.extractJsonFromStream(
      got.stream.get(url),
      'words.*',
      async data => {
        this.jmdictEntryProcessor.process(data);
      },
    );
  }
}
