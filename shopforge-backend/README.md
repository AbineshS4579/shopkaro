# ShopForge Backend

## Folder Structure
```
shopforge-backend/
├── server.js          ← Main entry point
├── .env               ← Your secrets (create this yourself)
├── .env.example       ← Template for .env
├── .gitignore
├── package.json
├── models/
│   └── User.js        ← MongoDB user schema
└── routes/
    └── auth.js        ← Register & Login API
```

## Setup Steps

### 1. Install dependencies
```bash
npm install
```

### 2. Create your .env file
Copy `.env.example` to `.env` and fill in your values:
```
MONGO_URI=mongodb+srv://youruser:yourpassword@cluster0.xxxxx.mongodb.net/shopforge
JWT_SECRET=any_long_random_string_here
PORT=5000
```

### 3. Run locally
```bash
node server.js
```

### 4. Test it
Open browser → http://localhost:5000
You should see: { "message": "✅ ShopForge Backend is Running!" }

## API Endpoints

| Method | URL | Description |
|--------|-----|-------------|
| GET | / | Health check |
| POST | /api/auth/register | Register new user |
| POST | /api/auth/login | Login user |
| GET | /api/auth/users | List all users (testing) |

## Deploy to Render

1. Push this folder to GitHub
2. Go to render.com → New → Web Service
3. Connect your GitHub repo
4. Set:
   - Build Command: `npm install`
   - Start Command: `node server.js`
5. Add Environment Variables:
   - MONGO_URI = your atlas string
   - JWT_SECRET = your secret
6. Click Deploy
