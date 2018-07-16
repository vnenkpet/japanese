import { Field, ObjectType } from "type-graphql";

@ObjectType()
export default class TranslationItem {
  @Field() public text: string;
}
