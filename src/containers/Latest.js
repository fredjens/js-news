import React from 'react';
import { gql, graphql } from 'react-apollo';

import Loading from '../components/Loading';
import PostList from '../components/PostList';

const Latest = ({
  data: {
    allPosts = [],
    loading = false,
  } = {},
}) => {

  if (loading) {
    return <Loading />
  }

  return <PostList posts={allPosts} />
}

const PostQuery = gql`query allPosts {
  allPosts(orderBy: createdAt_DESC) {
    id
    image
  }
}`

export default graphql(PostQuery, {
  options: {
    fetchPolicy: 'network-only'
  },
})(Latest);