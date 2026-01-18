# 🏠 Real Estate Management System

A modern, full‑stack **Property Management System** designed to streamline property listing, management, communication, and bookings. Built using **React**, **Node.js**, **Express**, and **MongoDB**, this application supports multiple user roles with secure authentication and real‑time features.

---

## ✨ Key Features

* 🔐 Secure user authentication with **role‑based access** (Admin, Owner, Buyer)
* 🏡 Property listing, editing, and management
* ✅ Property approval workflow (Admin controlled)
* 💬 Real‑time messaging using **Socket.io**
* 📄 Document & image uploads
* 📅 Property booking system
* 📇 Contact & inquiry management

---

## 🛠 Tech Stack

### Frontend

* **React 19**
* React Router
* Axios
* Socket.io Client
* Tailwind CSS
* Vite

### Backend

* Node.js
* Express 5
* MongoDB with Mongoose
* JWT Authentication
* Socket.io
* Multer (File uploads)
* bcryptjs (Password hashing)

---

## ⚙️ Setup Instructions

### Prerequisites

Ensure you have the following installed:

* Node.js (v16 or higher)
* MongoDB (Local or MongoDB Atlas)
* npm or yarn

---

## 🚀 Backend Setup

1. Navigate to the server directory:

```bash
cd server
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file from the example:

```bash
cp .env.example .env
```

4. Configure environment variables:

* `PORT` – Server port (default: `5000`)
* `MONGO_URI` – MongoDB connection string
* `JWT_SECRET` – Secret key for JWT authentication
* `FRONTEND_URL` – Frontend URL for CORS (default: `http://localhost:5173`)

5. Start the backend server:

```bash
npm start
```

---

## 🎨 Frontend Setup

1. Navigate to the client directory:

```bash
cd client
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file from the example:

```bash
cp .env.example .env
```

4. Configure environment variables:

* `VITE_BACKEND_URL` – Backend API URL (default: `http://localhost:5000/api`)

5. Start the development server:

```bash
npm run dev
```

---

## 📁 Project Structure

```text
property_management_system/
├── client/                  # React frontend
│   ├── src/
│   │   ├── Api/              # API service calls
│   │   ├── components/       # Reusable components
│   │   ├── pages/            # Page-level components
│   │   ├── routes/           # Route definitions
│   │   └── utils/            # Utility functions
│   └── ...
├── server/                   # Express backend
│   ├── config/               # Database & app configuration
│   ├── controllers/          # Route controllers
│   ├── middleware/           # Custom middleware
│   ├── models/               # Mongoose schemas
│   ├── routes/               # API routes
│   ├── socket/               # Socket.io setup
│   └── utils/                # Helper utilities
└── ...
```

---

## 🔗 API Endpoints

### Authentication

* `POST /api/auth/signup` – Register a new user
* `POST /api/auth/login` – User login

### Properties

* `GET /api/properties` – Get all approved properties
* `POST /api/properties` – Create a property (Owner only)
* `PUT /api/properties/:id` – Update property (Owner only)
* `DELETE /api/properties/:id` – Delete property (Owner only)

### Admin

* `GET /api/admin/properties/pending` – View pending properties
* `PUT /api/admin/properties/:id/approve` – Approve a property
* `PUT /api/admin/properties/:id/reject` – Reject a property

### Messaging

* `GET /api/conversations` – Get user conversations
* `POST /api/conversations` – Start a new conversation
* `GET /api/messages/:conversationId` – Fetch messages for a conversation

### Additional Modules

* Documents
* Bookings
* Property Images
* Saved Properties
* Contact / Inquiry

---

## 👥 User Roles

1. **Admin**

   * Approve or reject property listings
   * Manage platform data

2. **Owner**

   * Create and manage property listings
   * Communicate with buyers

3. **Buyer**

   * Browse approved properties
   * Save favorites
   * Contact property owners

---

## 🧪 Development Notes

* Backend URL: `http://localhost:5000`
* Frontend URL: `http://localhost:5173`
* Hot reload enabled for both frontend and backend

---

## 🔒 Security Features

* JWT‑based authentication
* Password hashing with bcryptjs
* Role‑based authorization
* CORS protection
* Input validation
* Protected API routes

---

## 🤝 Contributing

1. Fork the repository
2. Create a new feature branch
3. Commit your changes
4. Push to your branch
5. Open a Pull Request

---

## 📄 License

ISC
