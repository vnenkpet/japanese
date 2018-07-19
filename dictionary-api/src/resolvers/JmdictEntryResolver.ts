import { decode, encode } from "base-64";
import { conjugate } from "jp-conjugation";
import { Arg, FieldResolver, Int, Query, Resolver, Root } from "type-graphql";
import DbClient from "../services/db";
import Conjugation from "../types/Conjugation";
import JmdictEntry from "../types/JmdictEntry";
import JmdictEntryConnection from "../types/JmdictEntryConnection";
import JmdictEntryConnectionEdge from "../types/JmdictEntryConnectionEdge";

enum VERB_TYPE {
  v5u,
  v5k,
  v5g,
  v5s,
  v5t,
  v5m,
  v5b,
  v5n,
  v5r,
  v1
}

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
    // decode cursor:
    let offset: number = 0;
    if (after) {
      offset = +decode(after);
    }

    // prepare regex:
    const searchRegex = new RegExp(`^${key.trim()}$`);
    const verbSearchRegex = new RegExp(`^to ${key.trim()}$`);

    // prepare the mongo request
    const mongoQuery = await DbClient.db.collection("jmdict").find({
      $or: [
        { "kanji.text": searchRegex },
        { "kana.text": searchRegex },
        { "kana.romaji": searchRegex },
        { "sense.gloss.text": searchRegex },
        { "sense.gloss.text": verbSearchRegex }
      ]
    });

    // get totalCount and entries for nodes
    const totalCount = await mongoQuery.count();
    const entries = await mongoQuery
      .skip(offset)
      .limit(first)
      .sort({ "kanji.common": -1 })
      .toArray();

    // map entries and and find endCursor
    let endCursor: string = null;

    // return graphql connection
    return {
      edges: entries.map((entry, index) => {
        endCursor = encode(`${offset + index + 1}`);
        return {
          cursor: endCursor,
          node: entry
        };
      }),
      pageInfo: {
        endCursor,
        hasNextPage: offset + first < totalCount - 1
      },
      totalCount
    };
  }

  @FieldResolver(returns => [Conjugation])
  public conjugations(@Root() root: JmdictEntry): [Conjugation] {
    if (root.sense[0].partOfSpeech.some(pos => pos in VERB_TYPE)) {
      return conjugate(root.kanji[0].text);
    } else {
      return null;
    }
  }
}
