const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const client = require('../client');
const { JWT_SECRET } = require('../config');
const getTokenFrom = require('../helpers/getTokenFrom');

// refresh token
router.get('/refresh', async (req, res, next) => {
  try {
    console.log('Refr');
    const oldToken = getTokenFrom(req);
    const decodedUser = jwt.verify(oldToken, JWT_SECRET);

    const response = await client.query(
      `
      SELECT id, username, email, "joinedSubribbits", "createdAt",
        (SELECT SUM("isUpvote") FROM "postVotes" pv WHERE u.id = pv.creator) + 
        (SELECT SUM("isUpvote") FROM "commentVotes" cv WHERE u.id = cv.creator) karma
        FROM users u
      
      WHERE username = $1
      GROUP BY u.id;
      `,
      [decodedUser.username]
    );
    const user = response.rows[0];
    if (!user) return;

    const newToken = jwt.sign(user, JWT_SECRET);
    user.token = newToken;

    res.json(user);
  } catch (error) {
    next(error);
  }
});

// sign up
router.post('/signup', async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    // find if username already exists
    const checkResponse = await client.query(
      `
      SELECT id, username, email, "joinedSubribbits" FROM users
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
      RETURNING id, username, email, "joinedSubribbits", "createdAt";
    `,
      [username, email, passwordHash]
    );

    const createdUser = response.rows[0];

    // create a token with username and send it along with createdUser
    const token = jwt.sign(createdUser, JWT_SECRET);
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
      SELECT id, "passwordHash", username, email, "joinedSubribbits", "createdAt",
        (SELECT SUM("isUpvote") FROM "postVotes" pv WHERE u.id = pv.creator) + 
        (SELECT SUM("isUpvote") FROM "commentVotes" cv WHERE u.id = cv.creator) karma
        FROM users u
      
      WHERE username = $1
      GROUP BY u.id;
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
    delete user.passwordHash;

    const token = jwt.sign(user, JWT_SECRET);
    user.token = token;

    res.send(user);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
