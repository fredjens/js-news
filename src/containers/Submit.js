import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import autoBind from 'react-autobind';
import { values } from 'lodash';

import {
  getDataFromUrl,
} from '../services/itch';

import Container from '../primitives/Container';
import Card from '../primitives/Card';

import {
  addPost,
  getPostsByUserId,
  getAuthentication,
} from '../ducks';

class AddPost extends Component {
  constructor(props) {
    super(props);
    autoBind(this);

    this.state = {
      url: '',
    };
  }

  handleUrlInput(e) {
    e.preventDefault();
    const { value } = e.target;

    this.setState({
      ...this.state,
      url: value,
    });
  }

  submitUrl(e) {
    e.preventDefault();
    const { url } = this.state;
    getDataFromUrl(url);
  }

  handLoginUser() {
    const { addPost } = this.props;
    const { title, image } = this.state;

    addPost({ title, image });

    this.setState({
      url: '',
    });
  }

  render() {
    const { url } = this.state;
    const { authenticated, posts, children } = this.props;

    const postsList = posts.map((post, index) => {
      const { title, votes = {} } = post;

      return (
        <div key={index}>
          <h2>{title}</h2>
          <h3>{values(votes).length}</h3>
        </div>
      );
    });

    const AddPost = (
      <Container>
        <Card>
          <h2>Add post</h2>
          <form onSubmit={this.submitUrl}>
            <input
              style={{
                padding: '1rem',
                width: '100%',
                fontSize: '1.5rem',
              }}
              type="text"
              value={url}
              onChange={this.handleUrlInput}
              placeholder="Submit your url"
            />
          </form>
        </Card>
        <Card>
          {postsList}
        </Card>
        {children}
      </Container>
    );

    return authenticated ? AddPost : null;
  }
}

const mapStateToProps = (state) => ({
  posts: getPostsByUserId(state),
  authenticated: getAuthentication(state),
});

const mapDispatchToProps =  (dispatch) => bindActionCreators({
  addPost,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddPost);
