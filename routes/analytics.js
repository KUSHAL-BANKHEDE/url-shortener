const express = require('express');
const router = express.Router();
const Url = require('../models/Url');

router.get('/:alias', async (req, res) => {
  const url = await Url.findOne({ shortUrl: req.params.alias });
  if (!url) return res.status(404).json({ error: 'URL not found' });

  const analytics = {
    totalClicks: url.clicks.length,
    uniqueUsers: new Set(url.clicks.map(click => click.ip)).size,
    clicksByDate: [], // Implement date-based aggregation
    osType: [], // Implement OS-based aggregation
    deviceType: [], // Implement device-based aggregation
  };

  res.json(analytics);
});

module.exports = router;