const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const morgan = require('morgan');

// Error Controller
const globalErrorHandler = require('./controllers/errorController');
const AppError = require('./utility/appError');

// Routers
const userRouter = require('./routes/userRoutes');

dotenv.config({ path: './.env' });

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.use(morgan('dev'));

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

// Test api
app.get('/', (req, res) => {
  res.send('Webelight api working.');
});

// Routes
app.use('/api/v1/users', userRouter);

// Wild card route for unknown routes
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.method} ${req.originalUrl} route on this server.`, 404));
});

app.use(globalErrorHandler);

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Database connected');
  });

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(process.env.NODE_ENV);
  console.log(`Server running on port ${port}`);
});
