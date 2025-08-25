const mongoose = require('mongoose');
const { customAlphabet } = require('nanoid');

const nanoid = customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ', 6);

const SongSchema = new mongoose.Schema({
  title: { type: String, required: true },
  artist: { type: String, required: true },
  spotifyId: { type: String },
  youtubeId: { type: String },
}, { _id: true });

const EventSchema = new mongoose.Schema({
  eventName: {
    type: String,
    required: true,
    trim: true,
  },
  eventCode: {
    type: String,
    required: true,
    unique: true,
    default: () => nanoid(),
  },
  organizer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  approvedSongs: [SongSchema],
  suggestedSongs: [SongSchema],
}, {
  timestamps: true
});

module.exports = mongoose.model('Event', EventSchema);
