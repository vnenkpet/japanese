import {arrayProp, prop, Typegoose} from "typegoose";
import TranslationItem from "./TranslationItem";

export default class Translation extends Typegoose {
    // @arrayProp({items: String}) todo - "type" breaks down
    // public type: string[]

    @arrayProp({items: String})
    public related: string[];

    @arrayProp({items: TranslationItem})
    public translation: TranslationItem[];
}
