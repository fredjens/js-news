import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import autoBind from 'react-autobind';

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
      fetching: false,
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

  async submitUrl(e) {
    e.preventDefault();

    const { url } = this.state;
    const { addPost } = this.props;

    this.setState({ fetching: true });

    const { data } = await getDataFromUrl(url);

    const removeErrormessage = () => {
      setTimeout(() => this.setState({ error: '', fetching: false }), 3000);
    };

    if (!data) {
      this.setState({
        error: 'Posting failed, check your url',
      }, removeErrormessage);
      return;
    }

    this.setState({ fetching: false });
    addPost({ post: data });
  }

  render() {
    const { url, fetching, error } = this.state;
    const { authenticated } = this.props;

    const AddPost = (
      <Container>
        <Card dark>
          <h2>Add an awesome post</h2>
          <p>About JavaScript or related topics</p>
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
        {fetching && (
          <Card>
            {error ? error : 'Fetching article...'}
          </Card>
        )}
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
