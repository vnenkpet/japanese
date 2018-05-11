import {prop, Typegoose} from "typegoose";

export default class IGloss extends Typegoose {
    @prop({required: true})
    public lang: string;

    @prop({required: true})
    public text: string;
}