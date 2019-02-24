export type DataProcessFunction = (data: any) => Promise<void>;

export interface IExtractService {
  /**
   * Extracts a tar.gz file in-memory, parses the JSON from it using a stream and processes data using the provided function
   *
   * @param readStream Read stream from the .tar.gz file where the json file is stored
   * @param path For example "items.*" to parse only array items in a json document looking like `{name: "Example file", items: [{id: 1, id: 2}]}`
   * @param processData Processing function run on each item extracted from the `path` in the json file
   */
  extractJsonFromStream: (
    readStream: NodeJS.ReadableStream,
    path: string,
    processData: DataProcessFunction,
  ) => Promise<{}>;
}
