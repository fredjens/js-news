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

  const sortPostsByDate = sortBy(values(posts), 'date').reverse();

  const postsList = sortPostsByDate.map((post, index) => {
    const { id, title, user, image, date, votes = 0 } = post;

    return (
      <div key={index} style={{
        background: '#fff',
        padding: '1rem',
        margin: '.5rem 0',
        position: 'relative',
      }}>
        <h2 style={{
          margin: '0 0 .5rem',
          fontSize: '4rem',
          lineHeight: '1',
        }}><a href="">{title}</a></h2>
        <p style={{
          fontSize: '.9rem',
          color: '#000',
          margin: '0',
        }}>user: {user} • {distanceInWordsToNow(date)} ago</p>

        <div style={{
          position: 'absolute',
          left: '-35px',
          top: '40%',
          transform: 'translateY(-40%)',
        }}>
          <button
            disabled={!authenticated}
            onClick={() => upvotePost({ id, user: loggedInUser })}
            style={{
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              borderRadius: '50%',
              justifyContent: 'center',
              background: '#222',
              border: '0',
              fontSize: '1.3rem',
              cursor: 'pointer',
            }}
          >
            <div style={{
              position: 'fixed',
              top: '-16px',
              fontSize: '.9rem',
            }}>
              {values(votes).length}
            </div>
            👍
          </button>
        </div>
      </div>
    );
  });

  return (
    <div style={{
      maxWidth: '500px',
      margin: '0 auto',
      paddingTop: '2rem',
    }}>
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
