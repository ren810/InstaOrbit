# 🚀 InstaOrbit - Professional Instagram Downloader

A high-performance, modern Instagram media downloader with a stunning sci-fi interface. Download Instagram posts, reels, stories, and photos in HD quality.

## ✨ Features

- 📥 Download Instagram videos, reels, and photos
- 🎨 Modern sci-fi themed UI with animations
- ⚡ Lightning-fast downloads
- 📊 Usage tracking with MongoDB
- 🔒 Secure and privacy-focused
- 📱 Fully responsive design
- 🎯 SEO optimized

## 🛠️ Tech Stack

- **Framework:** Next.js 14
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Database:** MongoDB (Mongoose)
- **Icons:** Lucide React

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- MongoDB database (local or MongoDB Atlas)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd instaorbit-downloader
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   MONGODB_URI=mongodb://localhost:27017/instaorbit
   # Or use MongoDB Atlas:
   # MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/instaorbit
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📦 Build for Production

```bash
npm run build
npm start
```

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Add environment variable: `MONGODB_URI`
4. Deploy!

See [DEPLOYMENT_GUIDE.md](./BUILD_VERIFICATION.md) for detailed instructions.

## 📁 Project Structure

```
src/
├── app/              # Next.js app directory
├── components/
│   ├── client/      # Client-side components
│   └── server/      # Server-side components
├── lib/             # Utilities and database
└── types/           # TypeScript types
```

## 🔧 Configuration

- **MongoDB Setup:** See [MONGODB_SETUP.md](./MONGODB_SETUP.md)
- **Admin Panel:** See [ADMIN_PANEL.md](./ADMIN_PANEL.md)

## 📄 License

All rights reserved © 2024 InstaOrbit

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

**Made with ❤️ for the Instagram community**
