import { Field, ObjectType } from "type-graphql";

@ObjectType()
export default class Kana {
  @Field() public text: string;

  @Field() public romaji: string;

  @Field() public common: boolean;

  @Field(type => [String])
  public tags: [string];
}
