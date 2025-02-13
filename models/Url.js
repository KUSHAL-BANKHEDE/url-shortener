const mongoose = require('mongoose');
const shortid = require('shortid');

const UrlSchema = new mongoose.Schema({
  longUrl: { type: String, required: true },
  shortUrl: { type: String, required: true, default: shortid.generate },
  customAlias: { type: String, unique: true },
  topic: { type: String },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
  clicks: [{ timestamp: Date, ip: String, userAgent: String }],
});

module.exports = mongoose.model('Url', UrlSchema);