import mongoose from 'mongoose';

const ApiUsageSchema = new mongoose.Schema({
  apiHost: {
    type: String,
    required: true,
    unique: true,
    enum: [
      'instagram-downloader-v2-scraper-reels-igtv-posts-stories.p.rapidapi.com',
      'instagram-downloader-download-instagram-stories-videos4.p.rapidapi.com'
    ]
  },
  totalCalls: {
    type: Number,
    default: 0
  },
  successCalls: {
    type: Number,
    default: 0
  },
  failedCalls: {
    type: Number,
    default: 0
  },
  lastCallAt: {
    type: Date,
    default: null
  },
  dailyStats: {
    type: Map,
    of: Number,
    default: {}
  }
}, {
  timestamps: true
});

export default mongoose.models.ApiUsage || mongoose.model('ApiUsage', ApiUsageSchema);
