import { Component } from 'react';
import autoBind from 'react-autobind';

import { checkFirebaseAuthenication  } from '../services/firebase';

class AuthWrapper extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentWillMount() {
    this.checkAuthenication();
  }

  componenDidUpate() {
    this.checkAuthenication();
  }

  checkAuthenication() {
    checkFirebaseAuthenication();
  }

  render() {
    const { children } = this.props;
    return children;
  }
};

export default AuthWrapper;
