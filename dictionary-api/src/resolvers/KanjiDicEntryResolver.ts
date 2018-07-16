import { Arg, Query, Resolver } from "type-graphql";
import DbClient from "../services/db";
import KanjiDicEntry from "../types/KanjiDicEntry";

@Resolver(of => KanjiDicEntry)
export default class KanjiDicEntryResolver {
  @Query(returns => KanjiDicEntry)
  public getKanjiDicInformation(@Arg("kanji") kanji: string) {
    return DbClient.db.collection("kanjidic").findOne({ kanji });
  }

  @Query(returns => [KanjiDicEntry])
  public searchKanjiDicEntries(@Arg("key") key: string) {
    return DbClient.db
      .collection("kanjidic")
      .find({
        $or: [{ kanji: key }, { kana: key }, { romaji: key }, { gloss: key }]
      })
      .toArray();
  }
}
