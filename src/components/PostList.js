import React from 'react';

const PostList = ({ posts }) => {
  const postList = posts.map((post, index) => (
    <div key={index}>
      <h2>{post.id}</h2>
    </div>
  ));

  return (
    <div>
      {postList}
    </div>
  );
}

export default PostList;
