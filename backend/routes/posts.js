const router = require('express').Router();
const jwt = require('jsonwebtoken');
const client = require('../client');
const { JWT_SECRET } = require('../config');
const getTokenFrom = require('../helpers/getTokenFrom');

// get posts by params
router.get('/', async (req, res, next) => {
  try {
    const { subribbit, sort, timeStart } = req.query;

    // if there is a timeStart, it means we sort by top
    if (subribbit && timeStart) {
      const response = await client.query(
        `
        SELECT p.id, subribbit, p.creator, title, p.content, p."createdAt",
          COUNT(c.id) "commentCount"
        FROM posts p

        JOIN users u ON p.creator = u.id
        LEFT JOIN comments c ON p.id = c.post

        WHERE subribbit = $1 
          AND (p."createdAt" BETWEEN $2 AND $3) 
        
        GROUP BY p.id, u.username
        ORDER BY p."createdAt" DESC;
        `,
        [subribbit, timeStart, new Date()]
      );

      return res.send(response.rows);
    } else if (subribbit) {
      // get all posts by subribbit (default sort is by new)
      const response = await client.query(
        `
        SELECT p.id, subribbit, p.creator, title, p.content, p."createdAt",
          COUNT(c.id) "commentCount"
        FROM posts p

        JOIN users u ON p.creator = u.id
        LEFT JOIN comments c ON p.id = c.post

        WHERE subribbit = $1
        
        GROUP BY p.id, u.username
        ORDER BY p."createdAt" DESC;
        `,
        [subribbit]
      );

      return res.send(response.rows);
    } else if (!subribbit && timeStart) {
      // get all posts sorted
      const response = await client.query(
        `
        SELECT p.id, subribbit, p.creator, title, p.content, p."createdAt",
          COUNT(c.id) "commentCount"
        FROM posts p

        JOIN users u ON p.creator = u.id
        LEFT JOIN comments c ON p.id = c.post

        WHERE (p."createdAt" BETWEEN $1 AND $2)

        GROUP BY p.id, u.username
        ORDER BY p."createdAt" DESC;
        `,
        [timeStart, new Date()]
      );

      return res.send(response.rows);
    } else if (!subribbit) {
      // get all posts
      const response = await client.query(
        `
        SELECT p.id, subribbit, p.creator, title, p.content, p."createdAt",
          COUNT(c.id) "commentCount", u.username
        FROM posts p

        JOIN users u ON p.creator = u.id
        LEFT JOIN comments c ON p.id = c.post

        GROUP BY p.id, u.username
        ORDER BY p."createdAt" DESC;
        `
      );
      console.log(response.rows);
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
      SELECT p.id, subribbit, creator, title, content, p."createdAt", u.username FROM posts p
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

module.exports = router;
