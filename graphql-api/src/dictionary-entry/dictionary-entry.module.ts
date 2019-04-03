import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { dictionaryEntryProviders } from './dictionary-entry.providers';
import { DictinaryEntryService } from './dictionary-entry.service';
import { DictionaryEntryResolver } from './dictionary-entry.resolver';
import { AuthGuard } from 'src/auth.guard';
import { configProvider } from 'src/config.provider';

@Module({
  imports: [DatabaseModule],
  providers: [
    ...dictionaryEntryProviders,
    DictinaryEntryService,
    DictionaryEntryResolver,
    AuthGuard,
    configProvider,
  ],
})
export class DictionaryEntryModule {}
