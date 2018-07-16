import { FieldResolver, Resolver, Root } from "type-graphql";
import DbClient from "../services/db";
import Kanji from "../types/Kanji";
import KanjiDicEntry from "../types/KanjiDicEntry";

@Resolver(of => Kanji)
export default class KanjiResolver {
  @FieldResolver(returns => [KanjiDicEntry])
  public kanjidic(@Root() kanji: Kanji) {
    return DbClient.db
      .collection("kanjidic")
      .find({ _id: { $in: kanji.kanjidic } })
      .toArray();
  }
}
