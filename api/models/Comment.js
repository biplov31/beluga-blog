const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const CommentSchema = new Schema({
  comment: String,
  author: {type: Schema.Types.ObjectId, ref: 'User'},
  postId: String,
  createdAt : {
    type: Date,
    default: Date.now
  }
})

const CommentModel = model('Comment', CommentSchema);

module.exports = CommentModel;