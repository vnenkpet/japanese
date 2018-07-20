import { Field, ObjectType } from "type-graphql";
import Gloss from "./Gloss";

@ObjectType()
export default class Sense {
  @Field(type => [String])
  public field: [string];

  @Field(type => [String])
  public dialect: [string];

  @Field(type => [String])
  public misc: [string];

  @Field(type => [String])
  public info: [string];

  @Field(type => [Gloss])
  public gloss: [Gloss];

  @Field(type => [String])
  public partOfSpeech: [string];
}
