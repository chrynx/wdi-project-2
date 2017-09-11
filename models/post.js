const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  rating: Number,
  user: String
});

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: String,
  text: { type: String, maxlength: 380},
  image: String,
  comments: [commentSchema],
  user: {type: mongoose.Schema.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Post', postSchema);
