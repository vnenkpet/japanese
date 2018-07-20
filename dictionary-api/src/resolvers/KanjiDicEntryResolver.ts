import { Arg, FieldResolver, Int, Query, Resolver, Root } from "type-graphql";
import JmdictEntry from "../schema-types/JmdictEntry";
import JmdictEntryConnection from "../schema-types/JmdictEntryConnection";
import KanjiDicEntry from "../schema-types/KanjiDicEntry";
import KanjiDicEntryConnection from "../schema-types/KanjiDicEntryConnection";
import DbClient from "../services/db";
import { getGraphQLConnectionFromMongoCursor } from "./Pagination";

@Resolver(of => KanjiDicEntry)
export default class KanjiDicEntryResolver {
  @Query(returns => KanjiDicEntry)
  public getKanjiDicInformation(@Arg("kanji") kanji: string) {
    return DbClient.db.collection("kanjidic").findOne({ kanji });
  }

  @Query(returns => KanjiDicEntryConnection)
  public searchKanjiDicEntries(
    @Arg("key") key: string,
    @Arg("first") first: number = 10,
    @Arg("after") after: string = null
  ): Promise<KanjiDicEntryConnection> {
    const cursor = DbClient.db.collection("kanjidic").find({
      $or: [{ kanji: key }, { kana: key }, { romaji: key }, { gloss: key }]
    });

    return getGraphQLConnectionFromMongoCursor<KanjiDicEntry>(
      cursor,
      first,
      after
    );
  }

  @FieldResolver(returns => JmdictEntryConnection)
  public wordsContainingThis(
    @Root() root: KanjiDicEntry,
    @Arg("first", type => Int, { nullable: true })
    first: number = 10,
    @Arg("after", type => Int, { nullable: true })
    after: string = null
  ) {
    const cursor = DbClient.db
      .collection("jmdict")
      .find(
        { "kanji.text": new RegExp(`${root.kanji}`) },
        { sort: { "kanji.common": -1 } }
      );

    return getGraphQLConnectionFromMongoCursor<JmdictEntry>(
      cursor,
      first,
      after
    );
  }
}
