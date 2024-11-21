const { createProxyMiddleware } = require('http-proxy-middleware');
const apiUrl = process.env.REACT_APP_AWS_URL || 'http://127.0.0.1:5000';
console.log(apiUrl)

module.exports = function(app) {
  app.use(
    ['/register', '/post', '/posts'],  // Proxy requests that start with /register, /post, or /posts
    createProxyMiddleware({
      target: 'http://localhost:5000', // URL of the backend server
      changeOrigin: true,
    })
  );
};
