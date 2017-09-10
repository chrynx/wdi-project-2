const mongoose = require('mongoose');

const inboxSchema = new mongoose.Schema({
  subject: { type: String, required: true },
  text: String,
  image: String,
  userFrom: {type: mongoose.Schema.ObjectId, ref: 'User'},
  userTo: {type: mongoose.Schema.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Inbox', inboxSchema);
