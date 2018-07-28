import { Field, ObjectType } from "type-graphql";
import EntryConnectionEdge from "./EntryConnectionEdge";
import PageInfo from "./PageInfo";

@ObjectType()
export default class EntryConnection {
  @Field() public totalCount: number;

  @Field(type => [EntryConnectionEdge])
  public edges: EntryConnectionEdge[];

  @Field(type => PageInfo)
  public pageInfo: PageInfo;
}
