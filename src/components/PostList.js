import React from 'react';

const PostList = ({ posts = [] }) => {
  const postList = posts.map(({ title, image }, index) => {
    return (
      <div key={index}>
        <img src={image} alt={title} />
        <h2>{title}</h2>
      </div>
    )}
  );

  return (
    <div>
      {postList}
    </div>
  );
}

export default PostList;
