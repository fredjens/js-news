import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { graphql, gql } from 'react-apollo';
import autoBind from 'react-autobind';

class CreateUser extends Component {
  constructor(props) {
    super();
    autoBind(this);

    this.state = {
      email: '',
      password: '',
      name: '',
    }
  }

  async createUser() {
    const {email, password, name} = this.state
    const { createUser, signinUser } = this.props;

    const newUser = await createUser({variables: {email, password, name}});

    if (newUser) {
      const user = await signinUser({variables: {email, password}});

      if (!user) {
        return;
      }

      window.localStorage.setItem('graphcoolToken', user.data.signinUser.token)
      this.props.history.replace('/submit');
      window.location.reload();
    }
  }

  render () {
    const { data, history } = this.props;
    const { email, password, name } = this.state;

    if (data.loading) {
      return (<div>Loading</div>)
    }

    if (data.user) {
      history.replace('/submit');
      window.location.reload();
    }

    return (
      <div>
        <div>
          <input
            value={email}
            placeholder='Email'
            onChange={(e) => this.setState({email: e.target.value})}
          />
          <input
            type='password'
            value={password}
            placeholder='Password'
            onChange={(e) => this.setState({password: e.target.value})}
          />
          <input
            value={name}
            placeholder='Name'
            onChange={(e) => this.setState({name: e.target.value})}
          />

          <button disabled={!name || !email || !password} onClick={this.createUser}>Sign up</button>
        </div>
      </div>
    )
  }
}

const createUser = gql`
  mutation ($email: String!, $password: String!, $name: String!) {
    createUser(authProvider: {email: {email: $email, password: $password}}, name: $name) {
      id
    }
  }
`

const signinUser = gql`
  mutation ($email: String!, $password: String!) {
    signinUser(email: {email: $email, password: $password}) {
      token
    }
  }
`

const userQuery = gql`
  query {
    user {
      id
    }
  }
`

export default graphql(createUser, {name: 'createUser'})(
  graphql(userQuery, { options: { fetchPolicy: 'network-only' }})(
    graphql(signinUser, {name: 'signinUser'})(
      withRouter(CreateUser))
    )
)