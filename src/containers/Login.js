import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import autoBind from 'react-autobind';

import { signInUser } from '../ducks';

class Login extends Component {
  constructor(props) {
    super(props);
    autoBind(this);

    this.state = {
      email: '',
      password: '',
    }
  }

  handleUpdateInput(e, field) {
    const { value } = e.target;

    this.setState({
      ...this.state,
      [field]: value,
    });
  }

  handLoginUser() {
    const { signInUser } = this.props;
    const { email, password } = this.state;

    signInUser({ email, password });

    this.setState({
      email: '',
      password: '',
    })
  }

  render() {
    const { email, password } = this.state;

    return (
      <div>
        <h2>Login</h2>
        <input type="text" value={email} onChange={(e) => this.handleUpdateInput(e, 'email')} />
        <input type="text" value={password} onChange={(e) => this.handleUpdateInput(e, 'password')} />
        <button onClick={this.handLoginUser}>Add user</button>
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
