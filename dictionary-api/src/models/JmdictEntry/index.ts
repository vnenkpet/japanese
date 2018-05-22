import {arrayProp, ModelType, prop, staticMethod, Typegoose} from 'typegoose';
import Kana from "./Kana";
import Kanji from "./Kanji";
import Sense from "./Sense";

/*
This is a representation of the JMDICT entry in a json format
 */

class JmdictEntry extends Typegoose {
    @staticMethod
    public static async findByKey(this: ModelType<JmdictEntry> & typeof JmdictEntry, key: string, limit: number = null) {
        // turn the key into the appropriate regex
        const searchRegex = new RegExp(`^${key.toLocaleLowerCase().trim()}`);

        return this.find({ // search by...
            $or: [
                { "sense.gloss.searchKey": searchRegex }, // English meaning
                { "kana.text": searchRegex }, // OR japanese phonetics
                { "kana.romaji": searchRegex }, // OR latin phonetics (todo)
                { "kanji.text": searchRegex } // OR chinese characters
            ]
        }).sort([["kanji.common", -1]]).limit(limit); // common first
    }

    @prop({required: true})
    public jmdictId: string;
    
    @arrayProp({items: Kanji})
    public kanji: Kanji[];
    
    @arrayProp({items: Kana})
    public kana: Kana[];
    
    @arrayProp({items: Sense})
    public sense: Sense[];
}

const JmdictEntryModel = new JmdictEntry().getModelForClass(JmdictEntry, {schemaOptions: {collection: 'jmdict'}});

export default JmdictEntryModel;