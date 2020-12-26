const router = require('express').Router();
const client = require('../client');
const jwt = require('jsonwebtoken');
const getTokenFrom = require('../helpers/getTokenFrom');
const { JWT_SECRET } = require('../config');

// get comments by post
router.get('/:post', async (req, res, next) => {
  try {
    const { post } = req.params;
    const response = await client.query(
      `
      SELECT c.id, post, c."parentComment", c.creator, content, c."createdAt", "editedAt", u.username FROM comments c
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

// comment on a post or reply to a comment
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

// edit a comment
router.patch('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { comment, updatedAt } = req.body;
    const token = getTokenFrom(req);

    const decodedUser = jwt.verify(token, JWT_SECRET);

    const response = await client.query(
      `
      UPDATE comments 
      SET content = $1,
        "editedAt" = $2
      WHERE id = $3 AND creator = $4
      RETURNING *;
      `,
      [comment, updatedAt, id, decodedUser.id]
    );

    res.json(response.rows[0]);
  } catch (error) {
    next(error);
  }
});

// delete a comment
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const token = getTokenFrom(req);

    const decodedUser = jwt.verify(token, JWT_SECRET);

    await client.query(
      `
      DELETE FROM comments
      WHERE id = $1 AND creator = $2;
      `,
      [id, decodedUser.id]
    );

    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
