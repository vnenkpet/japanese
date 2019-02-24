import { injectable } from 'inversify';
import { IConfig } from './IConfig';

@injectable()
export class Config implements IConfig {
  get jmdictArchiveUrl() {
    return process.env.JMDICT_ARCHIVE_URL
      ? process.env.JMDICT_ARCHIVE_URL
      : 'https://github.com/scriptin/jmdict-simplified/releases/download/3.0.1/jmdict-eng-common-3.0.1.json.tgz';
  }

  get jmnedictArchiveUrl() {
    return process.env.JMNEDICT_ARCHIVE_URL
      ? process.env.JMDICT_ARCHIVE_URL
      : 'https://github.com/scriptin/jmdict-simplified/releases/download/3.0.1/jmnedict-3.0.1.json.tgz';
  }
}
