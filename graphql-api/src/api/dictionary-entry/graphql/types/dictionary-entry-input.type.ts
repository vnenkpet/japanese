import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class DictionaryEntryInputType {
  @Field() japanese: string;
  @Field() english: string;
}
