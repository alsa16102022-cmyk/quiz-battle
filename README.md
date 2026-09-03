# Quiz Battle 🎮

A modern, addictive multiplayer quiz game where users compete against friends or random players in fast-paced multiple-choice battles.

## 🎯 Features

### MVP (Phase 1)
- ✅ User Authentication & Profile
- ✅ Solo Quiz Mode
- ✅ 10 Categories (General Knowledge, Science, Math, English, History, Geography, Sports, Technology, Movies, Pakistan Studies)
- ✅ 4 Difficulty Levels (Easy, Medium, Hard, Expert)
- ✅ 10-Question Battles with 10-Second Timer
- ✅ Real-time Scoring
- ✅ Results Screen
- ✅ Global Leaderboard
- ✅ Question Explanations
- ✅ Dark/Light Theme

### Phase 2 (Ready for Implementation)
- Multiplayer (Friend & Online)
- Private Game Codes
- Real-time WebSocket Multiplayer
- Power-ups (50/50, Extra Time, Double Points)
- XP & Level System
- Achievements
- Daily Challenges
- Streaks

### Phase 3 (Ready for Implementation)
- AI Question Generator
- In-game Coins & Shop
- Premium Subscription
- Cosmetic Avatars
- Advanced Leaderboards (Weekly, Monthly)

## 🏗️ Tech Stack

### Frontend
- **React Native** (Cross-platform: iOS & Android)
- **Expo** (Development & deployment)
- **Redux** (State management)
- **React Navigation** (Routing)
- **Reanimated** (Smooth animations)
- **React Native Sound** (Audio effects)

### Backend
- **Node.js + Express** (REST API)
- **Socket.io** (Real-time multiplayer)
- **PostgreSQL** (Database)
- **JWT** (Authentication)
- **Bcrypt** (Password hashing)
- **Redis** (Session & cache management)

### DevOps
- **Docker** (Containerization)
- **Jest** (Testing)
- **ESLint** (Code quality)

## 📁 Project Structure

```
quiz-battle/
├── frontend/                 # React Native Mobile App
│   ├── app.json             # Expo config
│   ├── package.json
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── screens/         # App screens
│   │   ├── navigation/      # Navigation setup
│   │   ├── redux/           # State management
│   │   ├── services/        # API calls
│   │   ├── utils/           # Helpers
│   │   ├── styles/          # Theme & colors
│   │   └── App.js          # Main entry
│   └── babel.config.js
│
├── backend/                  # Node.js Server
│   ├── src/
│   │   ├── routes/          # API endpoints
│   │   ├── controllers/      # Business logic
│   │   ├── models/          # Database models
│   │   ├── middleware/      # Auth, validation
│   │   ├── services/        # Business logic
│   │   ├── sockets/         # WebSocket handlers
│   │   ├── utils/           # Helpers
│   │   ├── config/          # Configuration
│   │   └── server.js        # Server entry
│   ├── migrations/          # Database migrations
│   ├── seeds/               # Sample data
│   ├── .env.example
│   ├── package.json
│   └── Dockerfile
│
├── database/                 # PostgreSQL Schema
│   ├── schema.sql           # Database setup
│   ├── migrations/          # Version control
│   └── seeds.sql            # Sample quiz questions
│
├── docker-compose.yml        # Multi-container setup
├── .gitignore
└── SETUP.md                 # Installation & setup guide
```

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ & npm/yarn
- PostgreSQL 12+
- Expo CLI (`npm install -g expo-cli`)
- Docker (optional)

### Installation

1. **Clone & Setup**
   ```bash
   git clone https://github.com/alsa16102022-cmyk/quiz-battle.git
   cd quiz-battle
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Configure DATABASE_URL, JWT_SECRET, etc.
   npm run migrate      # Run database migrations
   npm run seed         # Seed sample questions
   npm run dev          # Start development server
   ```

3. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   npm start            # Start Expo development
   ```

### Using Docker
```bash
docker-compose up -d
# Backend: http://localhost:5000
# PostgreSQL: localhost:5432
```

## 📡 API Documentation

See `backend/API.md` for detailed endpoint documentation.

### Key Endpoints (MVP)
- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `GET /auth/profile` - Get current user
- `GET /categories` - Get all categories
- `POST /quiz/start` - Start solo quiz
- `POST /quiz/:id/answer` - Submit answer
- `POST /quiz/:id/complete` - Complete quiz
- `GET /leaderboard` - Get global leaderboard
- `GET /user/:id` - Get user profile

## 🎮 How to Play

1. **Register/Login** - Create your account
2. **Select Category** - Choose a quiz category
3. **Choose Difficulty** - Easy, Medium, Hard, or Expert
4. **Answer Questions** - 10 questions with 10-second timer each
5. **Earn Points** - Faster correct answers = more points
6. **View Results** - See your score and explanations
7. **Check Leaderboard** - Compete with other players

## 🔐 Security

- ✅ Password hashing with Bcrypt
- ✅ JWT authentication
- ✅ CORS protection
- ✅ Rate limiting
- ✅ Input validation
- ✅ SQL injection prevention (prepared statements)
- ✅ Score tampering prevention (server-side validation)

## 📊 Database Schema

See `database/schema.sql` for complete schema.

### Main Tables
- `users` - User accounts & profiles
- `categories` - Quiz categories
- `questions` - Quiz questions
- `answers` - Multiple choice answers
- `quiz_sessions` - Active quiz sessions
- `quiz_results` - Completed quiz scores
- `leaderboard` - Rankings

## 🧪 Testing

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd ../frontend
npm test
```

## 📈 Performance Metrics

- Load time: < 3 seconds
- API response time: < 200ms
- Database queries optimized with indexes
- Redis caching for leaderboards
- CDN-ready for static assets

## 🔄 Next Steps (Phase 2+)

1. Add multiplayer with WebSockets
2. Implement power-ups system
3. Add XP & achievement system
4. Create AI question generator
5. Add in-game economy (coins, shop)
6. Premium subscription features
7. Push notifications
8. Social features (friends, chat)

## 📱 Supported Platforms

- iOS 12+
- Android 8.0+
- Web (via Expo Web)

## 💬 Support

For issues or feature requests, please open a GitHub issue.

## 📄 License

MIT License - See LICENSE file

---

**Built with ❤️ for quiz enthusiasts everywhere!**
