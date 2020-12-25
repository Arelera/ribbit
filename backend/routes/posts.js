const router = require('express').Router();
const jwt = require('jsonwebtoken');
const client = require('../client');
const { JWT_SECRET } = require('../config');
const getTokenFrom = require('../helpers/getTokenFrom');

// get posts by params
router.get('/', async (req, res, next) => {
  try {
    const { subribbit, timeStart } = req.query;

    const token = getTokenFrom(req);
    let decodedUser = {};

    if (token) {
      decodedUser = jwt.verify(token, JWT_SECRET);
    }
    const isUser = !!decodedUser.id;

    // TODO: clean this place up

    // if there is a timeStart, it means we sort by top
    if (subribbit && timeStart) {
      const opts = isUser ? `LEFT JOIN "postVotes" pv2 ON p.id = pv2.post` : '';
      const opts2 = isUser ? `AND pv2.creator = $4 OR pv2.creator IS NULL` : '';

      const arr = isUser
        ? [subribbit, timeStart, new Date(), decodedUser.id]
        : [subribbit, timeStart, new Date()];

      const response = await client.query(
        `
        SELECT p.id, subribbit, p.creator, title, p.content, p."createdAt", p."editedAt",
          COUNT(c.id) "commentCount", SUM(pv."isUpvote") votes
          ${isUser ? ', pv2."isUpvote"' : ''}
        FROM posts p
        
        JOIN users u ON p.creator = u.id
        LEFT JOIN comments c ON p.id = c.post
        LEFT JOIN "postVotes" pv ON p.id = pv.post
        ${opts}

        WHERE subribbit = $1 
          AND (p."createdAt" BETWEEN $2 AND $3) 
          ${opts2}
        
        GROUP BY p.id, u.username ${isUser ? ', pv2."isUpvote"' : ''}
        ORDER BY p."createdAt" DESC;
        `,
        arr
      );

      return res.send(response.rows);
    } else if (subribbit) {
      const opts = isUser ? `LEFT JOIN "postVotes" pv2 ON p.id = pv2.post` : '';
      const opts2 = isUser ? `AND pv2.creator = $2 OR pv2.creator IS NULL` : '';

      const arr = isUser ? [subribbit, decodedUser.id] : [subribbit];
      // get all posts by subribbit (default sort is by new)
      const response = await client.query(
        `
        SELECT p.id, subribbit, p.creator, title, p.content, p."createdAt", p."editedAt",
          COUNT(c.id) "commentCount", SUM(pv."isUpvote") votes
          ${isUser ? ', pv2."isUpvote"' : ''}
          FROM posts p
          
          JOIN users u ON p.creator = u.id
          LEFT JOIN comments c ON p.id = c.post
          LEFT JOIN "postVotes" pv ON p.id = pv.post
          ${opts}

        WHERE subribbit = $1 ${opts2}
        
        GROUP BY p.id, u.username ${isUser ? ', pv2."isUpvote"' : ''}
        ORDER BY p."createdAt" DESC;
        `,
        arr
      );

      return res.send(response.rows);
    } else if (!subribbit && timeStart) {
      const opts = isUser ? `LEFT JOIN "postVotes" pv2 ON p.id = pv2.post` : '';
      const opts2 = isUser ? `AND pv2.creator = $3 OR pv2.creator IS NULL` : '';

      const arr = isUser
        ? [timeStart, new Date(), decodedUser.id]
        : [timeStart, new Date()];

      // get all posts sorted
      const response = await client.query(
        `
        SELECT p.id, subribbit, p.creator, title, p.content, p."createdAt", p."editedAt",
          COUNT(c.id) "commentCount", SUM(pv."isUpvote") votes
          ${isUser ? ', pv2."isUpvote"' : ''}
        FROM posts p

        JOIN users u ON p.creator = u.id
        LEFT JOIN comments c ON p.id = c.post
        LEFT JOIN "postVotes" pv ON p.id = pv.post
        ${opts}

        WHERE (p."createdAt" BETWEEN $1 AND $2) ${opts2}

        GROUP BY p.id, u.username
        ORDER BY p."createdAt" DESC;
        `,
        arr
      );

      return res.send(response.rows);
    } else if (!subribbit) {
      const opts = isUser
        ? `LEFT JOIN "postVotes" pv2 ON p.id = pv2.post 
      WHERE pv2.creator = $1 OR pv2.creator IS NULL`
        : '';
      const arr = isUser ? [decodedUser.id] : [];

      // get all posts
      const response = await client.query(
        `
        SELECT p.id, subribbit, p.creator, title, p.content, p."createdAt", p."editedAt",
          COUNT(c.id) "commentCount", u.username, SUM(pv."isUpvote") votes
          ${isUser ? ', pv2."isUpvote"' : ''}
        FROM posts p
          
        JOIN users u ON p.creator = u.id
        LEFT JOIN comments c ON p.id = c.post
        LEFT JOIN "postVotes" pv ON p.id = pv.post
        ${opts}

        GROUP BY p.id, u.username ${isUser ? ', pv2."isUpvote"' : ''}
        ORDER BY p."createdAt" DESC;
        `,
        arr
      );
      return res.send(response.rows);
    }
  } catch (error) {
    next(error);
  }
});

// get a post by id
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    const response = await client.query(
      `
      SELECT p.id, subribbit, creator, title, content, p."createdAt", p."editedAt", u.username FROM posts p
      JOIN users u ON p.creator = u.id
      WHERE p.id = $1;
      `,
      [id]
    );

    res.send(response.rows[0]);
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

router.patch('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { content, editedAt } = req.body;
    const token = getTokenFrom(req);
    const decodedUser = jwt.verify(token, JWT_SECRET);

    const response = await client.query(
      `
      UPDATE posts
      SET content = $1, "editedAt" = $2
      WHERE id = $3 AND creator = $4
      RETURNING *;
    `,
      [content, editedAt, id, decodedUser.id]
    );

    res.send(response.rows[0]);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const token = getTokenFrom(req);

    const decodedUser = jwt.verify(token, JWT_SECRET);

    await client.query(
      `
      DELETE FROM posts
      WHERE id = $1 AND creator = $2;
      `,
      [id, decodedUser.id]
    );

    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

// vote on a post
router.post('/vote/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { isUpvote } = req.body;
    const token = getTokenFrom(req);
    const decodedUser = jwt.verify(token, JWT_SECRET);
    console.log('ID: ', id);
    console.log('DECDOD: ', decodedUser);

    // search if user voted on this post before
    const voteCheck = await client.query(
      `
      SELECT * FROM "postVotes"
      WHERE post = $1 AND creator = $2;
      `,
      [id, decodedUser.id]
    );
    const voted = voteCheck.rows[0]; // this is the old vote (if it exists)
    console.log('VOTED: ', voted);

    // if voted and has same isUpvote, remove the old vote
    if (voted && voted.isUpvote === isUpvote) {
      response = await client.query(
        `
        DELETE FROM "postVotes"
        WHERE post = $1 AND creator = $2;
        `,
        [voted.post, decodedUser.id]
      );
    }
    // if voted but has different isUpvote, update the old vote
    else if (voted && voted.isUpvote !== isUpvote) {
      response = await client.query(
        `
        UPDATE "postVotes"
        SET "isUpvote" = $1
        WHERE post = $2 AND creator = $3
        RETURNING *;
        `,
        [isUpvote, voted.post, decodedUser.id]
      );
    }
    // if did not vote, just add the vote
    else if (!voted) {
      response = await client.query(
        `
        INSERT INTO "postVotes" ("isUpvote", post, creator)
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
