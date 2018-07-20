import { decode, encode } from "base-64";
import { Cursor } from "mongodb";

export async function getGraphQLConnectionFromMongoCursor<T>(
  mongoCursor: Cursor, // return value of .find() in mongodb
  first: number = 10, // how many to fetch
  after: string = encode("0") // base64 encoded string
) {
  // decode cursor:
  const offset = +decode(after);

  // get totalCount and entries for nodes
  const [totalCount, entries] = await Promise.all([
    mongoCursor.count(),
    mongoCursor
      .skip(offset)
      .limit(first)
      .toArray()
  ]);

  // get startCursor and endCursor
  const startCursor: string = encode(`${offset}`);
  const endCursor: string = encode(`${offset + entries.length}`);

  // return graphql connection response
  return {
    edges: entries.map((entry: T, index: number) => {
      return {
        cursor: encode(`${offset + index + 1}`),
        node: entry
      };
    }),
    pageInfo: {
      endCursor,
      hasNextPage: offset + first <= totalCount - 1,
      startCursor
    },
    totalCount
  };
}
