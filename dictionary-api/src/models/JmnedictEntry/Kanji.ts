import {arrayProp, prop, Ref, Typegoose} from "typegoose";
import { KanjidicEntry } from "../KanjidicEntry"

export default class Kanji extends Typegoose {
    @prop({required: true})
    public text: string;

    @arrayProp({items: String})
    public tags: string[];

    @arrayProp({itemsRef: KanjidicEntry})
    public kanjidic: Array<Ref<KanjidicEntry>>;
}