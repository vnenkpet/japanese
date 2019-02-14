import { Cursor, Db } from "mongodb";
import { Pagination } from "../../../services/Pagination";
import { Service, Inject } from "typedi";
import serializeEntry from "../../../services/serializeEntry";
import Entry from "../schema/Entry";
import JLPT_NUMBER from "../schema/enums/JlptType";

@Service()
export class DictionaryEntrySearch {
    @Inject() private readonly db: Db;
    @Inject() private readonly pagination: Pagination;

    public async getEntriesByJlpt(jlpt: JLPT_NUMBER) {
        const vocabulary = await this.db
            .collection("entries")
            .find({
                jlpt,
            })
            .toArray();
        return vocabulary.map(serializeEntry);
    }

    public async search(
        key: string,
        first: number = 10,
        after: string = this.pagination.createCursor({
            skip: 0,
            sort: {
                "bingSearchResults": -1,
                "kanji.common": -1,
            },
        }),
    ) {
        key = decodeURIComponent(key);
        key = key.trim();
        let isRegex = false;

        const beginning = key.slice(0, 1);
        const end = key.slice(-1);
        if (beginning === "/" && end === "/") {
            isRegex = true;
        }

        const mongoQuery: Cursor = await (isRegex
            ? this.createCursorForRegexKey(key)
            : this.createCursorForStringKey(key));

        return this.pagination.getGraphQLConnectionFromMongoCursor<any, Entry>(
            mongoQuery,
            first,
            after,
            serializeEntry,
        );
    }

    /**
     * This creates a mongoQuery cursor for searching the dictionary using regex.
     *
     * @param key A regular expression string (starts and ends with '/').
     */
    private createCursorForStringKey(key: string) {
        key = key.toLowerCase().trim();

        // prepare search regex:
        const searchRegexKanji = new RegExp(`^${key}$`);
        const searchRegexLatin = new RegExp(`^${key}($|\\s)`);
        let verbSearchRegex = searchRegexLatin;

        // deal with verbs
        if (key.substring(0, 3) !== "to ") {
            verbSearchRegex = new RegExp(`^to ${key}($|\\s)`);
        }

        // prepare the mongo request
        return this.db.collection("entries").find({
            $and: [
                { $text: { $search: key } }, // narrow down search by text index
                {
                    $or: [
                        // process regexes
                        { "kanji.text": searchRegexKanji },
                        { "kana.text": searchRegexKanji },
                        { "kana.romaji": searchRegexKanji },
                        { "sense.gloss.searchKey": searchRegexLatin },
                        { "sense.gloss.searchKey": verbSearchRegex },
                        {
                            "translation.translation.searchKey": searchRegexLatin,
                        },
                    ],
                },
            ],
        });
    }

    /**
     * This creates a mongoQuery cursor for searching the dictionary using a regular string.
     *
     * @param key A string search key (e. g. "Dog", "Pikachu", "ピカチュウ")
     */
    private createCursorForRegexKey(key: string) {
        const regex = new RegExp(key.substring(1, key.length - 1));
        // prepare the mongo request
        return this.db.collection("entries").find({
            $or: [
                // process regexes
                { "kanji.text": regex },
                { "kana.text": regex },
                { "kana.romaji": regex },
                { "sense.0.gloss.searchKey": regex },
                { "sense.0.gloss.searchKey": regex },
                { "translation.translation.searchKey": regex },
            ],
        });
    }
}
