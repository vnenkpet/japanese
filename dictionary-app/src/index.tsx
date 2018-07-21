import * as React from "react";
import { ApolloProvider } from "react-apollo";
import * as ReactDOM from "react-dom";
import App from "./App";
import settGlobalStyles from "./GlobalStyle";
import registerServiceWorker from "./registerServiceWorker";

import ApolloClient from "apollo-boost";
import { ThemeProvider } from "./styled-components";

settGlobalStyles();

const client = new ApolloClient({
  clientState: {
    defaults: {
      searchKey: {
        __typename: "SearchKey",
        text: "train"
      }
    },
    resolvers: {
      Mutation: {
        updateSearchKey: (
          _: any,
          { text }: { text: string },
          { cache }: any
        ): any => {
          const data = {
            searchKey: {
              __typename: "SearchKey",
              text
            }
          };
          cache.writeData({ data });
          return null;
        }
      }
    }
  },
  uri: "http://localhost:3001"
});

// Define what props.theme will look like
const theme = {
  fontColor: "white",
  primaryColor: "teal",
  primaryColorInverted: "orange"
};

ReactDOM.render(
  <ApolloProvider client={client}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </ApolloProvider>,
  document.getElementById("root") as HTMLElement
);
registerServiceWorker();
