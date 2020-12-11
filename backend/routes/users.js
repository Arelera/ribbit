const router = require('express').Router();
// import jwt from 'jsonwebtoken';
// import bcryptjs from 'bcryptjs';

router.get('/', (req, res) => {
  res.json({ yeehaw: 'helll yeee' });
});

module.exports = router;
