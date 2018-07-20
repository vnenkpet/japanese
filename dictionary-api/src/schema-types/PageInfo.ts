import { Field, ObjectType } from "type-graphql";

@ObjectType()
export default class PageInfo {
  @Field() public hasNextPage: boolean;

  @Field({ nullable: true })
  public endCursor?: string;

  @Field({ nullable: true })
  public startCursor?: string;
}
