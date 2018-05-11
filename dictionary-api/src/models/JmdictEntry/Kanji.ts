import {arrayProp, prop, Ref, Typegoose} from "typegoose";
import { KanjidicEntry } from "../KanjidicEntry"

export default class Kanji extends Typegoose {
    @prop()
    public common?: string;

    @prop({required: true})
    public text: string;

    @prop({items: String})
    public tags: string[];

    @arrayProp({itemsRef: KanjidicEntry})
    public kanjidic: Ref<KanjidicEntry>[];
}