import { Field, ID, ObjectType } from "type-graphql";
import Conjugation from "./Conjugation";
import Kana from "./Kana";
import Kanji from "./Kanji";
import Sense from "./Sense";
import Translation from "./Translation";

@ObjectType()
export default class Entry {
  @Field(type => ID)
  public id: string;

  @Field(type => [Kanji])
  public kanji: [Kanji];

  @Field(type => [Kana])
  public kana: [Kana];

  @Field(type => [Sense], { nullable: true })
  public sense?: [Sense];

  @Field(type => [Conjugation], { nullable: true })
  public conjugations?: [Conjugation];

  @Field(type => [Translation], { nullable: true })
  public translation?: [Translation];

  @Field({ nullable: true })
  public bingSearchResults?: number;

  @Field({ nullable: true })
  public jlpt?: string;

  @Field() public source: string;
}
