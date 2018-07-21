import * as React from "react";
import { Query } from "react-apollo";
import SearchQueryEntry from "./JmdictEntry";
import updateQuery from "./pagination/updateQuery";
import searchJmdictQuery from "./queries/searchJmdictQuery";
import { IConnectionData } from "./schema/Connection";
import IJmdictEntry from "./schema/IJmdictEntry";

interface IVariables {
  key: string;
}

export default ({ searchKey }: { searchKey?: string }) => (
  <Query<IConnectionData<IJmdictEntry>, IVariables>
    query={searchJmdictQuery}
    variables={{ key: searchKey }}
  >
    {({ loading, error, data, fetchMore }) => {
      if (loading) {
        return <span>Loading...</span>;
      }
      if (error) {
        return <span>{error.toString()}</span>;
      }
      return (
        <div>
          Found: {data.connection.totalCount} results.
          {data.connection.edges.map((edge, edgeIndex) => {
            return <SearchQueryEntry key={edgeIndex} {...edge.node} />;
          })}
          {data.connection.pageInfo.hasNextPage ? (
            <button
              onClick={() =>
                fetchMore({
                  query: searchJmdictQuery,
                  updateQuery: (previousResult, { fetchMoreResult }) => {
                    return updateQuery<IJmdictEntry>(previousResult, {
                      fetchMoreResult
                    });
                  },
                  variables: {
                    cursor: data.connection.pageInfo.endCursor,
                    key: searchKey
                  }
                })
              }
            >
              Load more...
            </button>
          ) : (
            "No more results."
          )}
        </div>
      );
    }}
  </Query>
);
