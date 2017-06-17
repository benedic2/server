const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    comment: String,
    grade: Number,
    late: Number,
    user: { type: Schema.Types.ObjectId, ref: 'user' } 
    
},{timestamps:{createdAt: 'created_at'}});

const Comment = mongoose.model('comment', CommentSchema);

module.exports = Comment;