import { Field, ObjectType } from 'type-graphql';
import { DictionaryEntryType } from './dictionary-entry.type';
import { IMutationResponse } from 'src/common/mutation-response.interface';

@ObjectType()
export class InsertDictionaryEntryMutationResponseType
  implements IMutationResponse {
  @Field()
  code: number;

  @Field()
  isSuccessful: boolean;

  @Field()
  message: string;

  @Field(type => DictionaryEntryType)
  dictionaryEntry: DictionaryEntryType;
}
