// Requires
const express = require('express');
const toursRouter = require('./routes/tourRoutes');
const usersRouter = require('./routes/userRoutes');

// Helper Functions
const app = express();
const { log } = console;

// Middleware
app.use(express.json());
app.use(express.static('./public/'));
app.use((req, res, next) => {
  log('Hello from the middleware 👋');
  next();
});

app.use('/api/v1/tours', toursRouter);
app.use('/api/v1/users', usersRouter);

module.exports = app;
