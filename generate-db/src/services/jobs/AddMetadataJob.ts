import { IAddMetadataJob } from './IAddMetadataJob';
import { IDataStorage } from '../data-storage/IDataStorage';
import { inject, injectable } from 'inversify';
import { TYPES } from '../../types';
import { IJmdictEntryProcessor } from '../jmdict-entry-processor/IJmdictEntryProcessor';
import { ILogger } from '../logger/ILogger';
import { scoped } from '../logger/Logger';

@injectable()
export class AddMetadataJob implements IAddMetadataJob {
  @inject(TYPES.Logger)
  @scoped('add-metadata-job')
  private readonly logger: ILogger;

  @inject(TYPES.DataStroage)
  private readonly dataStorage: IDataStorage;

  @inject(TYPES.JmdictEntryProcessor)
  private readonly jmdictEntryProcessor: IJmdictEntryProcessor;

  public async run() {
    await this.dataStorage.dropEntriesCollection();

    const chunkSize = 10;
    let endCursor;
    let hasNextPage = true;

    while (hasNextPage) {
      const connection = await this.dataStorage.getUnprocessedEntriesConnection(
        {
          first: chunkSize,
          after: endCursor,
        },
      );
      hasNextPage = connection.pageInfo.hasNextPage;
      endCursor = connection.pageInfo.endCursor;

      this.logger.log(
        `Processing ${connection.items.map(entry => entry.id).join(',')}`,
      );
      const processedEntries = await Promise.all(
        connection.items.map(async entry => {
          return this.jmdictEntryProcessor.process(entry);
        }),
      );

      await Promise.all(
        processedEntries.map(async entry => {
          await this.dataStorage.insertEntry(entry);
          await this.dataStorage.deleteUnprocessedEntry(entry.id);
        }),
      );
    }
  }
}
