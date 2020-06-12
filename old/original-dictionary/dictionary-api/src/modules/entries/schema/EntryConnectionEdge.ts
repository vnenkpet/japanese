import { Field, ObjectType } from "type-graphql";
import Entry from "./Entry";

@ObjectType()
export default class EntryConnectionEdge {
    @Field(type => Entry)
    public node: Entry;

    @Field() public cursor: string;
}
