import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { checkFirebaseAuthenication  } from '../services/firebase';

import { getAuthentication, logOutUser } from '../ducks';

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

  handleLogout() {
    const { logOutUser } = this.props;
    logOutUser();
  }

  render() {
    const { authenticated, children } = this.props;

    return (
      <div>
        <div>
          {authenticated ? 'authenticated' : 'unauthorized'}
          {authenticated && <button onClick={this.handleLogout}>Logout</button>}
        </div>
        {children}
      </div>
    );
  }
};

const mapStateToProps = (state) => ({
  authenticated: getAuthentication(state),
});

const mapDispatchToProps =  (dispatch) => bindActionCreators({
  logOutUser,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AuthWrapper);
