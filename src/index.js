import React from 'react';
import { render } from 'react-dom';
import { ApolloClient, ApolloProvider, createNetworkInterface } from 'react-apollo';
import registerServiceWorker from './service-workers/registerServiceWorker';

import Routes from './routes';

const networkInterface = createNetworkInterface({
  uri: process.env.REACT_APP_GRAPHCOOL,
})

const client = new ApolloClient({networkInterface})

render(
  <ApolloProvider client={client}>
    <Routes />
  </ApolloProvider>,
  document.getElementById('root'),
);

registerServiceWorker();