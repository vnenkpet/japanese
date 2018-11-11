import { Field, ObjectType } from "../../node_modules/type-graphql";

@ObjectType()
export default class EntryDisplay {
  @Field() public text: string;

  @Field({ nullable: true })
  public furigana?: string;

  @Field() public romaji: string;

  @Field() public hasFurigana: boolean;

  @Field() public translation: string;

  @Field() public info: string;
}
