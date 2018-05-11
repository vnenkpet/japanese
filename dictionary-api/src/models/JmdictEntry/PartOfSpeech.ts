import {prop, Typegoose} from "typegoose";

export default class PartOfSpeech extends Typegoose {
    @prop({required: true})
    public type: string;
}