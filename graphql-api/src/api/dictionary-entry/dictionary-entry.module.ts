import { Module } from '@nestjs/common';
import { DictinaryEntryService } from './services/dictionary-entry.service';
import { DictionaryEntryResolver } from './graphql/resolvers/dictionary-entry.resolver';
import { ConfigModule } from 'src/shared/config/config.module';
import { AuthGuard } from 'src/auth.guard';

@Module({
  imports: [ConfigModule],
  providers: [DictinaryEntryService, DictionaryEntryResolver],
})
export class DictionaryEntryModule {}
