import * as React from "react";
import { Query } from "react-apollo";
import * as InfiniteScroller from "react-infinite-scroller";
import updateQuery from "../../../../../pagination/updateQuery";
import searchJmdictQuery from "../../../../../queries/searchJmdictQuery";
import { IConnectionData } from "../../../../../schema/IConnectionData";
import IDictionaryEntry from "../../../../../schema/IDictionaryEntry";
import styled from "../../../../../styled-components";
import DictionaryEntry from "./DictionaryEntry";

interface IVariables {
  key: string;
}

const SearchInfo = styled.div`
  margin-top: 10px;
  opacity: 0.8;
`;

const Loading = styled.div`
  margin-top: 10px;
  opacity: 0.8;
`;

const Separator = styled.hr`
  border-top: 1px dashed black;
  opacity: 0.3;
`;

const NoResults = styled.div`
  margin-top: 10px;
  font-size: 20px;
`;

const DictionarySearchResults: React.SFC<{ searchKey?: string }> = ({
  searchKey
}) => (
  <Query<IConnectionData<IDictionaryEntry>, IVariables>
    query={searchJmdictQuery}
    variables={{ key: searchKey }}
  >
    {({ loading, error, data, fetchMore }) => {
      if (loading) {
        return <Loading>Loading...</Loading>;
      }
      if (error) {
        return <span>{error.toString()}</span>;
      }
      return (
        <div>
          <SearchInfo>
            Found: {data.connection.totalCount} results for "{searchKey}
            ".
          </SearchInfo>
          <InfiniteScroller
            pageStart={0}
            hasMore={data.connection.pageInfo.hasNextPage}
            loader={<Loading>Loading more...</Loading>}
            loadMore={() =>
              fetchMore({
                query: searchJmdictQuery,
                updateQuery: (previousResult, { fetchMoreResult }) => {
                  return updateQuery<IDictionaryEntry>(previousResult, {
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
            {data.connection.totalCount ? (
              data.connection.edges
                .map(edge => {
                  return <DictionaryEntry key={edge.node.id} {...edge.node} />;
                })
                .reduce((prev, curr) => (
                  <>
                    {prev}
                    <Separator />
                    {curr}
                  </>
                ))
            ) : (
              <NoResults>No results.</NoResults>
            )}
          </InfiniteScroller>
        </div>
      );
    }}
  </Query>
);

export default DictionarySearchResults;
