const router = require('express').Router();
const jwt = require('jsonwebtoken');
const client = require('../client');
const { JWT_SECRET } = require('../config');
const getTokenFrom = require('../helpers/getTokenFrom');

// get a subribbit
router.get('/:name', async (req, res, next) => {
  try {
    const name = req.params.name;

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

module.exports = router;
