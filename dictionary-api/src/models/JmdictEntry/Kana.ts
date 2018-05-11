import {prop, Typegoose} from "typegoose";

export default class Kana extends Typegoose {
    @prop({required: true})
    public common: string;

    @prop({required: true})
    public text: string;
}
