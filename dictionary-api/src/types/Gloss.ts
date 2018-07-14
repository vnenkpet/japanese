import { Field, ObjectType } from "type-graphql";

@ObjectType()
export default class Gloss {
  @Field() public text: string;
}
