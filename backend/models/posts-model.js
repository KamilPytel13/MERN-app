const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: { type: String, required: true},
    description: { type: String, required: true},
    creator: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
    likes: { type: Number, default: 0}
}, {
    timestamps: true
});

module.exports = mongoose.model('Post', postSchema);