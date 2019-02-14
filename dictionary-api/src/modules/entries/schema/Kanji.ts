import { Field, ObjectType } from "type-graphql";
import KanjiDicEntry from "../../kanji/schema/KanjiDicEntry";

@ObjectType()
export default class Kanji {
    @Field() public text: string;

    @Field(type => [KanjiDicEntry])
    public kanjidic: [KanjiDicEntry];

    @Field() public common: boolean;

    @Field(type => [String])
    public tags: [string];
}
