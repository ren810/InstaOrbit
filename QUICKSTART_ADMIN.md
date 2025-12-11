# 🚀 Quick Start - Admin Panel

## Step 1: Set Your Admin Password

1. Create a `.env.local` file in the root directory (if it doesn't exist)
2. Add this line with YOUR password:

```env
ADMIN_PASSWORD=MySecurePassword123
```

## Step 2: Start the Development Server

```bash
npm run dev
```

## Step 3: Access Admin Panel

Open your browser and go to:
```
http://localhost:3000/admin
```

## Step 4: Login

Enter the password you set in `.env.local`

## Step 5: Test APIs

1. Select either **API 1** or **API 2**
2. Paste an Instagram URL (e.g., `https://www.instagram.com/p/ABC123/`)
3. Click **TEST API ENDPOINT**
4. View the complete request/response data!

## 🎯 What You Can Do

✅ Test both Instagram APIs
✅ See full request headers and body
✅ View complete API responses
✅ Check response status codes
✅ Copy JSON data to clipboard
✅ Debug API issues in real-time

## 📝 Example Instagram URLs to Test

- Post: `https://www.instagram.com/p/ABC123/`
- Reel: `https://www.instagram.com/reel/ABC123/`
- Story: `https://www.instagram.com/stories/username/ABC123/`

## 🔒 Security Notes

- Default password is `admin123` if not set
- **ALWAYS** change it in production!
- Sessions last 24 hours
- Click "LOGOUT" to end session

---

**That's it! You're ready to test your APIs! 🎉**
