import { Arg, Int, Query, Resolver } from "type-graphql";
import db from "../services/db";
import JmnedictEntry from "../types/JmnedictEntry";

@Resolver(of => JmnedictEntry)
export default class JmnedictEntryResolver {
  @Query(returns => [JmnedictEntry])
  public searchJmnedictEntries(
    @Arg("key") key: string,
    @Arg("limit", type => Int, { nullable: true })
    limit?: number
  ) {
    if (!limit) {
      limit = 10;
    }
    const searchRegex = new RegExp(`^${key}`);
    return db.get("jmnedict").find(
      {
        $or: [
          { "kanji.text": searchRegex },
          { "kana.text": searchRegex },
          { "kana.romaji": searchRegex },
          { "translation.translation.text": searchRegex }
        ]
      },
      { limit }
    );
  }
}
