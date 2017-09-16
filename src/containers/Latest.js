import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { values, sortBy } from 'lodash';
import { distanceInWordsToNow } from 'date-fns';

import {
  getAuthentication,
  upvotePost,
} from '../ducks';

import Card, { CardTitle } from '../primitives/Card';
import Container from '../primitives/Container';
import Category from '../primitives/Category';
import Clap from '../primitives/Clap';
import Byline from '../primitives/Byline';

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
    const {
      id = 0,
      title = 'No title',
      user = 'Anonymous',
      date = '',
      votes = 0,
      source: {
        domain = '',
        url = '',
      } = {},
    } = post;

    const username = (users[user] || {}).name || 'Anonymous';

    return (
      <Card key={index}>
        {/* image && <img src={image} />*/}
        <div style={{
          marginBottom: '.5rem',
        }}>
          <Category type={domain}>
            {domain}
          </Category>
        </div>
        <CardTitle
          href={url}
          target="blank"
        >{title}</CardTitle>
        <Byline>
        <Clap
          disabled={!authenticated}
          onClick={() => upvotePost({ id, user: loggedInUser })}
        >
          <span role="img" aria-label="clap">👏</span>
        </Clap>
          {values(votes).length} *
          0 comments * Posted by {username}{' '}
          * {distanceInWordsToNow(date)} ago
        </Byline>
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
