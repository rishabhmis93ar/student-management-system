# 🎓 Student Records Management System (Full-Stack CRUD App)

A secure, scalable, and performance-optimized full-stack web application for managing student records with authentication, file uploads, pagination, and search functionality.

Built using **Node.js, Express.js, MongoDB, and Vanilla JavaScript (Frontend SPA style)**.

---

## 🚀 Features

- 🔐 JWT Authentication (Register/Login)
- 🧑‍🎓 Full CRUD for Student Records
- 🖼️ Profile Image Upload (Multer)
- 🔍 Search Students (Case-insensitive)
- 📄 Pagination System
- 🗑️ Auto file cleanup on delete/update
- ⚡ RESTful API Architecture
- 🎨 Responsive UI using Bootstrap 5

---

## 🏗️ Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT (Authentication)
- Bcrypt.js (Password Hashing)
- Multer (File Uploads)

### Frontend
- HTML5
- CSS3 + Bootstrap 5
- Vanilla JavaScript (Fetch API)

---

## 📁 Project Structure


student-crud/
│
├── crud-api-backend/
│ ├── config/ # DB Connection
│ ├── middleware/ # Auth Middleware (JWT)
│ ├── models/ # Mongoose Schemas
│ ├── routes/ # API Routes
│ ├── uploads/ # Profile Images Storage
│ ├── .env # Environment Variables
│ └── index.js # Server Entry Point
│
└── crud-api-frontend/
    └── index.html


---

## 🔐 Environment Variables

Create a `.env` file in `crud-api-backend/`:

PORT=3000
MONGO_URL=mongodb://127.0.0.1:27017/students-crud
JWT_SECRET=your_secret_key

⚙️ Installation & Setup

1️⃣ Clone Repository
https://github.com/rishabhmis93ar/student-management-system.git
cd student-crud/crud-api-backend

2️⃣ Install Dependencies : npm install

3️⃣ Run Server : npm start

Server will run at : http://localhost:3000

4️⃣ Run Frontend
Open: crud-api-frontend/index.html
OR use Live Server: http://127.0.0.1:5500

📡 API Endpoints
🔐 Auth Routes

Method	    Endpoint	                Description
POST	    /api/users/register	        Register new user
POST	    /api/users/login	        Login user & get JWT
POST	    /api/users/logout	        Logout user

🎓 Student Routes (Protected)

⚠️ Requires JWT Token
Authorization: Bearer token

Method	Endpoint	            Description
GET	    /api/students	        Get all students (pagination + search)
GET	    /api/students/:id	    Get single student
POST	/api/students	        Add student
PUT	    /api/students/:id	    Update student
DELETE	/api/students/:id	    Delete student

🔍 Key Functionalities

📄 Pagination Logic
limit → number of records per page
skip = (page - 1) * limit
Efficient handling of large datasets

🔎 Search Feature
Case-insensitive search using MongoDB $regex

📤 File Upload
Handled using Multer
Stores images in /uploads
Auto deletes old images on update/delete

🔐 Authentication Flow
User registers
Password hashed using bcrypt
Login generates JWT token
Token required for student routes

🧠 Learning Highlights
REST API Design
JWT Authentication Flow
Middleware architecture in Express
File handling with Multer
Pagination & search optimization
Frontend async data rendering (Fetch API)


🧑‍💻 Author
Rituraj Mishra
Full-Stack Developer

📜 License
This project is open-source and free to use for learning purposes.