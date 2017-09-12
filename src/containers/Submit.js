import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import autoBind from 'react-autobind';

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
      title: '',
      image: '',
    }
  }

  handleUpdateInput(e, field) {
    const { value } = e.target;

    this.setState({
      ...this.state,
      [field]: value,
    });
  }

  handLoginUser() {
    const { addPost } = this.props;
    const { title, image } = this.state;

    addPost({ title, image });

    this.setState({
      title: '',
      image: '',
    })
  }

  render() {
    const { title, image } = this.state;
    const { authenticated, posts } = this.props;

    const postsList = posts.map((post, index) => {
      const { title, votes = 0 } = post;

      return (
        <div key={index}>
          <h2>{title}</h2>
          <h3>{votes}</h3>
        </div>
      )
    });

    const count = posts.reduce((sum, post) => sum + post.votes, 0)

    const myProfile = (
      <div>
        <h2>Add post</h2>
        <input type="text" value={title} onChange={(e) => this.handleUpdateInput(e, 'title')} />
        <input type="text" value={image} onChange={(e) => this.handleUpdateInput(e, 'image')} />
        <button onClick={this.handLoginUser}>Add post</button>
        <h4>{count}</h4>
        <div>
          {postsList}
        </div>
      </div>
    );

    const login = (
      <div>
        You need to login.
      </div>
    );

    return authenticated ? myProfile : login;
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
