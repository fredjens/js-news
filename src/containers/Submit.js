import React, { Component } from 'react';
import { graphql, gql } from 'react-apollo';
import { withRouter } from "react-router-dom";
import autoBind from 'react-autobind';

import PostList from '../components/PostList';

class Submit extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  logout() {
    window.localStorage.removeItem('graphcoolToken');
    this.props.history.push('/submit')
    window.location.reload();
  }

  showLogin() {
    this.props.history.push('/submit/login')
  }

  showSignup() {
    this.props.history.push('/submit/signup')
  }

  render () {
    const { data, history } = this.props;

    if (data.loading) {
      return (<div>Loading</div>)
    }

    if (data.user) {
      return (
        <div>
          <span>
            Logged in as {data.user.name}
          </span>
          <div>
            <button
              onClick={this.logout}
            >
              Logout
            </button>
          </div>
          <button onClick={() => history.push('/submit/add')}>
            Add new
          </button>
          {data.user.stories.length === 0 && <h2>No posts</h2>}
          <PostList posts={data.user.stories}/>
        </div>
      );
    }

    return (
      <div>
        <div className='pv3'>
          <div>
            <button
              onClick={this.showLogin}
            >
              Log in with Email
            </button>
          </div>
          <div>
            <button
              onClick={this.showSignup}
            >
              Sign up with Email
            </button>
          </div>
        </div>
      </div>
    )
  }
}


const userQuery = gql`
  query {
    user {
      id
      name
      stories {
        title
        image
        id
      }
    }
  }
`

export default graphql(userQuery, {
  options: {
    fetchPolicy: 'network-only'
  }
})(withRouter(Submit))