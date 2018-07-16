import { Field, ObjectType } from "type-graphql";

@ObjectType()
export default class KanjiDicEntry {
  @Field() public kanji: string;
  @Field(type => [String])
  public kana: [string];
  @Field(type => [String])
  public romaji: [string];
  @Field(type => [String])
  public gloss: [string];
}
