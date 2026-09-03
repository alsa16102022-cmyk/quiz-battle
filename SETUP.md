# Quiz Battle - Setup & Installation Guide

## 📋 Prerequisites

Before you begin, ensure you have installed:

1. **Node.js** (v16 or higher)
   - Download: https://nodejs.org/
   - Verify: `node --version` and `npm --version`

2. **PostgreSQL** (v12 or higher)
   - Download: https://www.postgresql.org/download/
   - Verify: `psql --version`

3. **Expo CLI** (for React Native development)
   ```bash
   npm install -g expo-cli
   ```

4. **Git** (for cloning the repository)
   - Download: https://git-scm.com/

5. **Docker & Docker Compose** (optional, for containerized setup)
   - Download: https://www.docker.com/products/docker-desktop

## 🚀 Installation Steps

### Option 1: Manual Setup (Recommended for Development)

#### Step 1: Clone the Repository
```bash
git clone https://github.com/alsa16102022-cmyk/quiz-battle.git
cd quiz-battle
```

#### Step 2: Database Setup

1. **Create PostgreSQL Database**
   ```bash
   psql -U postgres
   ```
   
   In psql shell:
   ```sql
   CREATE DATABASE quiz_battle_db;
   CREATE USER quiz_user WITH PASSWORD 'secure_password_here';
   ALTER ROLE quiz_user SET client_encoding TO 'utf8';
   ALTER ROLE quiz_user SET default_transaction_isolation TO 'read committed';
   ALTER ROLE quiz_user SET default_transaction_deferrable TO on;
   ALTER ROLE quiz_user SET default_transaction_read_only TO off;
   GRANT ALL PRIVILEGES ON DATABASE quiz_battle_db TO quiz_user;
   \c quiz_battle_db
   GRANT ALL ON SCHEMA public TO quiz_user;
   \q
   ```

2. **Create Tables**
   ```bash
   psql -U quiz_user -d quiz_battle_db -f database/schema.sql
   psql -U quiz_user -d quiz_battle_db -f database/seeds.sql
   ```

#### Step 3: Backend Setup

```bash
cd backend
npm install
```

**Create `.env` file:**
```bash
cp .env.example .env
```

**Configure `.env`:**
```env
# Server
NODE_ENV=development
PORT=5000

# Database
DATABASE_URL=postgresql://quiz_user:secure_password_here@localhost:5432/quiz_battle_db
DB_HOST=localhost
DB_PORT=5432
DB_USER=quiz_user
DB_PASSWORD=secure_password_here
DB_NAME=quiz_battle_db

# Authentication
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRY=7d

# Redis (optional, for caching)
REDIS_URL=redis://localhost:6379

# CORS
CORS_ORIGIN=http://localhost:19000,http://localhost:8081

# Email (for future notifications)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_app_password
```

**Start Backend Development Server:**
```bash
npm run dev
# Backend running at http://localhost:5000
```

Verify with:
```bash
curl http://localhost:5000/api/health
```

#### Step 4: Frontend Setup

In a new terminal:
```bash
cd frontend
npm install
npm start
```

This will start Expo development server. You'll see:
```
┌────────────────────────────────────────────────────────────────┐
│                                                                │
│   Expo DevTools is running at http://localhost:19000           │
│                                                                │
│   ➜  Press 'a' to open Android emulator                        │
│   ➜  Press 'i' to open iOS simulator                           │
│   ➜  Press 'w' to open web                                     │
│   ➜  Scan QR code with Expo Go app for physical device         │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

**Testing Frontend:**
- Press `w` for web preview
- Use `expo-go` app on physical device (scan QR code)
- Use iOS Simulator or Android Emulator

---

### Option 2: Docker Setup (Production-like)

#### Step 1: Clone Repository
```bash
git clone https://github.com/alsa16102022-cmyk/quiz-battle.git
cd quiz-battle
```

#### Step 2: Create `.env` File
```bash
cp backend/.env.example backend/.env
```

Edit `backend/.env`:
```env
NODE_ENV=production
PORT=5000
DATABASE_URL=postgresql://quiz_user:quiz_password@postgres:5432/quiz_battle_db
DB_HOST=postgres
DB_PORT=5432
DB_USER=quiz_user
DB_PASSWORD=quiz_password
DB_NAME=quiz_battle_db
JWT_SECRET=your_super_secret_jwt_key
REDIS_URL=redis://redis:6379
CORS_ORIGIN=http://localhost:19000
```

#### Step 3: Start Services
```bash
docker-compose up -d
```

Wait 30 seconds for services to initialize.

**Verify Services:**
```bash
# Backend health check
curl http://localhost:5000/api/health

