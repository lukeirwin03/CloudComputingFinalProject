import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [content, setContent] = useState('');
  const [posts, setPosts] = useState([]);

  // Environment variable for API URL
  const apiUrl = process.env.REACT_APP_AWS_URL || 'http://127.0.0.1:5000';
  console.log(apiUrl)


  // Function to register user
  const registerUser = async () => {
    try {
      const response = await axios.post(`/register`, {
        userId: email,
        name,
        email
      });
      alert(response.data.message);
    } catch (error) {
      console.error('Error registering user:', error.response || error);
      alert('Failed to register user.');
    }
  };
  
  // Same for the createPost function
  const createPost = async () => {
    try {
      const response = await axios.post(`/post`, {
        postId: Date.now().toString(),
        content
      });
      alert(response.data.message);
      getPosts();  // Reload posts after creating a new post
    } catch (error) {
      console.error('Error creating post:', error.response || error);
      alert('Failed to create post.');
    }
  };
  
  // And for the getPosts function
  const getPosts = async () => {
    try {
      const response = await axios.get(`/posts`);
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error.response || error);
      alert('Failed to fetch posts.');
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div>
      <h1>UNO Forum</h1>

      {/* Register User Form */}
      <div>
        <h2>Register</h2>
        <input 
          type="text" 
          placeholder="Name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
        />
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
        <button onClick={registerUser}>Register</button>
      </div>

      {/* Create Post Form */}
      <div>
        <h2>Create Post</h2>
        <input 
          type="text" 
          placeholder="Content" 
          value={content} 
          onChange={(e) => setContent(e.target.value)} 
        />
        <button onClick={createPost}>Post</button>
      </div>

      {/* Display Posts */}
      <div>
        <h2>Posts</h2>
        <div>
          {posts.map((post, index) => (
            <div key={index}>{post.content}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
