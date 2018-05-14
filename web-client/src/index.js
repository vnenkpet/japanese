import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Provider } from "react-redux";
import thunkMiddleware from "redux-thunk";
import { logger } from "redux-logger";
import { createStore, applyMiddleware } from "redux";
import App from "./App";
import reducers from "./reducers";
import registerServiceWorker from "./registerServiceWorker";
import client from "./apollo-client";
import { ApolloProvider } from 'react-apollo';

const store = createStore(reducers, applyMiddleware(thunkMiddleware, logger));

// Every time the state changes, log it
// Note that subscribe() returns a function for unregistering the listener
store.subscribe(() => console.log(store.getState()));

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <App />
    </Provider>
  </ApolloProvider>,
  document.getElementById("root"),
);
registerServiceWorker();
