import { IJmdictEntry } from '../interfaces/IJmdictEntry';
import { IProcessedEntry } from '../interfaces/IProcessedEntry';

export interface IJmdictEntryProcessor {
  /**
   * Function to process jmdict entry item from the archive
   *
   * @param data Jmdict entry data as saved in the archive
   */
  process(data: IJmdictEntry): Promise<IProcessedEntry>;
}
