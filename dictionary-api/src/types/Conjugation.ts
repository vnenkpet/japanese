import { Field, ObjectType } from "type-graphql";

@ObjectType()
export default class Conjugation {
  @Field() public name: string;

  @Field() public form: string;
}