# Database connection
docker-compose exec postgres psql -U quiz_user -d quiz_battle_db -c "SELECT COUNT(*) FROM users;"

# Redis
docker-compose exec redis redis-cli ping
```

#### Step 4: Frontend (still local)
```bash
cd frontend
npm install
npm start
```

**Stop Services:**
```bash
docker-compose down
```

---

## ✅ Verification Checklist

Ensure everything is running correctly:

- [ ] Backend running at `http://localhost:5000`
- [ ] Frontend running at `http://localhost:19000` (Expo)
- [ ] Database connected (no connection errors)
- [ ] Redis connected (if using Docker)
- [ ] Sample data loaded in database
- [ ] API endpoints responding

**Test API Connection:**
```bash
# Health check
curl http://localhost:5000/api/health

# Get categories
curl http://localhost:5000/api/categories

# Get sample questions
curl http://localhost:5000/api/questions?category=general&difficulty=easy&limit=5
```

---

## 📱 Running on Physical Device

### Android
1. Install [Expo Go](https://play.google.com/store/apps/details?id=host.exp.exponent) from Play Store
2. In Expo terminal, press `a` or scan QR code

### iOS
1. Install [Expo Go](https://apps.apple.com/us/app/expo-go/id982107779) from App Store
2. In Expo terminal, press `i` or scan QR code

---

## 🔧 Troubleshooting

### Backend won't start
```bash
# Check if port 5000 is already in use
lsof -i :5000

# If in use, kill the process or change PORT in .env
```

### Database connection error
```bash
# Verify PostgreSQL is running
pg_isready -h localhost -p 5432

# Check credentials
psql -U quiz_user -h localhost -d quiz_battle_db

# Verify DATABASE_URL in .env
```

### Frontend won't connect to backend
```bash
# Ensure CORS_ORIGIN in .env includes frontend URL
# Backend API_URL in frontend .env should be http://localhost:5000 (or your IP)

# Check network:
curl http://YOUR_IP:5000/api/health
```

### Docker issues
```bash
# View logs
docker-compose logs -f backend
docker-compose logs -f postgres

# Rebuild containers
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

### Clear Node modules and reinstall
```bash
rm -rf node_modules package-lock.json
npm install
```

---

## 📊 Database Schema Overview

**Key Tables:**
- `users` - User accounts, profiles, stats
- `categories` - Quiz categories (10 total)
- `questions` - Quiz questions (500+ pre-loaded)
- `answers` - Multiple choice options
- `quiz_sessions` - Active quiz tracking
- `quiz_results` - Completed quiz scores
- `leaderboard` - User rankings

View full schema: `database/schema.sql`

---

## 🧪 Running Tests

```bash
# Backend unit tests
cd backend
npm test

# Backend with coverage
npm run test:coverage

# Frontend tests
cd ../frontend
npm test
```

---

## 🚢 Deployment

### Production Checklist
- [ ] Change all `.env` secrets
- [ ] Enable HTTPS
- [ ] Set up database backups
- [ ] Configure CDN for static assets
- [ ] Set up monitoring & logging
- [ ] Enable rate limiting
- [ ] Test API endpoints thoroughly
- [ ] Set up CI/CD pipeline

**Deploy Backend (Heroku Example):**
```bash
heroku login
heroku create quiz-battle-api
heroku addons:create heroku-postgresql:standard-0
heroku config:set JWT_SECRET=your_secret
git push heroku main
```

**Deploy Frontend (Expo EAS):**
```bash
cd frontend
eas build --platform all
eas submit
```

---

## 📚 Additional Resources

- [React Native Docs](https://reactnative.dev/)
- [Expo Documentation](https://docs.expo.dev/)
- [Express.js Guide](https://expressjs.com/)
- [PostgreSQL Tutorials](https://www.postgresql.org/docs/)
- [Socket.io Documentation](https://socket.io/docs/)

---

## 💡 Tips

1. **Development**: Use `npm run dev` for hot-reloading
2. **Debugging**: Check console logs and network tab
3. **Database**: Use `psql` to query directly during development
4. **Testing**: Create an account and play solo mode first
5. **Code Style**: Run `npm run lint` before committing

---

**Happy coding! 🎮**
