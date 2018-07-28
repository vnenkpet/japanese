import gql from "graphql-tag";
import * as React from "react";
import { Query } from "react-apollo";
import JmdictSearchResults from "./JmdictSearchResults";
import SearchBar from "./SearchBar";
import styled from "./styled-components";

interface ISearchKeyQueryData {
  searchKey: {
    text: string;
  };
}

const Footer = styled.footer`
  font-size: 12px;
  opacity: 0.8;
`;

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
            if (data.searchKey.text) {
              return <JmdictSearchResults searchKey={data.searchKey.text} />;
            } else {
              return (
                <div>
                  <h1>Complete Japanese Dictionary.</h1>
                  <p>
                    Start with searching something in the bar above, e. g.
                    "train".
                  </p>
                  <Footer>Data sources: JMDict, JMnedict, KanjiDic.</Footer>
                </div>
              );
            }
          }}
        </Query>
      </div>
    );
  }
}

export default App;
