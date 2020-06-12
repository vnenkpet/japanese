interface IEdge<T> {
  node: T;
  cursor: string;
}

interface IPageInfo {
  startCursor?: string;
  endCursor?: string;
  hasNextPage?: boolean;
}

export interface IConnectionData<T> {
  connection: {
    __typename?: string;
    totalCount: number;
    edges: [IEdge<T>];
    pageInfo: IPageInfo;
  };
}
