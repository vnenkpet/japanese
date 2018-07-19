import { Field, ObjectType } from "type-graphql";
import JmdictEntryConnectionEdge from "./JmdictEntryConnectionEdge";
import PageInfo from "./PageInfo";

@ObjectType()
export default class JmdictEntryConnection {
  @Field() public totalCount: number;

  @Field(type => [JmdictEntryConnectionEdge])
  public edges: JmdictEntryConnectionEdge[];

  @Field(type => PageInfo)
  public pageInfo: PageInfo;
}
