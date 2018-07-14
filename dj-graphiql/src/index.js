import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

import GraphiQL from 'graphiql';
import fetch from 'isomorphic-fetch';

function graphQLFetcher(graphQLParams) {
  return fetch(`http://localhost:3001/graphql?query=${JSON.stringify(graphQLParams)}`, {
    method: 'get',
    headers: {
      "Content-Type": "application/json",
    }
  }).then(response => {
    console.log(response);
    response.json();
  });
}

ReactDOM.render(<GraphiQL fetcher={graphQLFetcher} />, document.getElementById('root'));
registerServiceWorker();
