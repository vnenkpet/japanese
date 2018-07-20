import { Field, ObjectType } from "type-graphql";
import KanjiDicEntryConnectionEdge from "./KanjiDicEntryConnectionEdge";
import PageInfo from "./PageInfo";

@ObjectType()
export default class KanjiDicEntryConnection {
  @Field() public totalCount: number;

  @Field(type => [KanjiDicEntryConnectionEdge])
  public edges: KanjiDicEntryConnectionEdge[];

  @Field() public pageInfo: PageInfo;
}
