import { Field, ObjectType } from "type-graphql";
import KanjiDicEntry from "./KanjiDicEntry";
import KanjiDicEntryConnectionEdge from "./KanjiDicEntryConnectionEdge";
import PageInfo from "../../entries/schema/PageInfo";
import IConnection from "../../../modules/utils/schema/interfaces/IConnection";

@ObjectType({
    description:
        "Connection for KanjiDic Entries. Currently uses cursor composed from `limit` and `skip`.",
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
