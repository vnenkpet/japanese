import { Field, ObjectType } from "type-graphql";

@ObjectType({
    description: "Simplified schema type for reading JMDICT/JMNEDICT entry",
})
export default class EntryDisplay {
    @Field({
        description: "Kanji or kana that is most commonly used for this word",
    })
    public text: string;

    @Field({
        nullable: true,
        description:
            "Only present when the word is usually written in kana (`hasFurigana` is true)",
    })
    public furigana?: string;

    @Field({ description: "Latin alphabet transcription" })
    public romaji: string;

    @Field() public hasFurigana: boolean;

    @Field({ description: "Primary English meaning" })
    public translation: string;

    @Field() public info: string;
}
