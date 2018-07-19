import { Field, ObjectType } from "type-graphql";
import JmdictEntry from "./JmdictEntry";

@ObjectType()
export default class JmdictEntryConnectionEdge {
  @Field(type => JmdictEntry)
  public node: JmdictEntry;

  @Field() public cursor: string;
}
