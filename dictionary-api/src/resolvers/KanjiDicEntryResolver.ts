import { Arg, FieldResolver, Int, Query, Resolver, Root } from "type-graphql";
import DbClient from "../services/db";
import JmdictEntry from "../types/JmdictEntry";
import JmnedictEntry from "../types/JmnedictEntry";
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

  @FieldResolver(returns => [JmdictEntry])
  public wordsContainingThis(
    @Root() root: KanjiDicEntry,
    @Arg("limit", type => Int, { nullable: true })
    limit?: number
  ) {
    return DbClient.db
      .collection("jmdict")
      .find(
        { "kanji.text": new RegExp(`${root.kanji}`) },
        { limit, sort: { "kanji.common": -1 } }
      )
      .toArray();
  }

  @FieldResolver(returns => [JmnedictEntry])
  public namesContainingThis(
    @Root() root: KanjiDicEntry,
    @Arg("limit", type => Int, { nullable: true })
    limit?: number
  ) {
    return DbClient.db
      .collection("jmnedict")
      .find({ "kanji.text": new RegExp(`${root.kanji}`) }, { limit })
      .toArray();
  }
}
