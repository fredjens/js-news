import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import autoBind from 'react-autobind';

import { addUser } from '../ducks';

class Signin extends Component {
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

  handleSubmitUser() {
    const { addUser } = this.props;
    const { email, password } = this.state;

    addUser({ email, password });
  }

  render() {
    const { email, password } = this.state;

    return (
      <div>
        <h2>Add user</h2>
        <input type="text" value={email} onChange={(e) => this.handleUpdateInput(e, 'email')} />
        <input type="text" value={password} onChange={(e) => this.handleUpdateInput(e, 'password')} />
        <button onClick={this.handleSubmitUser}>Add user</button>
      </div>
    );
  }
}

const mapDispatchToProps =  (dispatch) => bindActionCreators({
  addUser,
}, dispatch);

export default connect(
  undefined,
  mapDispatchToProps,
)(Signin);
