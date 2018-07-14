import { Field, ObjectType } from "type-graphql";

@ObjectType()
export default class Kana {
  @Field() public text: string;

  @Field() public romaji: string;
}
