import { Field, ObjectType } from "type-graphql";
import Entry from "./Entry";
import EntryConnectionEdge from "./EntryConnectionEdge";
import PageInfo from "../../utils/schema/PageInfo";
import IConnection from "../../utils/schema/interfaces/IConnection";

@ObjectType({
    description:
        "Connection for Dictionary Entries. Currently uses cursor composed from `limit` and `skip`.",
})
export default class EntryConnection implements IConnection<Entry> {
    @Field() public totalCount: number;

    @Field(type => [EntryConnectionEdge])
    public edges: EntryConnectionEdge[];

    @Field(type => [Entry])
    public items: Entry[];

    @Field(type => PageInfo)
    public pageInfo: PageInfo;
}
