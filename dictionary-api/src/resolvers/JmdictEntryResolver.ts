import { Arg, Int, Query, Resolver } from "type-graphql";
import DbClient from "../services/db";
import JmdictEntry from "../types/JmdictEntry";

@Resolver(of => JmdictEntry)
export default class JmdictEntryResolver {
  @Query(returns => [JmdictEntry])
  public searchJmdictEntries(
    @Arg("key") key: string,
    @Arg("limit", type => Int, { nullable: true })
    limit?: number
  ) {
    if (!limit) {
      limit = 10;
    }
    const searchRegex = new RegExp(`^${key}$`);
    return DbClient.db
      .collection("jmdict")
      .find(
        {
          $or: [
            { "kanji.text": searchRegex },
            { "kana.text": searchRegex },
            { "kana.romaji": searchRegex },
            { "sense.gloss.text": searchRegex }
          ]
        },
        { limit, sort: { "kanji.common": -1 } }
      )
      .toArray();
  }
}
