import * as gunzip from 'gunzip-maybe';
import * as tar from 'tar-stream';
import * as JSONStream from 'JSONStream';
import * as es from 'event-stream';

import { injectable } from 'inversify';

import { IExtractService, DataProcessFunction } from './IExtractService';

import Debug from 'debug';
const debug = Debug('command:extract-service');

@injectable()
export class ExtractService implements IExtractService {
  /**
   * Extracts json from stream, takes all the data in path. Currently only works for one `.tar.gz`-ed file.
   *
   * @param readStream
   * @param path For example "items.*" to parse only array items in a json document looking like `{name: "Example file", items: [{id: 1, id: 2}]}`
   * @param processData Function that processes each item
   */
  public async extractJsonFromStream(
    readStream: NodeJS.ReadableStream,
    path: string,
    processData: DataProcessFunction,
  ) {
    const jsonParser = JSONStream.parse(path);
    const dataProcessor = this.createDataProcessor(processData);
    const extractor = tar.extract();
    return new Promise(res => {
      extractor.on('entry', (header, stream, next) => {
        stream
          .pipe(jsonParser)
          .pipe(dataProcessor);

        stream.on('end', () => {
          next(); // ready for next entry
        });

        stream.resume(); // just auto drain the stream
      });

      extractor.on('finish', res);

      readStream
        .pipe(gunzip())
        .pipe(extractor);
    });
  }

  private createDataProcessor(processFunction: DataProcessFunction) {
    return es.mapSync(async (data: any) => {
      await processFunction(data);
    });
  }
}
