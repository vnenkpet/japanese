import {arrayProp, Typegoose} from "typegoose";
import Gloss from "./Gloss";
import PartOfSpeech from "./PartOfSpeech";

export default class ISense extends Typegoose {
    @arrayProp({items: PartOfSpeech})
    public partOfSpeech: PartOfSpeech[];

    @arrayProp({items: Gloss})
    public gloss: Gloss[];
}