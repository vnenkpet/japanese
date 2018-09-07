import deepOrange from "@material-ui/core/colors/deepOrange";
import teal from "@material-ui/core/colors/teal";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import * as React from "react";
import { RouterProps, withRouter } from "react-router";
import UnauthenticatedLayout from "./scenes/UnauthenticatedLayout";

const theme = createMuiTheme({
  palette: {
    primary: teal,
    secondary: deepOrange
  }
});

const App: React.SFC<RouterProps> = () => {
  return (
    <>
      <CssBaseline />
      <MuiThemeProvider theme={theme}>
        <UnauthenticatedLayout />
      </MuiThemeProvider>
    </>
  );
};

export default withRouter(App);
