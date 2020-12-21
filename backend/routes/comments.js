const client = require('../client');

const router = require('express').Router();
const jwt = require('jsonwebtoken');
const getTokenFrom = require('../helpers/getTokenFrom');
const { JWT_SECRET } = require('../config');

// get comments by post
router.get('/:post', async (req, res, next) => {
  try {
    const { post } = req.params;
    const response = await client.query(
      `
      SELECT c.id, post, c."parentComment", content, "createdAt", "editedAt", u.username FROM comments c
      JOIN users u ON c.creator = u.id
      WHERE post = $1;
      `,
      [post]
    );

    res.send(response.rows);
  } catch (error) {
    next(error);
  }
});

// comment on a post
router.post('/:post', async (req, res, next) => {
  try {
    const { post } = req.params;
    const body = req.body;

    if (!body.comment) return res.send();

    const token = getTokenFrom(req);

    const decodedUser = jwt.verify(token, JWT_SECRET);

    const response = await client.query(
      `
      INSERT INTO comments (creator, post, "parentComment", content)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
      `,
      [decodedUser.id, post, body.parentComment || null, body.comment]
    );

    res.status(201).json(response.rows[0]);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
