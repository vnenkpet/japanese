import { Field, ObjectType } from "type-graphql";
import Gloss from "./Gloss";

@ObjectType()
export default class Sense {
  @Field(type => [Gloss])
  public gloss: [Gloss];

  @Field(type => [String])
  public partOfSpeech: [string];
}
