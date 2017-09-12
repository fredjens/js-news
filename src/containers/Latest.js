import React from 'react';
import { gql, graphql } from 'react-apollo';

import Loading from '../components/Loading';
import PostList from '../components/PostList';

const Latest = ({
  data: {
    allPosts = [],
    user: {
      id: author,
    } = {},
    loading = false,
  } = {},
  mutate,
}) => {
  function addVote({ id, positive }) {
    mutate({variables: {id, positive, author}});
  }

  return loading ? <Loading /> : <PostList posts={allPosts} onVote={addVote} />
};

const createVote = gql`
  mutation ($post: String!, $positive: Boolean!, $author: ID!) {
    createVote(post: $post, positive: $positive, authorId: $author) {
      id
    }
  }
`

const PostQuery = gql`query allPosts {
  allPosts(orderBy: createdAt_DESC) {
    id
    image
    title
    author {
      name
    }
    votes {
      id
    }
  }
}`

export default graphql(createVote)(
  graphql(PostQuery, { options: { fetchPolicy: 'network-only' }} )(Latest)
)
