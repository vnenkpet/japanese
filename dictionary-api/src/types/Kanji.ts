import { Field, ObjectType } from "type-graphql";
import KanjiDicEntry from "./KanjiDicEntry";

@ObjectType()
export default class Kanji {
  @Field() public text: string;

  @Field(type => [KanjiDicEntry])
  public kanjidic: [KanjiDicEntry];
}
