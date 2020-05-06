import React from 'react';
import PostListItem from '../postListItem/postListItem';
import './post-list.css'
const PostList = () => {
  return (
    <ul className="app-list list-group">
      <PostListItem/>
      <PostListItem/>
      <PostListItem/>
    </ul>
  )
} 

export default PostList;