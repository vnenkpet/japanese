import { Field, ObjectType } from "type-graphql";
import TranslationItem from "./TranslationItem";

@ObjectType()
export default class Translation {
  @Field(type => [TranslationItem])
  public translation: [TranslationItem];
  @Field(type => [String])
  public type: [string];
}
