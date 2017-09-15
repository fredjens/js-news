import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import autoBind from 'react-autobind';

import { signInUser } from '../ducks';

class Login extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  handLoginUser() {
    const { signInUser } = this.props;
    signInUser();
  }

  render() {
    return (
      <div>
        <button onClick={this.handLoginUser}>Login with Github</button>
      </div>
    );
  }
}

const mapDispatchToProps =  (dispatch) => bindActionCreators({
  signInUser,
}, dispatch);

export default connect(
  undefined,
  mapDispatchToProps,
)(Login);
