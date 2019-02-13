import { decode, encode } from "base-64";
import { Cursor } from "mongodb";
import { Service } from "typedi";

export interface ICursor {
  skip: number;
  sort: object;
}

@Service()
export class Pagination {
  public createCursor(obj: ICursor = { skip: 0, sort: {} }): string {
    return encode(JSON.stringify(obj));
  }

  public decodeCursor(cursor: string): ICursor {
    return JSON.parse(decode(cursor));
  }

  public async getGraphQLConnectionFromMongoCursor<InputNode, OutputNode>(
    mongoCursor: Cursor, // return value of .find() in mongodb
    first: number = 10, // how many to fetch
    after?: string, // base64 encoded string
    transformNodeFunction?: (node: InputNode) => OutputNode,
  ) {
    // default value:
    if (!after) {
      after = this.createCursor();
    }
    // decode cursor:
    const cursor = this.decodeCursor(after);

    // get totalCount and entries for nodes
    const [totalCount, entries] = await Promise.all([
      mongoCursor.count(),
      mongoCursor
        .sort(cursor.sort)
        .skip(cursor.skip)
        .limit(first)
        .toArray(),
    ]);

    // get startCursor and endCursor
    const startCursor: string = this.createCursor({
      skip: cursor.skip,
      sort: cursor.sort,
    });

    const endCursor: string = this.createCursor({
      skip: cursor.skip + entries.length,
      sort: cursor.sort,
    });

    // return graphql connection response
    return {
      edges: entries.map((entry: InputNode, index: number) => {
        return {
          cursor: this.createCursor({
            skip: cursor.skip + index + 1,
            sort: cursor.sort,
          }),
          node: transformNodeFunction(entry),
        };
      }),
      items: entries.map(transformNodeFunction),
      pageInfo: {
        endCursor,
        hasNextPage: cursor.skip + first <= totalCount - 1,
        startCursor,
      },
      totalCount,
    };
  }
}
