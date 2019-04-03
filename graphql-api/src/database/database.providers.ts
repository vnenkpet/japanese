import { createConnection } from 'typeorm';
import { Types } from 'src/types';
import { IConfig } from 'src/config.interface';

export const databaseProviders = [
  {
    provide: Types.DATABASE_CONNECTION,
    useFactory: async (config: IConfig) => {
      return await createConnection({
        type: 'mongodb',
        url: config.mongoConnectionUri,
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true,
      });
    },
    inject: [Types.CONFIG],
  },
];
