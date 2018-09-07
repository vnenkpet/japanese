import { IConnectionData } from "../schema/IConnectionData";

export default function updateQuery<T>(
  previousResult: IConnectionData<T>,
  { fetchMoreResult }: { fetchMoreResult: IConnectionData<T> }
) {
  const newEdges = fetchMoreResult.connection.edges;
  const pageInfo = fetchMoreResult.connection.pageInfo;

  return newEdges.length
    ? {
        // Put the new results at the end of the list and update `pageInfo`
        // so we have the new `endCursor` and `hasNextPage` values
        connection: {
          __typename: previousResult.connection.__typename,
          edges: [...previousResult.connection.edges, ...newEdges],
          pageInfo,
          totalCount: fetchMoreResult.connection.totalCount
        }
      }
    : previousResult;
}
