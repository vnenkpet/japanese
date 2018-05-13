import {prop, Typegoose} from "typegoose";

export default class TranslationItem extends Typegoose {
    @prop({required: true})
    public text: string;
}
