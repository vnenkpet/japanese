import { FieldResolver, Resolver, Root } from "type-graphql";
import Kanji from "../schema-types/Kanji";
import KanjiDicEntry from "../schema-types/KanjiDicEntry";
import DbClient from "../services/db";

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
