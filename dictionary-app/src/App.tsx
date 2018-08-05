import deepOrange from "@material-ui/core/colors/deepOrange";
import teal from "@material-ui/core/colors/teal";
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import gql from "graphql-tag";
import * as React from "react";
import { Query } from "react-apollo";
import MainAppBar from "./AppBar";
import Help from "./components/Help";
import DictionarySearchResults from "./DictionarySearchResults";
import styled from "./styled-components";

const theme = createMuiTheme({
  palette: {
    primary: teal,
    secondary: deepOrange,
  },
});

interface ISearchKeyQueryData {
  searchKey: {
    text: string;
  };
}

const Footer = styled.footer`
  font-size: 12px;
  opacity: 0.8;
`;

const Body = styled.div`
  padding: 20px;
  padding-top: 70px;
`

class App extends React.Component {
  public render() {
    return (
      <React.Fragment>
      <CssBaseline />
      <MuiThemeProvider theme={theme}>
      <MainAppBar />
      <Body>
        <Help/>
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
              return (
                <DictionarySearchResults searchKey={data.searchKey.text} />
              );
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
        </Body>
        </MuiThemeProvider>
        </React.Fragment>
      );
  }
}

export default App;
