const express = require('express');
const router = express.Router();
const Url = require('../models/Url');
const redisClient = require('../config/redis');

router.post('/shorten', async (req, res) => {
  const { longUrl, customAlias, topic } = req.body;
  const shortUrl = customAlias || shortid.generate();

  const url = new Url({ longUrl, shortUrl, topic, userId: req.user.id });
  await url.save();

  // Cache the URL in Redis
  await redisClient.set(shortUrl, longUrl);

  res.json({ shortUrl, createdAt: url.createdAt });
});

router.get('/:alias', async (req, res) => {
  const { alias } = req.params;

  // Check Redis cache first
  const cachedUrl = await redisClient.get(alias);
  if (cachedUrl) return res.redirect(cachedUrl);

  const url = await Url.findOne({ shortUrl: alias });
  if (!url) return res.status(404).json({ error: 'URL not found' });

  // Log analytics data
  url.clicks.push({ timestamp: Date.now(), ip: req.ip, userAgent: req.headers['user-agent'] });
  await url.save();

  res.redirect(url.longUrl);
});

module.exports = router;