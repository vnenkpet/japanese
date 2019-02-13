import * as dotenv from 'dotenv';
import { inject, toNumber, toString } from 'typescript-stringcaster';
dotenv.config();

const source = process.env;

class Config {
  @inject({ cast: toString, source })
  public MONGODB_URI: string;

  @inject({ cast: toString, source })
  public MONGODB_URI_TEST: string;

  @inject({ cast: toNumber, source })
  public PORT: string;

  @inject({ cast: toString, source, defaultValue: 'development' })
  public NODE_ENV: string;
}

export default new Config();
