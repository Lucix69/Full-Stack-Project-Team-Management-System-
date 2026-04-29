# 🚀 JADz — Student Team Members Management Application

> **Course:** 21CSS301T – Full Stack Development  
> **Assessment:** CLAT-2 (Online Assessment)  
> **Institution:** SRM Institute of Science and Technology  
> **Team Name:** JADz  

---

## 📌 Project Description

A full-stack web application that allows a student team (**JADz**) to manage their team members. Built with **React.js** on the frontend and **Node.js + Express + MongoDB** on the backend, it supports adding, viewing, and exploring individual team member profiles — including photo uploads.

---

## 🛠️ Tech Stack

| Layer      | Technology                    |
|------------|-------------------------------|
| Frontend   | React.js, React Router v6     |
| Backend    | Node.js, Express.js           |
| Database   | MongoDB + Mongoose ODM        |
| HTTP Client| Axios                         |
| File Upload| Multer                        |
| Dev Tools  | VS Code, MongoDB Compass, Nodemon |

---

## 📁 Project Structure

```
JADz/
├── backend/
│   ├── models/
│   │   └── Member.js         # Mongoose schema
│   ├── routes/
│   │   └── members.js        # All CRUD API routes
│   ├── uploads/              # Uploaded profile images
│   ├── server.js             # Express app entry point
│   ├── .env                  # Environment variables
│   └── package.json
│
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js     # Navigation bar
│   │   │   └── Navbar.css
│   │   ├── pages/
│   │   │   ├── HomePage.js           # Landing page
│   │   │   ├── AddMemberPage.js      # Add member form
│   │   │   ├── ViewMembersPage.js    # Members list
│   │   │   ├── MemberDetailsPage.js  # Single member view
│   │   │   └── *.css                 # Page-specific styles
│   │   ├── App.js            # Router & layout
│   │   ├── App.css           # Global shared styles
│   │   ├── index.js          # React entry point
│   │   └── index.css         # CSS design system variables
│   └── package.json
│
├── .gitignore
└── README.md
```

---

## ⚙️ Installation & Setup

### Prerequisites
- Node.js v18+
- MongoDB (local) or MongoDB Atlas URI
- npm

### 1. Clone the repository
```bash
git clone https://github.com/<your-username>/JADz.git
cd JADz
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/jadzdb
```

Start the backend:
```bash
npm start
# or for development with auto-reload:
npm run dev
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
npm start
```

The app will open at **http://localhost:3000**  
The backend runs at **http://localhost:5000**

---

## 🔗 API Endpoints

### Base URL: `http://localhost:5000`

| Method | Endpoint             | Description                          |
|--------|----------------------|--------------------------------------|
| GET    | `/api/members`       | Retrieve all team members            |
| GET    | `/api/members/:id`   | Retrieve a single member by ID       |
| POST   | `/api/members`       | Add a new team member (with image)   |
| PUT    | `/api/members/:id`   | Update an existing member            |
| DELETE | `/api/members/:id`   | Delete a member                      |

### POST /api/members — Form Data Fields

| Field         | Type   | Required | Description                         |
|---------------|--------|----------|-------------------------------------|
| name          | String | ✅       | Full name of the member             |
| role          | String | ✅       | e.g. Frontend Developer             |
| email         | String | ✅       | Email address                       |
| rollNumber    | String | ✅       | University roll number              |
| year          | String | ✅       | Batch year e.g. 2024                |
| degree        | String | ❌       | e.g. B.Tech (default)               |
| aboutProject  | String | ❌       | Project description                 |
| hobbies       | String | ❌       | Comma-separated hobbies             |
| certificate   | String | ❌       | Certification(s)                    |
| internship    | String | ❌       | Internship info                     |
| aboutYourAim  | String | ❌       | Career goals                        |
| image         | File   | ❌       | Profile photo (jpg/png/webp ≤5MB)   |

---

## 🌐 Pages

| Route            | Page                 | Description                          |
|------------------|----------------------|--------------------------------------|
| `/`              | Home Page            | Landing page with team intro + stats |
| `/add`           | Add Member Page      | Form to add a new team member        |
| `/view`          | View Members Page    | Grid of all team member cards        |
| `/members/:id`   | Member Details Page  | Full profile of a single member      |

---

## 🧪 Testing API in Browser

Open your browser and navigate to:

- **All members:** `http://localhost:5000/api/members`
- **Single member:** `http://localhost:5000/api/members/<member_id>`

---

## 👥 Team JADz

| Member | Role |
|--------|------|
| J      | Developer |
| A      | Developer |
| D      | Developer |
| z      | Developer |

---

## 📝 License

This project was created for academic purposes as part of the SRM CLAT-2 assessment.
