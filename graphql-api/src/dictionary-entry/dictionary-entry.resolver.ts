import { DictionaryEntryType } from './dictionary-entry.type';
import { DictinaryEntryService } from './dictionary-entry.service';
import { IDictionaryEntry } from './dictionary-entry.interface';
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { DictionaryEntryInputType } from './dictionary-entry-input.type';
import { InsertDictionaryEntryMutationResponseType } from './insert-dictionary-entry-mutation-response.type';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth.guard';

@Resolver(of => DictionaryEntryType)
export class DictionaryEntryResolver {
  constructor(private readonly dictionaryEntryService: DictinaryEntryService) {}

  @Query(returns => [DictionaryEntryType])
  public async search(@Args('key') key: string): Promise<IDictionaryEntry[]> {
    return await this.dictionaryEntryService.findByKeyword(key);
  }

  @Query(returns => DictionaryEntryType)
  public async dictionaryEntry(@Args('id') id: string) {
    return this.dictionaryEntryService.findOneById(id);
  }

  @Mutation(returns => InsertDictionaryEntryMutationResponseType)
  @UseGuards(AuthGuard)
  public async addDictionaryEntry(
    @Args('dictionaryEntryData') dictionaryEntryData: DictionaryEntryInputType,
  ) {
    const dictionaryEntry = await this.dictionaryEntryService.insertOne(
      dictionaryEntryData,
    );

    return {
      code: 201,
      message: 'Dictionary entry succesfully added.',
      isSuccessful: true,
      dictionaryEntry,
    };
  }
}
