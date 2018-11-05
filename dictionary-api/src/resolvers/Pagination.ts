import { decode, encode } from "base-64";
import { Cursor } from "mongodb";

export interface ICursor {
  skip: number;
  sort: object;
}

export const createCursor = (obj: ICursor = { skip: 0, sort: {} }): string =>
  encode(JSON.stringify(obj));

export const decodeCursor = (cursor: string): ICursor =>
  JSON.parse(decode(cursor));

export async function getGraphQLConnectionFromMongoCursor<V, T>(
  mongoCursor: Cursor, // return value of .find() in mongodb
  first: number = 10, // how many to fetch
  after?: string, // base64 encoded string
  transformNode?: (node: V) => T
) {
  // default value:
  if (!after) {
    after = createCursor();
  }
  // decode cursor:
  const cursor = decodeCursor(after);

  // get totalCount and entries for nodes
  const [totalCount, entries] = await Promise.all([
    mongoCursor.count(),
    mongoCursor
      .sort(cursor.sort)
      .skip(cursor.skip)
      .limit(first)
      .toArray()
  ]);

  // get startCursor and endCursor
  const startCursor: string = createCursor({
    skip: cursor.skip,
    sort: cursor.sort
  });

  const endCursor: string = createCursor({
    skip: cursor.skip + entries.length,
    sort: cursor.sort
  });

  // return graphql connection response
  return {
    edges: entries.map((entry: V, index: number) => {
      return {
        cursor: createCursor({
          skip: cursor.skip + index + 1,
          sort: cursor.sort
        }),
        node: transformNode(entry)
      };
    }),
    pageInfo: {
      endCursor,
      hasNextPage: cursor.skip + first <= totalCount - 1,
      startCursor
    },
    totalCount
  };
}
