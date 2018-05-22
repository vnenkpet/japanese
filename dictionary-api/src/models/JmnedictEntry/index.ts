import {arrayProp, ModelType, prop, staticMethod, Typegoose} from 'typegoose';
import Kana from "./Kana";
import Kanji from "./Kanji";
import Translation from "./Translation";

/*
This is a representation of the JMNEDICT entry in a json format
 */

class JmnedictEntry extends Typegoose {
    @staticMethod
    public static async findByKey(this: ModelType<JmnedictEntry> & typeof JmnedictEntry, key: string, limit: number = null) {
        // turn the key into the appropriate regex
        const searchRegex = new RegExp(`^${key.toLocaleLowerCase().trim()}`);

        return this.find({ // search by...
            $or: [
                { "translation.translation.searchKey": searchRegex }, // English name
                { "kana.text": searchRegex }, // OR japanese phonetics
                { "kana.romaji": searchRegex }, // OR latin phonetics (todo)
                { "kanji.text": searchRegex } // OR chinese characters
            ]
        }).limit(limit); // common first
    }

    @prop({required: true})
    public jmnedictId: string;

    @arrayProp({items: Kanji})
    public kanji: Kanji[];
    
    @arrayProp({items: Kana})
    public kana: Kana[];

    @arrayProp({items: Translation})
    public translation: Translation[];
}

const JmnedictEntryModel = new JmnedictEntry().getModelForClass(JmnedictEntry, {schemaOptions: {collection: 'jmnedict'}});

export default JmnedictEntryModel;