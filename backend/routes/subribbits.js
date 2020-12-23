const router = require('express').Router();
const jwt = require('jsonwebtoken');
const client = require('../client');
const { JWT_SECRET } = require('../config');
const getTokenFrom = require('../helpers/getTokenFrom');

// get a subribbit
router.get('/:name', async (req, res, next) => {
  try {
    const { name } = req.params;

    const response = await client.query(
      `
        SELECT * FROM subribbits
        WHERE name = $1;
      `,
      [name]
    );

    res.send(response.rows[0]);
  } catch (error) {
    next(error);
  }
});

// get subribbits with similar name
router.get('/similar/:name', async (req, res, next) => {
  try {
    const { name } = req.params;
    const { limit } = req.query;

    const response = await client.query(
      `
      SELECT name, "memberCount" FROM subribbits
      WHERE name ILIKE ($1 || '%')
      ORDER BY "memberCount"
      LIMIT $2;
      `,
      [name, limit]
    );

    res.json(response.rows);
  } catch (error) {
    next(error);
  }
});

// get top "limit" subribbits
router.get('/top/:limit', async (req, res, next) => {
  try {
    const { limit } = req.params;

    const response = await client.query(
      `
        SELECT * FROM subribbits
        ORDER BY "memberCount"
        LIMIT $1;
      `,
      [limit]
    );

    res.json(response.rows);
  } catch (error) {
    next(error);
  }
});

// create subribbit
router.post('/', async (req, res, next) => {
  try {
    const token = getTokenFrom(req);
    const decodedUser = jwt.verify(token, JWT_SECRET);

    const { name, description } = req.body;

    // check if name is taken
    const checkResponse = await client.query(
      `
      SELECT * FROM subribbits
      WHERE name = $1;
      `,
      [name]
    );

    if (checkResponse.rows[0]) {
      throw new Error(`Subribbit name "${name}" is taken`);
    }

    const response = await client.query(
      `
        INSERT INTO subribbits (name, description, creator)
        VALUES ($1, $2, $3)
        RETURNING name;
      `,
      [name, description, decodedUser.id]
    );

    res.status(201).send(response.rows[0]);
  } catch (error) {
    next(error);
  }
});

// join a subribbit
router.patch('/join/:name', async (req, res, next) => {
  try {
    const { name } = req.params;
    const token = getTokenFrom(req);
    const decodedUser = jwt.verify(token, JWT_SECRET);

    await client.query(
      `
      UPDATE subribbits
      SET "memberCount" = "memberCount" + 1
      WHERE name = $1;
      `,
      [name]
    );

    const response = await client.query(
      `
      UPDATE users
      SET "joinedSubribbits" = array_append("joinedSubribbits", $1)
      WHERE id = $2
      RETURNING id, username, "joinedSubribbits", "createdAt";
      `,
      [name, decodedUser.id]
    );
    const user = response.rows[0];
    const newToken = jwt.sign(user, JWT_SECRET);
    user.token = newToken;

    res.send(user);
  } catch (error) {
    next(error);
  }
});

// exit a subribbit
router.patch('/exit/:name', async (req, res, next) => {
  try {
    const { name } = req.params;
    const token = getTokenFrom(req);

    const decodedUser = jwt.verify(token, JWT_SECRET);

    await client.query(
      `
      UPDATE subribbits
      SET "memberCount" = "memberCount" - 1
      WHERE name = $1;
      `,
      [name]
    );

    const response = await client.query(
      `
      UPDATE users
      SET "joinedSubribbits" = array_remove("joinedSubribbits", $1)
      WHERE id = $2
      RETURNING id, username, "joinedSubribbits", "createdAt";
      `,
      [name, decodedUser.id]
    );
    const user = response.rows[0];
    const newToken = jwt.sign(user, JWT_SECRET);
    user.token = newToken;

    res.send(user);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
