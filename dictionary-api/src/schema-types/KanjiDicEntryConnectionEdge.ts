import { Field, ObjectType } from "type-graphql";
import KanjiDicEntry from "./KanjiDicEntry";

@ObjectType()
export default class KanjiDicEntryConnectionEdge {
  @Field(type => KanjiDicEntry)
  public node: KanjiDicEntry;

  @Field() public cursor: string;
}
