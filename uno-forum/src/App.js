import React, { useState, useEffect } from 'react';

const App = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [content, setContent] = useState('');
  const [posts, setPosts] = useState([]);

  // Function to register user
  const registerUser = async () => {
    const response = await fetch('http://localhost:5000/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: email, name, email })
    });
    const data = await response.json();
    alert(data.message);
  };

  // Function to create a new post
  const createPost = async () => {
    const response = await fetch('http://localhost:5000/post', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ postId: Date.now().toString(), content })
    });
    const data = await response.json();
    alert(data.message);
    getPosts();  // Reload posts after creating a new post
  };

  // Function to get all posts
  const getPosts = async () => {
    const response = await fetch('http://localhost:5000/posts');
    const data = await response.json();
    setPosts(data);
  };

  // Load posts when the component mounts
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
