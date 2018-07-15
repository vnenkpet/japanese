import { Field, ObjectType } from "type-graphql";

@ObjectType()
export default class TranslationText {
  @Field() public text: string;
}
