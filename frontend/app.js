async function registerUser() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    
    const response = await fetch('/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: email, name: name, email: email })
    });
    alert(await response.json().message);
  }
  
  async function createPost() {
    const content = document.getElementById('content').value;
  
    const response = await fetch('/post', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ postId: Date.now().toString(), content: content })
    });
    alert(await response.json().message);
    getPosts();
  }
  
  async function getPosts() {
    const response = await fetch('/posts');
    const posts = await response.json();
    
    const postsDiv = document.getElementById('posts');
    postsDiv.innerHTML = '';
    posts.forEach(post => {
      const postElement = document.createElement('div');
      postElement.textContent = post.content;
      postsDiv.appendChild(postElement);
    });
  }
  
  // Load posts on page load
  window.onload = getPosts;
  