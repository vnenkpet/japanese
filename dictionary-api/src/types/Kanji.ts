import { Field, ObjectType } from "type-graphql";

@ObjectType()
export default class Kanji {
  @Field() public text: string;

  @Field() public romaji: string;
}
