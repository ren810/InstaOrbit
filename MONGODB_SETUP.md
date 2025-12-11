# MongoDB Setup for API Usage Tracking

## Quick Setup

### Option 1: MongoDB Atlas (Recommended for Production)

1. **Go to MongoDB Atlas**: https://cloud.mongodb.com/
2. **Create a free account** (if you don't have one)
3. **Create a new cluster** (Free tier is fine)
4. **Create a database user**:
   - Click "Database Access" → "Add New Database User"
   - Username: `admin` (or your choice)
   - Password: Generate a secure password
   - Click "Add User"

5. **Whitelist your IP**:
   - Click "Network Access" → "Add IP Address"
   - Click "Allow Access from Anywhere" (or add your specific IP)
   - Click "Confirm"

6. **Get your connection string**:
   - Click "Database" → "Connect" → "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Replace `<database>` with `instaorbit`

7. **Add to `.env.local`**:
   ```env
   MONGODB_URI=mongodb+srv://admin:<password>@cluster0.xxxxx.mongodb.net/instaorbit?retryWrites=true&w=majority
   ```

### Option 2: Local MongoDB (For Development)

1. **Install MongoDB locally**: https://www.mongodb.com/try/download/community
2. **Start MongoDB**:
   ```bash
   mongod
   ```
3. **Keep default in `.env.local`**:
   ```env
   MONGODB_URI=mongodb://localhost:27017/instaorbit
   ```

## How It Works

✅ **Automatic Tracking**: Every API call is automatically tracked in MongoDB
✅ **Works in Production**: No file system needed - perfect for Vercel/Netlify
✅ **Real-time Updates**: See live usage stats in your admin dashboard
✅ **Persistent Data**: Your usage data is saved even after redeployment

## What Gets Tracked

- Total API calls
- Success vs Failed calls
- Last call timestamp
- Daily usage statistics
- Per-API breakdown

## Admin Dashboard Features

- View real-time usage stats
- Monitor API 1 limit (100 calls/month)
- Track API 2 unlimited usage
- Reset statistics (admin only)
- Refresh data anytime

## Deployment

When deploying to Vercel:
1. Add `MONGODB_URI` to your Vercel environment variables
2. Go to your Vercel project → Settings → Environment Variables
3. Add: `MONGODB_URI` = `your-mongodb-atlas-connection-string`
4. Redeploy your app

That's it! Your usage tracking will work automatically! 🎉
