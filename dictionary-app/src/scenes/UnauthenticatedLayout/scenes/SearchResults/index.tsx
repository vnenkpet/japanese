import * as React from "react";
import { RouteComponentProps } from "react-router";
import DictionarySearchResults from "./components/DictionarySearchResults";

const SearchResult: React.SFC<RouteComponentProps<{ searchKey?: string }>> = ({
  match: {
    params: { searchKey }
  }
}) => <DictionarySearchResults searchKey={searchKey} />;

export default SearchResult;
