const router = require('express').Router();
const client = require('../client');
const jwt = require('jsonwebtoken');
const getTokenFrom = require('../helpers/getTokenFrom');
const { JWT_SECRET } = require('../config');

// get comments by post
router.get('/:post', async (req, res, next) => {
  try {
    const { post } = req.params;
    const token = getTokenFrom(req);
    let decodedUser = {};
    if (token) {
      decodedUser = jwt.verify(token, JWT_SECRET);
    }
    const isUser = !!decodedUser.id;

    const opts = isUser
      ? ', (SELECT "isUpvote" FROM "commentVotes" cv WHERE cv.comment = c.id AND cv.creator = $2)'
      : '';
    const arr = isUser ? [post, decodedUser.id] : [post];
    const response = await client.query(
      `
      SELECT c.id, post, c."parentComment", c.creator, content, c."createdAt", "editedAt", u.username,
      (SELECT  SUM("isUpvote") FROM "commentVotes" WHERE comment = c.id) points
      ${opts}
      FROM comments c

      JOIN users u ON c.creator = u.id
      WHERE post = $1;
      `,
      arr
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

// vote on a comment
router.post('/vote/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { isUpvote } = req.body;
    const token = getTokenFrom(req);
    const decodedUser = jwt.verify(token, JWT_SECRET);

    // search if user voted on this comment before
    const voteCheck = await client.query(
      `
      SELECT * FROM "commentVotes"
      WHERE comment = $1 AND creator = $2;
      `,
      [id, decodedUser.id]
    );
    const voted = voteCheck.rows[0]; // this is the old vote (if it exists)

    // if voted and has same isUpvote, remove the old vote
    if (voted && voted.isUpvote === isUpvote) {
      response = await client.query(
        `
        DELETE FROM "commentVotes"
        WHERE comment = $1 AND creator = $2;
        `,
        [voted.comment, decodedUser.id]
      );
    }
    // if voted but has different isUpvote, update the old vote
    else if (voted && voted.isUpvote !== isUpvote) {
      response = await client.query(
        `
        UPDATE "commentVotes"
        SET "isUpvote" = $1
        WHERE comment = $2 AND creator = $3
        RETURNING *;
        `,
        [isUpvote, voted.comment, decodedUser.id]
      );
    }
    // if did not vote, just add the vote
    else if (!voted) {
      response = await client.query(
        `
        INSERT INTO "commentVotes" ("isUpvote", comment, creator)
        VALUES ($1, $2, $3)
        RETURNING *; 
        `,
        [isUpvote, id, decodedUser.id]
      );
    }
    res.send(voted);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
