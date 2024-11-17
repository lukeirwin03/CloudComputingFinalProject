import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [content, setContent] = useState('');
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch posts when the component loads
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const response = await fetch('/posts');
    const data = await response.json();
    setPosts(data);
  };

  const registerUser = async () => {
    const response = await fetch('/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: email, name, email }),
    });
    const data = await response.json();
    alert(data.message);
  };

  const createPost = async () => {
    const response = await fetch('/post', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ postId: Date.now().toString(), content }),
    });
    const data = await response.json();
    alert(data.message);
    fetchPosts(); // Refresh the posts list
  };

  return (
    <div className="App">
      <h1>UNO Forum</h1>

      {/* Register Section */}
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

      {/* Create Post Section */}
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
        <div id="posts">
          {posts.map((post) => (
            <div key={post.postId}>
              <p>{post.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
