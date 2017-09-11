import React from 'react';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import Latest from './containers/Latest';
import Submit from './containers/Submit';

const Routes = () => (
  <Router>
    <div>
      <ul>
        <li><Link to="/">Latest</Link></li>
        <li><Link to="/submit">Submit</Link></li>
      </ul>
      <Route exact path="/" component={Latest} />
      <Route path="/submit" component={Submit} />
    </div>
  </Router>
)

export default Routes;
