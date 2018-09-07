import { Cursor } from "mongodb";
import { Arg, Int, Query, Resolver } from "type-graphql";
import JmdictEntry from "../schema-types/Entry";
import EntryConnection from "../schema-types/EntryConnection";
import DbClient from "../services/db";
import {
  createCursor,
  getGraphQLConnectionFromMongoCursor
} from "./Pagination";

@Resolver(of => EntryConnection)
export default class EntryResolver {
  @Query(returns => EntryConnection)
  public async searchEntries(
    @Arg("key") key: string,
    @Arg("first", type => Int, { nullable: true })
    first: number = 10,
    @Arg("after", { nullable: true })
    after: string = createCursor({
      skip: 0,
      sort: { bingSearchResults: -1, "kanji.common": -1 }
    })
  ): Promise<EntryConnection> {
    let isRegex = false;

    const beginning = key.slice(0, 1);
    const end = key.slice(-1);
    if (beginning === "/" && end === "/") {
      isRegex = true;
    }

    let mongoQuery: Cursor = null;

    if (isRegex) {
      const regex = new RegExp(key.substring(1, key.length - 1));
      // prepare the mongo request
      mongoQuery = await DbClient.db.collection("entries").find({
        $or: [
          // process regexes
          { "kanji.text": regex },
          { "kana.text": regex },
          { "kana.romaji": regex },
          { "sense.0.gloss.searchKey": regex },
          { "sense.0.gloss.searchKey": regex },
          { "translation.translation.searchKey": regex }
        ]
      });
    } else {
      key = key
        .toLowerCase()
        .replace("/", "")
        .trim();

      // prepare search regex:
      const searchRegexKanji = new RegExp(`^${key}$`);
      // todo: recognize regex in key, don't use text search in that case

      const searchRegexLatin = new RegExp(`^${key}($|\\s)`);

      let verbSearchRegex = searchRegexLatin;
      if (key.substring(0, 3) !== "to ") {
        verbSearchRegex = new RegExp(`^to ${key}($|\\s)`);
      }
      // todo: deal with suru-verbs (e. g. "to practice" should find "practice (vs)")

      // prepare the mongo request
      mongoQuery = await DbClient.db.collection("entries").find({
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
              { "translation.translation.searchKey": searchRegexLatin }
            ]
          }
        ]
      });
    }
    return getGraphQLConnectionFromMongoCursor<JmdictEntry>(
      mongoQuery,
      first,
      after
    );
  }
}
