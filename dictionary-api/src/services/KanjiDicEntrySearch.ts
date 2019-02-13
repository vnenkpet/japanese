import { Db } from "mongodb";
import { Pagination } from "./Pagination";
import { Inject, Service } from "typedi";
import KanjiDicEntry from "../schema-types/KanjiDicEntry";
import Entry from "../schema-types/Entry";
import Kanji from "../schema-types/Kanji";

@Service()
export class KanjiDicEntrySearch {
  @Inject() private readonly db: Db;
  @Inject() private readonly pagination: Pagination;

  public getKanjiDicInformation(kanji: string) {
    return this.db.collection("kanjidic").findOne({ kanji });
  }

  public getKanji(kanji: Kanji) {
    return this.db
      .collection("kanjidic")
      .find({ _id: { $in: kanji.kanjidic } })
      .toArray();
  }

  public search(key: string, first: number, after: string) {
    const cursor = this.db.collection("kanjidic").find({
      $or: [{ kanji: key }, { kana: key }, { romaji: key }, { gloss: key }],
    });

    return this.pagination.getGraphQLConnectionFromMongoCursor<
      any,
      KanjiDicEntry
    >(cursor, first, after);
  }

  public getWordsContaining(root: KanjiDicEntry, first: number, after: string) {
    const cursor = this.db
      .collection("entries")
      .find(
        { "kanji.text": new RegExp(`${root.kanji}`) },
        { sort: { "kanji.common": -1 } },
      );

    return this.pagination.getGraphQLConnectionFromMongoCursor<any, Entry>(
      cursor,
      first,
      after,
    );
  }
}
