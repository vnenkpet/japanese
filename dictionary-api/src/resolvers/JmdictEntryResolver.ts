import { Arg, Int, Query, Resolver } from "type-graphql";
import JmdictEntry from "../schema-types/JmdictEntry";
import JmdictEntryConnection from "../schema-types/JmdictEntryConnection";
import DbClient from "../services/db";
import { getGraphQLConnectionFromMongoCursor } from "./Pagination";

@Resolver(of => JmdictEntryConnection)
export default class JmdictEntryResolver {
  @Query(returns => JmdictEntryConnection)
  public async searchJmdictEntries(
    @Arg("key") key: string,
    @Arg("first", type => Int, { nullable: true })
    first: number = 10,
    @Arg("after", { nullable: true })
    after: string = null
  ): Promise<JmdictEntryConnection> {
    // prepare search regex:
    const searchRegex = new RegExp(`^${key.trim()}$`);
    const verbSearchRegex = new RegExp(`^to ${key.trim()}$`);

    // prepare the mongo request
    const mongoQuery = await DbClient.db.collection("jmdict").find(
      {
        $or: [
          { "kanji.text": searchRegex },
          { "kana.text": searchRegex },
          { "kana.romaji": searchRegex },
          { "sense.gloss.text": searchRegex },
          { "sense.gloss.text": verbSearchRegex }
        ]
      },
      { sort: { "kanji.common": -1 } }
    );

    return getGraphQLConnectionFromMongoCursor<JmdictEntry>(
      mongoQuery,
      first,
      after
    );
  }
}
