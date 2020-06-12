import { Field, ID, ObjectType } from "type-graphql";
import Conjugation from "./Conjugation";
import EntryDisplay from "./EntryDisplay";
import JLPT_NUMBER from "./enums/JlptType";
import Kana from "./Kana";
import Kanji from "./Kanji";
import Sense from "./Sense";
import Translation from "./Translation";

@ObjectType({ description: "JMDICT and JMNEDICT dictionary entry" })
export default class Entry {
    @Field(type => ID)
    public id: string;

    @Field(type => EntryDisplay)
    public simple: EntryDisplay;

    @Field(type => [Kanji])
    public kanji: [Kanji];

    @Field(type => [Kana])
    public kana: [Kana];

    @Field(type => [Sense], {
        nullable: true,
        description: "Field is only present when `source` property is jmdict",
    })
    public sense?: [Sense];

    @Field(type => [Conjugation], { nullable: true })
    public conjugations?: [Conjugation];

    @Field(type => [Translation], {
        nullable: true,
        description: "Field is only present when `source` property is jmnedict",
    })
    public translation?: [Translation];

    @Field({
        nullable: true,
        description: "How many search results did we scrape through bing",
    })
    public bingSearchResults?: number;

    @Field(type => JLPT_NUMBER, { nullable: true })
    public jlpt?: JLPT_NUMBER;

    @Field() public source: string;
}
