import AppBar from "@material-ui/core/AppBar";
import { withStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import * as React from "react";
import { Route, Switch } from "react-router-dom";
import SearchBar from "../SearchBar";

const styles = {
  flex: {
    flexGrow: 1
  },
  root: {
    flexGrow: 1
  }
};

interface IProps {
  classes: {
    root: string;
    menuButton: string;
    flex: string;
  };
}

const MainAppBar = ({ classes }: IProps) => (
  <div className={classes.root}>
    <AppBar position="fixed">
      <Toolbar>
        <Switch>
          <Route path="/search/:searchKey" component={SearchBar} />
          <Route path="/" component={SearchBar} />
        </Switch>
      </Toolbar>
    </AppBar>
  </div>
);

export default withStyles(styles)(MainAppBar);
