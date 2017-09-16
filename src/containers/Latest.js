import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { values, sortBy } from 'lodash';

import {
  getAuthentication,
  upvotePost,
} from '../ducks';

import Post from '../components/Post';
import Card from '../primitives/Card';
import Container from '../primitives/Container';

const Latest = (props) => {
  const {
    posts = {},
  } = props;

  const sortPostsByDate = sortBy(values(posts), 'date').reverse();

  const postsList = sortPostsByDate.map((post, index) => {
    return (
      <Card key={index}>
        <Post post={post} {...props} />
      </Card>
    );
  });

  return (
    <Container>
      {postsList}
    </Container>
  );
};

const mapStateToProps = (state) => {
  return ({
    posts: state.posts,
    authenticated: getAuthentication(state),
    user: state.user,
    users: state.users,
  });
};

const mapDispatchToProps = (dispatch) => bindActionCreators({
  upvotePost,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Latest);
