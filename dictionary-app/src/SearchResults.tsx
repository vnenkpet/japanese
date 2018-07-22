import * as React from "react";
import { Query } from "react-apollo";
import Button from "./components/Button";
import SearchQueryEntry from "./JmdictEntry";
import updateQuery from "./pagination/updateQuery";
import searchJmdictQuery from "./queries/searchJmdictQuery";
import { IConnectionData } from "./schema/Connection";
import IJmdictEntry from "./schema/IJmdictEntry";
import styled from "./styled-components";

interface IVariables {
  key: string;
}

const SearchInfo = styled.div`
  margin-top: 10px;
  opacity: 0.8;
`;

const NoMoreResults = styled.div`
  opacity: 0.8;
`;

const Loading = styled.div`
  margin-top: 10px;
  opacity: 0.8;
`;

const Separator = styled.hr`
  border: 1px dashed ${props => props.theme.primaryColorInverted};
  opacity: 0.4;
`;

const NoResults = styled.div`
  margin-top: 10px;
  font-size: 20px;
`;

export default ({ searchKey }: { searchKey?: string }) => (
  <Query<IConnectionData<IJmdictEntry>, IVariables>
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
            Found: {data.connection.totalCount} results for "{searchKey}".
          </SearchInfo>
          {data.connection.totalCount ? (
            data.connection.edges
              .map((edge, edgeIndex) => {
                return <SearchQueryEntry key={edgeIndex} {...edge.node} />;
              })
              // todo: fix (how to reduce in typescript?)
              .reduce((prev, curr) => (
                <section>
                  {prev}
                  <Separator />
                  {curr}
                </section>
              ))
          ) : (
            <NoResults>No results.</NoResults>
          )}
          {data.connection.pageInfo.hasNextPage ? (
            <Button
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
              Load more
            </Button>
          ) : (
            <NoMoreResults>No more results.</NoMoreResults>
          )}
        </div>
      );
    }}
  </Query>
);
