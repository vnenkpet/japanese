import { injectable } from 'inversify';
import { IConfig } from './IConfig';

@injectable()
export class Config implements IConfig {
  get jmdictArchiveUrl(): string {
    return (
      process.env.JMDICT_ARCHIVE_URL ||
      'https://github.com/scriptin/jmdict-simplified/releases/download/3.0.1/jmdict-eng-3.0.1.json.tgz'
    );
  }

  get jmnedictArchiveUrl(): string {
    return (
      process.env.JMNEDICT_ARCHIVE_URL ||
      'https://github.com/scriptin/jmdict-simplified/releases/download/3.0.1/jmnedict-3.0.1.json.tgz'
    );
  }

  get mongoConnectionUri(): string {
    return (
      process.env.MONGO_CONNECTION_URI || 'mongodb://localhost:27017/jmdict'
    );
  }
}
