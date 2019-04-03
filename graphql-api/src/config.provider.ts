import { Types } from './types';
import { Config } from './config.service';

export const configProvider = {
  provide: Types.CONFIG,
  useClass: Config,
};
