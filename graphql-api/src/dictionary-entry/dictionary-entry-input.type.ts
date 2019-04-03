import { InputType, Field } from 'type-graphql';

@InputType()
export class DictionaryEntryInputType {
  @Field() japanese: string;
  @Field() english: string;
}
