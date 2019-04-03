import { Connection } from 'typeorm';
import { DictionaryEntryEntity } from './dictionary-entry.entity';
import { Types } from 'src/types';

export const dictionaryEntryProviders = [
  {
    provide: Types.DICTIONARY_ENTRY_REPOSITORY,
    useFactory: (connection: Connection) =>
      connection.getRepository(DictionaryEntryEntity),
    inject: [Types.DATABASE_CONNECTION],
  },
];
