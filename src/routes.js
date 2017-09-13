import React from 'react';
import { createBrowserHistory } from 'history';
import { Router, Route, Switch } from 'react-router-dom';

import Authenticate from './high-order-components/auth';

import Latest from './containers/Latest';
import Submit from './containers/Submit';
import Login from './containers/Login';
import Signup from './containers/Signup';
import Header from './components/Header';

const history = createBrowserHistory();

const Routes = () => (
  <Router history={history}>
    <div>
      <Route component={Header} />
      <Switch>
        <Route exact path="/" component={Latest} />
        <Route exact path="/submit" component={Submit} />
        <Route path='/submit/login' component={Login} />
        <Route path='/submit/signup' component={Signup} />
      </Switch>
    </div>
  </Router>
);

export default Authenticate(Routes);
