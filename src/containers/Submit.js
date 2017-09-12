import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import autoBind from 'react-autobind';

import { addPost } from '../ducks';

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

    return (
      <div>
        <h2>Add post</h2>
        <input type="text" value={title} onChange={(e) => this.handleUpdateInput(e, 'title')} />
        <input type="text" value={image} onChange={(e) => this.handleUpdateInput(e, 'image')} />
        <button onClick={this.handLoginUser}>Add post</button>
      </div>
    );
  }
}

const mapDispatchToProps =  (dispatch) => bindActionCreators({
  addPost,
}, dispatch);

export default connect(
  undefined,
  mapDispatchToProps,
)(AddPost);
