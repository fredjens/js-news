import React from 'react';

const PostList = ({ posts = [], onVote }) => {
  const postList = posts.map((post, index) => {
    const { title, image, id } = post;

    return (
      <div key={index} style={{ background: '#eee', margin: '1rem'}}>
        <img src={image} alt={title} />
        <h2>{title}</h2>
        <div>0</div>
        <button onClick={() => onVote({ id, positive: true })}>+</button>
        <button>-</button>
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
