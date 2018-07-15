import { Field, ObjectType } from "type-graphql";
import Kana from "./Kana";
import Kanji from "./Kanji";
import Translation from "./Translation";

@ObjectType()
export default class JmnedictEntry {
  @Field() public id: string;
  @Field(type => [Kanji])
  public kanji: [Kanji];

  @Field(type => [Kana])
  public kana: [Kana];

  @Field(type => [Translation])
  public translation: [Translation];
}
