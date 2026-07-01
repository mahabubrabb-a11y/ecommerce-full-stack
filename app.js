const express = require ('express')
const app = new express();
const ratelimit = require('express-rate-limit')
const helmet = require('helmet')
const mongoSanitize = require('express-mongo-sanitize')
const hpp = require('hpp')
const path = require('path')
const cors = require('cors')
const cookieParser = require('cookie-parser');
const { default: mongoose } = require('mongoose');
const { error } = require('console');
const { Route } = require('express');
require('dotenv').config();
const router = require('./src/routes/authroutes');
app.use(express.json());



//mongodb connect
const URL = process.env.let_URL
let option = {
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
    autoIndex: true,
    serverSelectionTimeoutMS: 5000,
};

mongoose
  .connect(URL, option)
  .then(() => {
    console.log(' Database connected successfully');
  })
  .catch((err) => {
    console.error(' Database connection error:', err.message);
  }); 


  //global middlewares

app.use(cookieParser())
app.use(cors({
   origin : ['http://localhost:5017', 'http://localhost:3001'],
   credentials : true,
}))

app.use(
  helmet({
    contentSecurityPolicy: {
      useDefaults: true,
      directives: {
        "img-src": ["'self'", "data:", "http:"],
      },
    },
  })
);

app.use(mongoSanitize())
app.use(hpp())

const limiter = ratelimit({
  max: 100,
  windowMs: 15 * 60 * 1000
})

app.use(limiter)

app.use('/api/v1/auth', router)

app.use('/api/v1/get-file', express.static('uploads'))



module.exports = app;