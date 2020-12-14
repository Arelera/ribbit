const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

const usersRouter = require('./routes/users');

// middleware
app.use(cors());
app.use(express.json());
app.use(express.static('build'));

// routes
app.use('/api/users', usersRouter);

// route catch-all
app.use('/*', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'build/index.html'), (err) => {
    if (err) res.status(500).send();
  });
});

// error handler
app.use((err, req, res, next) => {
  console.log(err);
  switch (err.message) {
    case 'Invalid credentials':
      return res.status(401).json({ error: err.message });
    case 'Username taken':
      return res.status(400).send();

    default:
      return res.status(400).send();
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
