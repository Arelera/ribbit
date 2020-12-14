const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const client = require('../client');
const { JWT_SECRET } = require('../config');

const getTokenFrom = (req) => {
  const auth = req.get('authorization');
  if (auth && auth.toLowerCase().startsWith('bearer ')) {
    return auth.substring(7);
  }
  return null;
};

// sign up
router.post('/signup', async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    // find if username already exists
    const checkResponse = await client.query(
      `
      SELECT * FROM users
      WHERE username = $1;
    `,
      [username]
    );
    if (checkResponse.rows.length) {
      throw new Error('Username taken');
    }

    // hash password
    const salt = await bcryptjs.genSalt();
    const passwordHash = await bcryptjs.hash(password, salt);

    const response = await client.query(
      `
      INSERT INTO users (username, email, "passwordHash")
      VALUES ($1, $2, $3)
      RETURNING username, email, "joinedSubribbits", "upvotedPosts", "downvotedPosts", "upvotedComments", "downvotedComments";
    `,
      [username, email, passwordHash]
    );

    const createdUser = response.rows[0];

    // create a token with username and send it along with createdUser
    const token = await jwt.sign(
      { username: createdUser.username },
      JWT_SECRET
    );
    createdUser.token = token;

    res.status(201).send(createdUser);
  } catch (error) {
    next(error);
  }
});

// log in
router.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // check if username exists
    const response = await client.query(
      `
      SELECT * FROM users
      WHERE username = $1;
      `,
      [username]
    );
    const user = response.rows[0];
    if (!user) {
      throw new Error('Invalid credentials');
    }

    // check if that users pass hash matches given password
    const isVerified = await bcryptjs.compare(password, user.passwordHash);
    if (!isVerified) {
      throw new Error('Invalid credentials');
    }

    const token = await jwt.sign({ username: user.username }, JWT_SECRET);
    user.token = token;

    res.send(user);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
