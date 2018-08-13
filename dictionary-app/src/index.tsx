import ApolloClient from "apollo-boost";
import * as React from "react";
import { ApolloProvider } from "react-apollo";
import * as ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
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
  uri: process.env.REACT_APP_DICTIONARY_API_HOST
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <ThemeProvider theme={theme}>
      <GlobalStyle>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </GlobalStyle>
    </ThemeProvider>
  </ApolloProvider>,
  document.getElementById("root") as HTMLElement
);
registerServiceWorker();
