const router = require('express').Router();
const jwt = require('jsonwebtoken');
const client = require('../client');
const { JWT_SECRET } = require('../config');
const getTokenFrom = require('../helpers/getTokenFrom');

// get by subribbit name
router.get('/:sub', async (req, res, next) => {
  try {
    const sub = req.params;

    const response = await client.query(
      `
      SELECT * FROM posts
      WHERE subribbit = $1
      ORDER BY $2;
      `,
      [sub, order]
    );
    // this ain't done yet
    res.send(response.rows);
  } catch (error) {
    next(error);
  }
});

// create a post
router.post('/', async (req, res, next) => {
  try {
    const { sub, title, content } = req.body;
    const token = getTokenFrom(req);

    const decodedUser = jwt.verify(token, JWT_SECRET);
    const response = await client.query(
      `
      INSERT INTO posts (subribbit, creator, title, content)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
      `,
      [sub, decodedUser.id, title, content]
    );

    res.status(201).json(response.rows[0]);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
