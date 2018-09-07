import * as React from "react";
import { Route, Switch } from "react-router";
import styled from "../../styled-components";
import Help from "./components/Help";
import MainAppBar from "./components/MainAppBar";
import SearchResults from "./scenes/SearchResults";
import Welcome from "./scenes/Welcome";

const Body = styled.div`
  padding: 20px;
  padding-top: 70px;
`;

const UnauthenticatedLayout: React.SFC<{}> = () => (
  <Body>
    <MainAppBar />
    <Help />
    <Switch>
      <Route path="/search/:searchKey" component={SearchResults} />
      <Route path="/" component={Welcome} />
    </Switch>
  </Body>
);

export default UnauthenticatedLayout;
