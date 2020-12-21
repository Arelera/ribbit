const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

const usersRouter = require('./routes/users');
const subribbitsRouter = require('./routes/subribbits');
const postsRouter = require('./routes/posts');
const commentsRouter = require('./routes/comments');

// middleware
app.use(cors());
app.use(express.json());
app.use(express.static('build'));

// routes
app.use('/api/users', usersRouter);
app.use('/api/subribbits', subribbitsRouter);
app.use('/api/posts', postsRouter);
app.use('/api/comments', commentsRouter);

// route catch-all
app.use('/*', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'build/index.html'), (err) => {
    if (err) res.status(500).send();
  });
});

// error handler
app.use((err, req, res, next) => {
  console.log(err.message);
  switch (err.message) {
    case 'Invalid credentials':
      return res.status(401).json({ error: err.message });
    case 'Username taken':
      return res.status(400).send();
    case 'insert or update on table "posts" violates foreign key constraint "posts_subribbit_fkey"':
      return res.status(404).json({ error: 'Subribbit not found' });
    default:
      return res.status(400).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
