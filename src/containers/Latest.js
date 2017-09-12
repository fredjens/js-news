import React from 'react';
import { connect } from 'react-redux';
import { values } from 'lodash';

import {
  getPosts,
  getAuthentication,
} from '../ducks';

const Latest = (props) => {
  const { posts, authenticated } = props;

  const postsList = values(posts).map((post, index) => {
    return (
      <div key={index}>
        <h2>{post.title}</h2>
        <div>
          <button disabled={!authenticated}>+</button>
          <button disabled={!authenticated}>-</button>
        </div>
      </div>
    )
  });

  return (
    <div>
      {postsList}
    </div>
  );
}

const mapStateToProps = () => ({
  posts: getPosts(),
  authenticated: getAuthentication(),
});

export default connect(
  mapStateToProps,
)(Latest);
