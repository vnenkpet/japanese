import { Field, ObjectType } from "type-graphql";
import IConnection from "./interfaces/IConnection";
import KanjiDicEntry from "./KanjiDicEntry";
import KanjiDicEntryConnectionEdge from "./KanjiDicEntryConnectionEdge";
import PageInfo from "./PageInfo";

@ObjectType({
  description:
    "Connection for KanjiDic Entries. Currently uses cursor composed from `limit` and `skip`."
})
export default class KanjiDicEntryConnection
  implements IConnection<KanjiDicEntry> {
  @Field() public totalCount: number;

  @Field(type => [KanjiDicEntryConnectionEdge])
  public edges: KanjiDicEntryConnectionEdge[];

  @Field(type => [KanjiDicEntry])
  public items: KanjiDicEntry[];

  @Field() public pageInfo: PageInfo;
}
