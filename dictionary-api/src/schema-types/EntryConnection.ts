import { Field, ObjectType } from "type-graphql";
import Entry from "./Entry";
import EntryConnectionEdge from "./EntryConnectionEdge";
import IConnection from "./interfaces/IConnection";
import PageInfo from "./PageInfo";

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
