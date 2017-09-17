import React from 'react';
import { distanceInWordsToNow } from 'date-fns';
import { values } from 'lodash';

import Category from '../primitives/Category';
import Clap from '../primitives/Clap';
import Byline from '../primitives/Byline';
import StyledLink from '../primitives/StyledLink';
import { CardTitle } from '../primitives/Card';

const Post = (props) => {
  const {
    post = {},
    users = {},
    authenticated,
    upvotePost,
  } = props;

  const {
    id = 0,
    title = 'No title',
    date = '',
    user = 'Anonymous',
    votes = {},
    comments = {},
    source: {
      domain = '',
      url = '',
    } = {},
  } = post;

  const username = (users[user] || {}).name || 'Anonymous';

  return (
    <div>
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
        target="_blank"
      >
        {title}
      </CardTitle>
      <Byline>
      <Clap
        disabled={!authenticated}
        onClick={() => upvotePost({ id, user })}
      >
        <span role="img" aria-label="clap">👏</span>
      </Clap>
        {values(votes).length} *{' '}
        <StyledLink to={`/story/${id}`}>
          {values(comments).length} comments
        </StyledLink>{' '}
        * Posted by {username}{' '}
        * {distanceInWordsToNow(date)} ago
      </Byline>
    </div>
  );
};

export default Post;
