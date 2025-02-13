const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const redis = require('redis');
const rateLimit = require('express-rate-limit');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(session({ secret: process.env.JWT_SECRET, resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Redis Client
const redisClient = redis.createClient({ url: process.env.REDIS_URL });
redisClient.on('error', (err) => console.log('Redis Client Error', err));
redisClient.connect();

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/shorten', require('./routes/shorten'));
app.use('/api/analytics', require('./routes/analytics'));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));