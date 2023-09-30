const express = require('express');
const session = require('express-session');
const redis = require('redis');
const RedisStore = require('connect-redis')(session);

const app = express();
const port = 3000;

// Create a Redis client and connect to your Redis server.
// const RedisStore = connectRedis(session);
const redisClient = redis.createClient({
  host: 'localhost', // Replace with your Redis server's host
  port: 6379,        // Replace with your Redis server's port
});

// Use the Redis store for session management.
app.use(session({
  store: new RedisStore({ client: redisClient }),
  secret: 'wertyuijikkjnnkihb', // Replace with a secret key for session data
  resave: false,
  saveUninitialized: false,
}));

// Your login routes and other middleware go here...

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    // Authenticate the user here (e.g., check username and password).
    // If authentication is successful, set user data in the session.
    req.session.user = { username: 'exampleUser' };
    res.send('Logged in successfully');
  });
  app.get('/profile', (req, res) => {
    // Check if the user is authenticated.
    if (req.session.user) {
      res.send(`Welcome, ${req.session.user.username}!`);
    } else {
      res.redirect('/login'); // Redirect to the login page if not authenticated.
    }
  });
  
  
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
