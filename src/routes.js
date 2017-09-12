import React from 'react';
import { createBrowserHistory } from 'history';

import {
  Router,
  Route,
  Link
} from 'react-router-dom';

import Latest from './containers/Latest';
import Submit from './containers/Submit';
import AddPost from './containers/AddPost';
import Login from './containers/Login';
import Signup from './containers/Signup';

const history = createBrowserHistory();

const Routes = () => (
  <Router history={history}>
    <div>
      <ul>
        <li><Link to="/">Latest</Link></li>
        <li><Link to="/submit">Submit</Link></li>
      </ul>
      <Route exact path="/" component={Latest} />
      <Route path="/submit" component={Submit} />
      <Route path="/submit/add" component={AddPost} />
      <Route path='/submit/login' component={Login} />
      <Route path='/submit/signup' component={Signup} />
    </div>
  </Router>
)

export default Routes;
