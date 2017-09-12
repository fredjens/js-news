import React from 'react';
import { render } from 'react-dom';
import { ApolloClient, ApolloProvider, createNetworkInterface } from 'react-apollo';
import registerServiceWorker from './service-workers/registerServiceWorker';

import Routes from './routes';

const networkInterface = createNetworkInterface({
  uri: process.env.REACT_APP_GRAPHCOOL,
});

networkInterface.use([{
  applyMiddleware (req, next) {
    if (!req.options.headers) {
      req.options.headers = {}
    }
    if (localStorage.getItem('graphcoolToken')) {
      req.options.headers.authorization = `Bearer ${localStorage.getItem('graphcoolToken')}`
    }

    next();
  },
}])

const client = new ApolloClient({networkInterface})

render(
  <ApolloProvider client={client}>
    <Routes />
  </ApolloProvider>,
  document.getElementById('root'),
);

registerServiceWorker();