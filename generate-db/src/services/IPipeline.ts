export interface IPipeline {
  /**
   * Downloads and processes archive stream in-memory
   */
  run: () => void;
}
