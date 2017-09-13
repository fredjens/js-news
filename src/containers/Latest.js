import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { values, sortBy } from 'lodash';
import { distanceInWordsToNow } from 'date-fns';

import {
  getPosts,
  getAuthentication,
  upvotePost,
  getUser,
} from '../ducks';

const Latest = (props) => {
  const { posts, authenticated, upvotePost, user: loggedInUser = '' } = props;

  const sortPostsByDate = sortBy(sortBy(values(posts), 'date'), 'votes').reverse();

  const postsList = sortPostsByDate.map((post, index) => {
    const { id, title, user, image, date, votes = 0 } = post;

    return (
      <div key={index}>
        <h2>{title}</h2>
        <div>{distanceInWordsToNow(date)}</div>
        <img src={image} alt={title} />
        <h3>{values(votes).length}</h3>
        <div>user: {user}</div>
        <div>
          <button
            disabled={!authenticated}
            onClick={() => upvotePost({ id, user: loggedInUser })}
          >+</button>
        </div>
      </div>
    );
  });

  return (
    <div>
      {postsList}
    </div>
  );
};

const mapStateToProps = (state) => ({
  posts: getPosts(state),
  authenticated: getAuthentication(state),
  user: getUser(state),
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  upvotePost,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Latest);
