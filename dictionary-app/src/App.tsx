import deepOrange from "@material-ui/core/colors/deepOrange";
import teal from "@material-ui/core/colors/teal";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import * as React from "react";
import { Route, Switch } from "react-router";
import MainAppBar from "./AppBar";
import Help from "./components/Help";
import SearchResult from "./SearchResult";
import styled from "./styled-components";

const theme = createMuiTheme({
  palette: {
    primary: teal,
    secondary: deepOrange
  }
});

const Body = styled.div`
  padding: 20px;
  padding-top: 70px;
`;

class App extends React.PureComponent {
  public render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <MuiThemeProvider theme={theme}>
          <MainAppBar />
          <Body>
            <Help />
            <Switch>
              <Route path="/search/:searchKey" component={SearchResult} />
              <Route path="/" component={SearchResult} />
            </Switch>
          </Body>
        </MuiThemeProvider>
      </React.Fragment>
    );
  }
}

export default App;
