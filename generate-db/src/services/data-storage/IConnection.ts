/**
 * GraphQL-like pagination
 */
export class IConnection<T> {
  total: number;
  edges: Array<{
    node: T;
    cursor: string;
  }>;
  items: T[];
  pageInfo: {
    startCursor: string;
    endCursor: string;
    hasNextPage: boolean;
  };
}
