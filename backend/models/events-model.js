const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    title: { type: String, required: true},
    description: { type: String, required: true },
    place: { type: String, required: true },
    eventDate: { type: Date, required: true },
    eventTime: { type: String, required: true },
    creator: { type: String, required: true }
}, {
    timestamps: true
});

module.exports = mongoose.model('Event', eventSchema);