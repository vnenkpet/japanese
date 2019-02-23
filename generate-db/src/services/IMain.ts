export interface IMain {
  /**
   * Downloads and processes archive stream in-memory
   *
   * @param url
   */
  run: (url: string) => void;
}
