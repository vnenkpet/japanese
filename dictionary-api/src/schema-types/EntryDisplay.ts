import { Field, ObjectType } from "../../node_modules/type-graphql";
import Sense from "./Sense";

@ObjectType()
export default class EntryDisplay {
  @Field() public text: string;

  @Field({ nullable: true })
  public furigana?: string;

  @Field()
  public romaji: string;

  @Field() public hasFurigana: boolean;

  @Field(type => Sense)
  public sense: Sense;
}
