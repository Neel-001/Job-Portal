# 🚀 TalentNest — Job Portal Platform

<div align="center">

![TalentNest](https://img.shields.io/badge/TalentNest-Job%20Portal-6366f1?style=for-the-badge&logo=briefcase&logoColor=white)
![React](https://img.shields.io/badge/React_19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Socket.io](https://img.shields.io/badge/Socket.io-010101?style=for-the-badge&logo=socket.io&logoColor=white)

**A full-stack job portal connecting talented candidates with top recruiters — featuring real-time video interviews powered by WebRTC.**

[Live Demo](https://talent-nest-384p.onrender.com) · [Report Bug](../../issues) · [Request Feature](../../issues)

</div>

---

## 📋 Table of Contents

- [About the Project](#-about-the-project)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the App](#running-the-app)
- [API Reference](#-api-reference)
- [Project Structure](#-project-structure)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌟 About the Project

**TalentNest** is a modern, full-stack job portal that bridges the gap between job seekers and recruiters. Built with a React 19 frontend and a Node.js/Express backend, it offers a seamless hiring experience — from job discovery to real-time video interviews — all within a single platform.

---

## ✨ Features

### 👤 For Job Seekers (Students)
- 🔐 **Secure Authentication** — Register & login with role-based access (Student / Recruiter)
- 🔍 **Job Discovery** — Browse and search jobs with filters by location, salary, and type
- 📄 **One-Click Apply** — Apply to jobs instantly from the job description page
- 👤 **Profile Management** — Upload profile photo, resume (PDF), add bio & skills
- 📅 **Interview Scheduling** — View upcoming interviews scheduled by recruiters
- 🎥 **Live Video Interviews** — Join video interview rooms powered by WebRTC & PeerJS

### 🏢 For Recruiters (Admin)
- 🏗️ **Company Management** — Create and configure company profiles with logos
- 📝 **Job Posting** — Post jobs with title, description, requirements, salary, location, and type
- 👥 **Applicant Tracking** — View all applicants for each job posting
- 🎙️ **Interview Scheduling** — Schedule interviews with video room links for applicants
- 📊 **Dashboard** — Manage all companies and job postings from a single dashboard

### ⚡ Platform Features
- 🌙 **Dark / Light Mode** — Theme toggle with `next-themes`
- 📡 **Real-Time Communication** — Socket.io-powered WebRTC signaling for peer-to-peer video
- ☁️ **Cloud File Storage** — Profile photos and resumes stored on Cloudinary
- 📱 **Responsive Design** — Mobile-first UI built with Tailwind CSS v4
- 🔒 **JWT Authentication** — Secure HTTP-only cookie-based sessions
- 🎨 **Smooth Animations** — UI animations powered by Framer Motion

---

## 🛠 Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| [React 19](https://react.dev/) | UI framework |
| [Vite 6](https://vitejs.dev/) | Build tool & dev server |
| [Tailwind CSS v4](https://tailwindcss.com/) | Utility-first styling |
| [Redux Toolkit](https://redux-toolkit.js.org/) | Global state management |
| [Redux Persist](https://github.com/rt2zz/redux-persist) | Persistent auth state |
| [React Router DOM v7](https://reactrouter.com/) | Client-side routing |
| [Framer Motion](https://www.framer.com/motion/) | Animations |
| [Radix UI](https://www.radix-ui.com/) | Accessible headless UI components |
| [PeerJS](https://peerjs.com/) | WebRTC peer-to-peer video |
| [Socket.io Client](https://socket.io/) | Real-time WebRTC signaling |
| [Axios](https://axios-http.com/) | HTTP client |
| [Sonner](https://sonner.emilkowal.ski/) | Toast notifications |
| [Lucide React](https://lucide.dev/) | Icons |

### Backend
| Technology | Purpose |
|---|---|
| [Node.js](https://nodejs.org/) | Runtime environment |
| [Express 5](https://expressjs.com/) | Web framework |
| [MongoDB](https://www.mongodb.com/) | NoSQL database |
| [Mongoose](https://mongoosejs.com/) | MongoDB ODM |
| [JWT](https://jwt.io/) | Authentication tokens |
| [bcryptjs](https://github.com/dcodeIO/bcrypt.js) | Password hashing |
| [Cloudinary](https://cloudinary.com/) | Cloud media storage |
| [Multer](https://github.com/expressjs/multer) | File upload handling |
| [Socket.io](https://socket.io/) | WebRTC signaling server |
| [Cookie Parser](https://github.com/expressjs/cookie-parser) | HTTP cookie handling |

---

## 🏗 Architecture

```
TalentNest/
├── frontend/          # React 19 + Vite SPA
│   └── src/
│       ├── components/    # UI components (auth, admin, shared)
│       ├── redux/         # Redux slices & store
│       ├── hooks/         # Custom React hooks
│       └── utils/         # Utility functions & API constants
└── backend/           # Node.js + Express REST API
    ├── controllers/   # Business logic
    ├── models/        # Mongoose schemas
    ├── routes/        # API route definitions
    ├── middlewares/   # Auth middleware, multer config
    └── utils/         # DB connection, Cloudinary, DataURI
```

**Data Flow:**
```
Browser (React SPA) ←─ REST API ─→ Express Server ←─ Mongoose ─→ MongoDB Atlas
                    ←─ Socket.io ─→ WebRTC Signaling              Cloudinary (files)
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18 or higher
- **npm** v9 or higher
- A **MongoDB Atlas** cluster (or local MongoDB)
- A **Cloudinary** account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/talent-nest.git
   cd talent-nest
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

### Environment Variables

Create a `.env` file inside the `backend/` directory:

```env
# Server
PORT=8000

# Database
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/talentNest

# Authentication
SECRET_KEY=your_super_secret_jwt_key

# Cloudinary
CLOUD_NAME=your_cloudinary_cloud_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret
```

### Running the App

**Start the backend server:**
```bash
cd backend
npm run dev
```
> Server runs at `http://localhost:8000`

**Start the frontend dev server (in a new terminal):**
```bash
cd frontend
npm run dev
```
> App runs at `http://localhost:5173`

---

## 📡 API Reference

All endpoints are prefixed with `/api/v1`.

### Authentication — `/api/v1/user`
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `POST` | `/register` | Register a new user (with profile photo) | ❌ |
| `POST` | `/login` | Login and receive JWT cookie | ❌ |
| `GET` | `/logout` | Logout and clear session cookie | ✅ |
| `PUT` | `/profile/update` | Update profile, photo, and resume | ✅ |

### Companies — `/api/v1/company`
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `POST` | `/register` | Create a new company | ✅ Recruiter |
| `GET` | `/get` | Get all companies for logged-in recruiter | ✅ |
| `GET` | `/get/:id` | Get a single company by ID | ✅ |
| `PUT` | `/update/:id` | Update company info & logo | ✅ Recruiter |

### Jobs — `/api/v1/job`
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `POST` | `/post` | Post a new job | ✅ Recruiter |
| `GET` | `/get` | Get all jobs (with filters) | ✅ |
| `GET` | `/getAdminJobs` | Get jobs posted by the recruiter | ✅ Recruiter |
| `GET` | `/get/:id` | Get a single job by ID | ✅ |

### Applications — `/api/v1/application`
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `POST` | `/apply/:id` | Apply for a job | ✅ Student |
| `GET` | `/get` | Get applied jobs for the user | ✅ Student |
| `GET` | `/:id/applicants` | Get applicants for a job | ✅ Recruiter |
| `PUT` | `/status/:id/update` | Update application status | ✅ Recruiter |

### Interviews — `/api/v1/interview`
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `POST` | `/create` | Schedule an interview with a video room | ✅ Recruiter |
| `GET` | `/user/:userId` | Get interviews for a candidate | ✅ |
| `GET` | `/admin/:adminId` | Get all interviews for a recruiter | ✅ Recruiter |
| `PUT` | `/:id` | Update interview status / feedback | ✅ Recruiter |

---

## 📁 Project Structure

```
Job Portal/
├── backend/
│   ├── controllers/
│   │   ├── user.controller.js         # Register, login, logout, profile update
│   │   ├── company.controller.js      # CRUD for companies
│   │   ├── job.controller.js          # CRUD for job postings
│   │   ├── application.controller.js  # Job applications management
│   │   └── interview.controller.js    # Interview scheduling & updates
│   ├── middlewares/
│   │   ├── isAuthenticated.js         # JWT verification middleware
│   │   └── multer.js                  # File upload configuration
│   ├── models/
│   │   ├── user.model.js              # User schema (student / recruiter)
│   │   ├── company.model.js           # Company schema
│   │   ├── job.model.js               # Job posting schema
│   │   ├── application.model.js       # Job application schema
│   │   └── interview.model.js         # Interview schema with video room
│   ├── routes/                        # Express route definitions
│   ├── utils/
│   │   ├── db.js                      # MongoDB connection
│   │   ├── cloudinary.js              # Cloudinary configuration
│   │   └── datauri.js                 # Buffer → Data URI converter
│   ├── index.js                       # Express app entry point
│   └── webrtc-signaling.js            # Socket.io WebRTC signaling server
├── frontend/
│   └── src/
│       ├── components/
│       │   ├── auth/                  # Login & Signup pages
│       │   ├── admin/                 # Recruiter dashboard & management
│       │   ├── shared/                # Navbar, Footer, reusable components
│       │   └── InterviewRoomPage.jsx  # WebRTC video interview room
│       ├── redux/
│       │   ├── authSlice.js           # Auth state
│       │   ├── jobSlice.js            # Jobs state
│       │   └── store.js               # Redux store with persistence
│       ├── hooks/                     # Custom hooks (useGetJobs, etc.)
│       └── utils/                     # API constants
├── render.yaml                        # Render.com deployment config
└── package.json                       # Root workspace file
```

---

## 🌐 Deployment

The project is configured for deployment on **[Render](https://render.com)**.

**Frontend** is deployed as a **Static Site**:
- Build command: `npm install --prefix frontend && npm run build --prefix frontend`
- Publish directory: `frontend/dist`
- SPA rewrite: all routes → `index.html`

**Backend** is deployed as a **Web Service**:
- Build command: `npm install && npm install --prefix frontend && npm run build --prefix frontend`
- Start command: `node index.js`

**Live URL:** [https://talent-nest-384p.onrender.com](https://talent-nest-384p.onrender.com)

---

## 🤝 Contributing

Contributions are welcome! Here's how to get started:

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'feat: add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

Please follow [Conventional Commits](https://www.conventionalcommits.org/) for commit messages.

---

## 📄 License

Distributed under the **ISC License**. See `LICENSE` for more information.

---

<div align="center">

Made with ❤️ by the TalentNest Team

⭐ **Star this repo if you found it helpful!** ⭐

</div>
