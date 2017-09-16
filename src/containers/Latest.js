import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { values, sortBy } from 'lodash';
import { distanceInWordsToNow } from 'date-fns';

import Card, { CardTitle } from '../primitives/Card';
import Container from '../primitives/Container';

import {
  getAuthentication,
  upvotePost,
} from '../ducks';

const Latest = (props) => {
  const {
    posts = {},
    authenticated,
    upvotePost,
    user: loggedInUser = '',
    users = {},
  } = props;

  const sortPostsByDate = sortBy(values(posts), 'date').reverse();

  const postsList = sortPostsByDate.map((post, index) => {
    const { id, title, user, image, date, votes = 0, source: { domain = '', url = ''} = {} } = post;

    const username = (users[user] || {}).name || 'Anonymous';

    return (
      <Card key={index}>
        {image && <img src={image} />}
        <div>
          {domain}
        </div>
        <CardTitle>{title}</CardTitle>
        <div style={{
          top: '40%',
        }}>
          <button
            disabled={!authenticated}
            onClick={() => upvotePost({ id, user: loggedInUser })}
            style={{
              width: '40px',
              position: 'absolute',
              height: '40px',
              justifyContent: 'center',
              border: '0',
              left: '10px',
              top: '65px',
              fontSize: '1.3rem',
              cursor: 'pointer',
              background: 'none',
            }}
          >
            <div style={{
              fontSize: '.9rem',
            }}>
              {values(votes).length}
            </div>
            👍
          </button>
          <p style={{
            fontSize: '.9rem',
            color: '#000',
            margin: '0',
          }}>0 comments * Posted by {username} * {distanceInWordsToNow(date)} ago</p>
        </div>
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
