import gql from "graphql-tag";
import * as React from "react";
import { Query } from "react-apollo";
import JmdictSearchResults from "./JmdictSearchResults";
import SearchBar from "./SearchBar";

interface ISearchKeyQueryData {
  searchKey: {
    text: string;
  };
}

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <SearchBar />
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
            if (data) {
              return <JmdictSearchResults searchKey={data.searchKey.text} />;
            } else {
              return "";
            }
          }}
        </Query>
      </div>
    );
  }
}

export default App;
