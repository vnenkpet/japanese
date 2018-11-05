export default interface IConnection<T> {
  totalCount: number;
  pageInfo: {
    hasNextPage: boolean;
    startCursor?: string;
    endCursor?: string;
  };
  edges: Array<{
    node: T;
    cursor: string;
  }>;
}
