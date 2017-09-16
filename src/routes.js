import React from 'react';
import { createBrowserHistory } from 'history';
import { Router, Route, Switch } from 'react-router-dom';

import Authenticate from './high-order-components/auth';

import Header from './containers/Header';
import Latest from './containers/Latest';
import Story from './containers/Story';

const history = createBrowserHistory();

const Routes = () => (
  <Router history={history}>
    <div>
      <Route component={Header} />
      <Switch>
        <Route exact path="/" component={Latest} />
        <Route path="/story/:id" component={Story} />
      </Switch>
    </div>
  </Router>
);

export default Authenticate(Routes);
