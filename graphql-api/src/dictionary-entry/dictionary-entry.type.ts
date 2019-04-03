import { Field, ID, ObjectType } from 'type-graphql';
import { IDictionaryEntry } from './dictionary-entry.interface';

@ObjectType()
export class DictionaryEntryType implements IDictionaryEntry {
  @Field(type => ID)
  id: string;

  @Field()
  japanese: string;

  @Field()
  english: string;
}
