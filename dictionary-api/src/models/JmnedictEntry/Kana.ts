import {prop, Typegoose} from "typegoose";

export default class Kana extends Typegoose {
    @prop({required: true})
    public text: string;
}
