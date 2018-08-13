import gql from "graphql-tag";
import * as React from "react";
import { Query } from "react-apollo";
import DictionarySearchResults from "./DictionarySearchResults";
import Home from "./Home";

interface ISearchKeyQueryData {
  searchKey: {
    text: string;
  };
}

const SearchResult = ({
  match
}: {
  match: { params: { searchKey?: string } };
}) => {
  return (
    <Query<ISearchKeyQueryData>
      query={gql`
        query searchKey {
          searchKey @client {
            text
          }
        }
      `}
    >
      {({ data }) => {
        const searchKey = data.searchKey.text || match.params.searchKey;
        return searchKey ? (
          <DictionarySearchResults searchKey={searchKey} />
        ) : (
          <Home />
        );
      }}
    </Query>
  );
};

export default SearchResult;
