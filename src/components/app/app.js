import React, { Component } from 'react';
import AppHeader from '../appHeader/appHeader'
import SearchPanel from '../searchPanel/searchPanel';
import PostStatusFilter from '../postStatusFilter/postStatusFilter';
import PostList from '../postList/postList';
import PostAddForm from '../postAddForm/postAddForm';
//import './app.css';
import styled from 'styled-components';

const AppBlock = styled.div`
    margin: 0 auto;
    max-width: 800px;
`

export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
         data: [
            {label: 'Going to lealrn React', important: false, like: true, id: 1},
            {label: 'That is so good', important: false, like: true, id: 2},
            {label: 'I need a break...', important: false, like: false, id: 3},
        ],
        term: '',
        filter: 'all'
    }
    this.maxId = 4;
  }
    
  deleteItem = (id) => {
    this.setState(({data}) => {
      const index = data.findIndex(elem => elem.id === id);

      const before = data.slice(0, index);
      const after = data.slice(index + 1);

      const newArr = [...before, ...after];
      return {
        data: newArr
      }
    })
  }
  addItem = (body) => {
    const newItem = {
      label: body,
      important: false,
      id: this.maxId++
    }
    this.setState(({data}) => {
      const newArr = [...data, newItem];
      return {
        data: newArr 
      }
    })
  }
  onToggleImportant = (id) => {
     this.setState(({data}) => {
      const index = data.findIndex(elem => elem.id === id);

      const old = data[index];
      const newItem = {...old, important: !old.important};

      const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)];
      return {
        data: newArr
      }
    })
  }
  onToggleLike = (id) => {
    this.setState(({data}) => {
      const index = data.findIndex(elem => elem.id === id);

      const old = data[index];
      const newItem = {...old, like: !old.like};

      const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)];
      return {
        data: newArr
      }
    })
  }
  searchPost = (items, term) => {
    if(term.length === 0) {
      return items
    }
    return items.filter((item) => {
      return item.label.indexOf(term) > -1
    })
  }
  onUpdateSearch = (term) => {
    this.setState({term})
  }
  filterPost(items, filter) {
    if(filter === 'like'){
      return items.filter(item => item.like)
    }else return items
  }
  onFilterSelect = (filter) => {
    this.setState({filter})
  }
  render() {
    const {term, data, filter} = this.state;

    const liked = this.state.data.filter(item => item.like).length;
    const allPosts = this.state.data.length;

    const visiblePost = this.filterPost(this.searchPost(data, term),  filter);

  
    return (
      <AppBlock>
        <AppHeader
          liked={liked}
          allPosts={allPosts}/>
        <div className="search-panel d-flex">
          <SearchPanel
          onUpdateSearch={this.onUpdateSearch}/>
          <PostStatusFilter
          onFilterSelect={this.onFilterSelect}
          filter={filter}/>
        </div>
        <PostList posts={visiblePost}
          onDelete={this.deleteItem}
          onToggleImportant={this.onToggleImportant}
          onToggleLike={this.onToggleLike}/>
        <PostAddForm
        onAdd={this.addItem}/>
      </AppBlock>
    )
  }
 
} 
