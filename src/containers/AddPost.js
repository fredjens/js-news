import React from 'react';
import { withRouter } from 'react-router';
import { graphql, gql } from 'react-apollo';
import autoBind from 'react-autobind';

class CreatePost extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      title: '',
      image: '',
    }
  }

  async handlePost() {
    const { title, image } = this.state;

    const {
      data: {
        user: {
          id: author = ''
        } = {},
      } = {},
      history,
      mutate,
    } = this.props;

    const story = await mutate({variables: {title, image, author}});

    if (!story) {
      return;
    }

    history.replace('/submit');
    window.location.reload();
  }

  render () {
    const { data, history } = this.props;

    if (data.loading) {
      return (<div>Loading</div>)
    }

    if (!data.user) {
      history.replace('/submit');
    }

    return (
      <div>
        <div>
          <input
            value={this.state.title}
            placeholder='Description'
            onChange={(e) => this.setState({title: e.target.value})}
          />
          <input
            value={this.state.image}
            placeholder='Image Url'
            onChange={(e) => this.setState({image: e.target.value})}
          />
          {this.state.image &&
            <img src={this.state.image} alt='presentation' />
          }
          {this.state.title && this.state.image &&
            <button onClick={this.handlePost}>Post</button>
          }
        </div>
      </div>
    )
  }
}

const createPost = gql`
  mutation ($title: String!, $image: String!, $author: ID!) {
    createPost(title: $title, image: $image, authorId: $author) {
      id
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

export default graphql(createPost)(
  graphql(userQuery, { options: { fetchPolicy: 'network-only' }} )(withRouter(CreatePost))
)