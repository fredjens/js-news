import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { graphql, gql } from 'react-apollo'
import autoBind from 'react-autobind';

class CreateLogin extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      email: '',
      password: '',
    };
  }

  async signinUser() {
    const { email, password } = this.state;
    const { signinUser, history } = this.props;

    const response = await signinUser({variables: {email, password}});

    if (!response) {
      console.error('error');
    };

    window.localStorage.setItem('graphcoolToken', response.data.signinUser.token)
    history.replace('/submit');
    window.location.reload();
  }

  render () {
    const { data, history } = this.props;
    const { email, password } = this.state;

    if (data.loading) {
      return (<div>Loading</div>)
    }

    if (data.user) {
      history.replace('/submit/add');
    }

    return (
      <div>
        <input
          value={email}
          placeholder='Email'
          onChange={(e) => this.setState({email: e.target.value})}
        />
        <input
          className='w-100 pa3 mv2'
          type='password'
          value={password}
          placeholder='Password'
          onChange={(e) => this.setState({password: e.target.value})}
        />

        {email && password &&
        <button className='pa3 bg-black-10 bn dim ttu pointer' onClick={this.signinUser}>Log in</button>
        }
      </div>
    )
  }
}

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

export default graphql(signinUser, {name: 'signinUser'})(
  graphql(userQuery, {
    options: {
      fetchPolicy: 'network-only'
    }
  })(withRouter(CreateLogin))
)