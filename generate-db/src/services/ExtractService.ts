import * as gunzip from 'gunzip-maybe';
import * as tar from 'tar-stream';
import { injectable } from 'inversify';
import { IExtractService, DataProcessFunction } from './IExtractService';
import * as JSONStream from 'JSONStream';
import * as es from 'event-stream';

@injectable()
export class ExtractService implements IExtractService {
  public extractJsonFromStream(
    readStream: NodeJS.ReadableStream,
    path: string,
    processData: DataProcessFunction,
  ) {
    return new Promise(res => {
      const extract = tar.extract();
      extract.on('entry', function(header, stream, next) {
        stream.on('data', (data: any) => {
          processData(data.toString('utf8'));
        });
        stream.pipe(JSONStream.parse(path)).pipe(
          es.mapSync((data: any) => {
            processData(data);
          }),
        );

        stream.on('end', () => {
          next(); // ready for next entry
        });

        stream.resume(); // just auto drain the stream
      });

      extract.on('finish', res);

      readStream.pipe(gunzip()).pipe(extract);
    });
  }
}
