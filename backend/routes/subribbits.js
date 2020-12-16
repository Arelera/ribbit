const router = require('express').Router();
const jwt = require('jsonwebtoken');
const client = require('../client');
const { JWT_SECRET } = require('../config');
const getTokenFrom = require('../helpers/getTokenFrom');

// create subribbit
router.post('/', async (req, res, next) => {
  try {
    const token = getTokenFrom(req);
    const decodedUser = jwt.verify(token, JWT_SECRET);

    const { name, description } = req.body;
    console.log({ decodedUser });
    const response = await client.query(
      `
        INSERT INTO subribbits (name, description, creator)
        VALUES ($1, $2, $3);
      `,
      [name, description, decodedUser.id]
    );

    res.status(201).send();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
