import React, { Component } from 'react';
import axios from 'axios'
import Post from './Post/Post'
import './App.css';

import Header from './Header/Header';
import Compose from './Compose/Compose';




class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: []
    };

    this.updatePost = this.updatePost.bind( this );
    this.deletePost = this.deletePost.bind( this );
    this.createPost = this.createPost.bind( this );
  }
  
  componentDidMount() {
    axios.get('https:practiceapi.devmountain.com/api/posts').then(
      res =>{
        this.setState({
            posts: res.data
        })
        console.log("Posts updated")
      }
    ).catch(err => console.log("Did not load posts"))
  }

  updatePost(id, text) {
    axios.put(`https://practiceapi.devmountain.com/api/posts?id=${this.posts}, ${text}`).then(
      res => {
        this.setState({
          posts: res.data
        })
        console.log("Your still good")
      }
    ).catch(err=> console.log("Ya messed up"))
  
  }

  deletePost(id) {
    axios.delete(`https://practiceapi.devmountain.com/api/posts?id=${id}`).then(
      res =>{
        this.setState({
          posts: res.data
        })
        console.log("Nice")
      }
    ).catch(err=> console.log("nope"))

  }

  createPost(text) {
    axios.post(`https://practiceapi.devmountain.com/api/posts`, {text}).then(
      res => {
        this.setState({
          posts: res.data
        })
        console.log("Success!")
      }
    ).catch(err=> console.log("failure!"))

  }

  render() {
    const { posts } = this.state;

    // const renderposts = this.state.posts.map(e=> <div> </div>)

    return (
      <div className="App__parent">
        <Header />

        <section className="App__content">

          <Compose createPostFn={this.createPost}/>
          {
            posts.map(post => (
            <Post key={post.id} text={post.text} date={post.date} updatePostFn={this.updatePost} id={post.id}
            deletePostFn={this.deletePost}/>
            
           ))
          }
        </section>
      </div>
    );
  }
}

export default App;
