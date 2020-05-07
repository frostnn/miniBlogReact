import React from 'react';
import PostListItem from '../postListItem/postListItem';
import { ListGroup } from 'reactstrap';
import './post-list.css'
const PostList = ({posts, onDelete, onToggleLike, onToggleImportant}) => {

const elements = posts.map((item) => {
  return (
    <li 
      className="list-group-item"
      key={item.id}>
        <PostListItem 
        label={item.label} 
        important={item.important}
        onDelete = { () => onDelete(item.id)}
        onToggleLike= {() => onToggleLike(item.id)}
        onToggleImportant= {() => onToggleImportant(item.id)}
        />
    </li>
  )
});

  return (
    <ListGroup className="app-list">
      {elements}
    </ListGroup>
  )
} 

export default PostList;