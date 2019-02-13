import { Field, ObjectType } from "type-graphql";

@ObjectType()
export default class Kana {
  @Field() public text: string;

  @Field({
    description: "Transcription into latin alphabet",
    deprecationReason: "auto-generated, not suitable for live use",
  })
  public romaji: string;

  @Field() public common: boolean;

  @Field(type => [String])
  public tags: [string];
}
