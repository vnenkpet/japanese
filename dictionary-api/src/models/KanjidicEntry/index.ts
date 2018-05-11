import {arrayProp, ModelType, prop, staticMethod, Typegoose} from "typegoose";

export class KanjidicEntry extends Typegoose {
    @staticMethod
    public static async findByKey(this: ModelType<KanjidicEntry> & typeof KanjidicEntry, key: string, limit: number = null) {
        // turn the key into the appropriate regex
        const searchRegex = new RegExp(`^${key.toLocaleLowerCase().trim()}`);

        return this.find({ // search by...
            $or: [
                { "gloss": searchRegex }, // English meaning
                { "kana": searchRegex }, // OR japanese phonetics
                { "romaji": searchRegex }, // OR latin phonetics (todo)
                { "kanji": searchRegex } // OR chinese characters
            ]
        }).limit(limit); // common first
    }

    @prop({required: true})
    public kanjidicId: string;

    @prop({required: true})
    public kanji: string;

    @arrayProp({items: String})
    public kana: string[];

    @arrayProp({items: String})
    public romaji: string[];

    @arrayProp({items: String})
    public gloss: string[];
}

const KanjidicEntryModel = new KanjidicEntry().getModelForClass(KanjidicEntry, {schemaOptions: {collection: 'kanjidic'}});

export default KanjidicEntryModel;