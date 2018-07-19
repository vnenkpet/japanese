import { Field, ObjectType } from "type-graphql";
import Conjugation from "./Conjugation";
import Kana from "./Kana";
import Kanji from "./Kanji";
import Sense from "./Sense";

@ObjectType()
export default class JmdictEntry {
  @Field() public id: string;
  @Field(type => [Kanji])
  public kanji: [Kanji];

  @Field(type => [Kana])
  public kana: [Kana];

  @Field(type => [Sense])
  public sense: [Sense];

  @Field(type => [Conjugation])
  public conjugation: [Conjugation];
}
