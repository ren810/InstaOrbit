# Admin Panel Documentation

## Overview
The InstaOrbit Admin Panel allows you to test and monitor the Instagram downloader APIs in real-time.

## Features
- 🔐 Secure password-based authentication
- 🧪 Test both Instagram APIs (API 1 & API 2)
- 📊 View detailed request/response data
- 🎨 Same UI theme as main site
- 📋 Copy responses to clipboard
- ⚡ Real-time API testing

## Setup

### 1. Set Admin Password
Create a `.env.local` file in the root directory:

```env
ADMIN_PASSWORD=your_secure_password_here
RAPIDAPI_KEY=your_rapidapi_key_here
```

**Important:** Change `your_secure_password_here` to a strong password!

### 2. Access Admin Panel
Navigate to: `http://localhost:3000/admin`

### 3. Login
Enter your admin password to access the panel.

## Using the Admin Panel

### Testing APIs

1. **Select API**: Choose between API 1 (Instagram Downloader) or API 2 (Instagram120)
2. **Enter URL**: Paste an Instagram post/reel URL
3. **Click Test**: View the complete request/response data

### API Endpoints

#### API 1 - Instagram Downloader
- **Host**: `instagram-downloader-download-instagram-stories-videos4.p.rapidapi.com`
- **Method**: GET
- **Endpoint**: `/convert?url={url}`

#### API 2 - Instagram120
- **Host**: `instagram120.p.rapidapi.com`
- **Method**: POST
- **Endpoint**: `/api/instagram/posts`

### Response Information

The admin panel displays:
- ✅ API name and endpoint
- 📤 Complete request headers and body
- 📥 Response status code
- 📋 Full JSON response data
- ⏰ Timestamp
- 📋 Copy to clipboard functionality

## Security

- Admin routes are protected with password authentication
- HTTP-only cookies prevent XSS attacks
- Session expires after 24 hours
- Admin pages are not indexed by search engines (`noindex, nofollow`)
- Rate limiting applies to all API routes

## Logout

Click the "LOGOUT" button in the top-right corner to end your session.

## Troubleshooting

### "Invalid password" error
- Check your `.env.local` file
- Ensure `ADMIN_PASSWORD` is set correctly
- Restart the development server after changing `.env.local`

### API test fails
- Verify your `RAPIDAPI_KEY` is valid
- Check the Instagram URL is correct and public
- View the error message in the response panel

### Session expired
- Simply login again with your admin password
- Sessions last 24 hours by default

## Default Credentials

**Default Password**: `admin123` (if `ADMIN_PASSWORD` is not set)

⚠️ **IMPORTANT**: Always change the default password in production!

## Tech Stack

- Next.js 14 App Router
- Server Components
- HTTP-only cookie authentication
- Framer Motion animations
- Tailwind CSS (InstaOrbit theme)
