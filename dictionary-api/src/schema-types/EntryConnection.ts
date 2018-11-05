import { Field, ObjectType } from "type-graphql";
import Entry from "./Entry";
import EntryConnectionEdge from "./EntryConnectionEdge";
import IConnection from "./interfaces/IConnection";
import PageInfo from "./PageInfo";

@ObjectType()
export default class EntryConnection implements IConnection<Entry> {
  @Field() public totalCount: number;

  @Field(type => [EntryConnectionEdge])
  public edges: EntryConnectionEdge[];

  @Field(type => PageInfo)
  public pageInfo: PageInfo;
}
