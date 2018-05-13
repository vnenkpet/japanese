import {arrayProp, prop, Typegoose} from "typegoose";
import TranslationItem from "./TranslationItem";

export default class Translation extends Typegoose {
    @arrayProp({items: String})
    public category: string[]; // "type" not working. Seems like a Typegoose error.

    @arrayProp({items: String})
    public related: string[];

    @arrayProp({items: TranslationItem})
    public translation: TranslationItem[];
}
