import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { values } from 'lodash';
import autoBind from 'react-autobind';
import { distanceInWordsToNow } from 'date-fns';

import {
  getAuthentication,
  addComment,
  signInUser,
} from '../ducks';

import Post from '../components/Post';

import Container from '../primitives/Container';
import Card from '../primitives/Card';
import StyledLink from '../primitives/StyledLink';
import StyledButton from '../primitives/StyledButton';
import StyledTextarea from '../primitives/StyledTextarea';
import Byline from '../primitives/Byline';

class Story extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = { text: ''};
  }

  handleUpdateText(e) {
    const { value } = e.target;
    this.setState({ text: value });
  }

  handleSubmitComment(e) {
    e.preventDefault();

    const { addComment, post: { id = ''}, user } = this.props;
    const { text } = this.state;

    addComment({ post: id, author: user, text });
  }

  render() {
    const {
      post,
      users,
      authenticated,
      signInUser,
      post: {
        comments = {},
      } = {},
    } = this.props;

    const commentsList = values(comments)
    .map(({ text = '', author = '', date = ''}, index) => {
      const username = (users[author] || {}).name || 'Anonymous';

      return (
        <Card key={index}>
          <p style={{
            fontSize: '1.25rem',
            marginTop: '0',
          }}>{text}</p>
          <Byline>
            by {username} * {distanceInWordsToNow(date)}
          </Byline>
        </Card>
      );
    });

    return (
      <Container>
        <Card small>
          <StyledLink to="/">
            Back to stories
          </StyledLink>
        </Card>
        <Card>
          <Post post={post} {...this.props} />
        </Card>
        {commentsList}
        <Card>
          {!authenticated && (
            <div>
              <h2 style={{
                marginBottom: '1rem',
              }}>Sign in to comment</h2>
              <StyledButton
                onClick={signInUser}
              >
                Signup with Github
              </StyledButton>
            </div>
          )}
          {authenticated && (
            <form onSubmit={this.handleSubmitComment}>
              <StyledTextarea onChange={this.handleUpdateText} />
              <StyledButton>Submit</StyledButton>
            </form>
          )}
        </Card>
      </Container>
    );
  }
};

const mapStateToProps = (state, props) => {
  const {
    match: {
      params: {
        id = '',
      } = {},
    } = {},
  } = props;

  return ({
    post: state.posts[id],
    authenticated: getAuthentication(state),
    user: state.user,
    users: state.users,
  });
};

const mapDispatchToProps = (dispatch) => bindActionCreators({
  addComment,
  signInUser,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Story);
