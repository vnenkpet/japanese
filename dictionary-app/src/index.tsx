import ApolloClient from "apollo-boost";
import * as React from "react";
import { ApolloProvider } from "react-apollo";
import * as ReactDOM from "react-dom";
import App from "./App";
import GlobalStyle from "./GlobalStyle";
import registerServiceWorker from "./registerServiceWorker";
import { ThemeProvider } from "./styled-components";
import theme from "./theme";

const client = new ApolloClient({
  clientState: {
    defaults: {
      searchKey: {
        __typename: "SearchKey",
        text: null
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

ReactDOM.render(
  <ApolloProvider client={client}>
    <ThemeProvider theme={theme}>
      <GlobalStyle>
        <App />
      </GlobalStyle>
    </ThemeProvider>
  </ApolloProvider>,
  document.getElementById("root") as HTMLElement
);
registerServiceWorker();
