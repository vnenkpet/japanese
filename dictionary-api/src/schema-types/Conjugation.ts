import { Field, ObjectType } from "type-graphql";

@ObjectType({ description: "Verb conjugation" })
export default class Conjugation {
  @Field() public name: string;

  @Field() public form: string;
}
