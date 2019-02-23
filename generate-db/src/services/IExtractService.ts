export type DataProcessFunction = (data: any) => void;

export interface IExtractService {
  /**
   * Extracts a tar.gz file in-memory, parses the JSON from it using a stream and processes data using the provided function
   *
   * @param readStream
   * @param state
   * @param processData
   * @param callback
   */
  extractJsonFromStream: (
    readStream: NodeJS.ReadableStream,
    path: string,
    processData: DataProcessFunction,
  ) => Promise<{}>;
}
