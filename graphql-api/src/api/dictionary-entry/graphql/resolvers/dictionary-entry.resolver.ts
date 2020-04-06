import { DictionaryEntryType } from '../types/dictionary-entry.type';
import { DictinaryEntryService } from '../../services/dictionary-entry.service';
import { IDictionaryEntry } from '../../interfaces/dictionary-entry.interface';
import { Resolver, Query, Args } from '@nestjs/graphql';

@Resolver(of => DictionaryEntryType)
export class DictionaryEntryResolver {
  constructor(private readonly dictionaryEntryService: DictinaryEntryService) {}

  @Query(returns => [DictionaryEntryType], {
    description:
      'Returns an array of all results - to be replaced with graphql connection',
  })
  public async search(@Args('key') key: string): Promise<IDictionaryEntry[]> {
    return await this.dictionaryEntryService.findByKeyword(key);
  }

  @Query(returns => DictionaryEntryType, {
    description: 'Returns a detail of a single entry based on its jmdict id',
  })
  public async dictionaryEntry(@Args('id') id: string) {
    return this.dictionaryEntryService.findOneById(id);
  }
}
