<div align="center">
  <img src="https://img.shields.io/badge/JADz-Team_Management-blue?style=for-the-badge&logo=react" alt="JADz Logo" />
  <h1>🚀 JADz Student Team Management Platform</h1>
  <p>
    <em>A modern, full-stack application built for seamless student team collaboration and member profile management.</em>
  </p>

  <!-- Badges -->
  <p>
    <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
    <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
    <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js" />
    <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  </p>
</div>

---

## 📖 Overview

**JADz** is a beautifully crafted Full-Stack Web Application designed specifically to manage, view, and organize student team members efficiently. Born out of the 21CSS301T Full Stack Development coursework, JADz serves as a comprehensive digital directory for teams to document roles, goals, and technical skill sets—all packaged within a highly responsive and interactive user interface.

## ✨ Key Features

- **🛡️ Comprehensive Profiles:** Store detailed information including roles, university roll numbers, batch years, degrees, internships, and career goals.
- **📸 Profile Photo Uploads:** Seamlessly upload and serve member photos using `multer` and Express static file serving.
- **⚡ Dynamic Routing:** Effortlessly navigate between the team dashboard, individual profile views, and the member addition form via `react-router-dom`.
- **🎨 Modern UI/UX:** Built with a design-first approach utilizing vanilla CSS variables for a cohesive, responsive design system.
- **🔌 RESTful Architecture:** Fully functional CRUD backend interacting gracefully with a NoSQL MongoDB database.

---

## 🛠️ Technology Stack

### **Frontend**
*   **React.js** - Component-driven UI architecture.
*   **React Router v6** - Client-side routing for SPA experience.
*   **Axios** - Promise-based HTTP client.
*   **CSS3** - Custom design system using variables.

### **Backend**
*   **Node.js & Express.js** - Robust server and API routing.
*   **MongoDB & Mongoose ODM** - Flexible, document-oriented database.
*   **Multer** - Middleware for handling `multipart/form-data` (image uploads).

---

## 🚀 Getting Started

Follow these steps to get a local copy of JADz up and running on your machine.

### Prerequisites

Ensure you have the following installed:
*   [Node.js](https://nodejs.org/) (v14 or higher)
*   [MongoDB](https://www.mongodb.com/) (Local instance or MongoDB Atlas account)

### 1. Clone the Repository
```bash
git clone https://github.com/Lucix69/Full-Stack-Project-Team-Management-System-.git
cd "Full-Stack-Project-Team-Management-System-/JADz"
```

### 2. Backend Configuration
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create a .env file and add the following:
# PORT=5000
# MONGO_URI=mongodb://localhost:27017/jadzdb

# Start the development server
npm run dev
```

### 3. Frontend Configuration
Open a new terminal window:
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the React development server
npm start
```
*The application will launch in your default browser at `http://localhost:3000`.*

---

## 📡 API Endpoints

The backend provides a clean RESTful API to interact with the database. Base URL: `http://localhost:5000/api`

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/members` | Fetches all team members. |
| `GET` | `/members/:id` | Fetches details of a specific member by ID. |
| `POST` | `/members` | Adds a new member (Supports `multipart/form-data` for images). |
| `PUT` | `/members/:id` | Updates a specific member's details. |
| `DELETE` | `/members/:id` | Deletes a team member from the database. |

---

## 📂 Project Structure

```text
📦 JADz
 ┣ 📂 backend
 ┃ ┣ 📂 models         # Mongoose Database Schemas
 ┃ ┣ 📂 routes         # Express API Routes
 ┃ ┣ 📂 uploads        # Local storage for member profile pictures
 ┃ ┣ 📜 server.js      # Backend Entry Point
 ┃ ┗ 📜 package.json
 ┗ 📂 frontend
   ┣ 📂 public         # Static HTML and Assets
   ┣ 📂 src
   ┃ ┣ 📂 components   # Reusable UI Components (Navbar, etc.)
   ┃ ┣ 📂 pages        # Route components (Home, Add Member, Details)
   ┃ ┣ 📜 App.js       # Main Routing Configuration
   ┃ ┣ 📜 index.js     # React Entry Point
   ┃ ┗ 📜 index.css    # Global CSS Design System
   ┗ 📜 package.json
```

---

## 👥 The JADz Team

This application was proudly built by the JADz team for the **SRM Institute of Science and Technology** CLAT-2 Assessment.

| Role | Name |
| :--- | :--- |
| Developer | **Aditya Mukherjee RA2311056010202** |
| Developer | **Jaivardhan Kanoria RA2311056010192** |
| Developer | **Dharshan Kumar RA2310056010203** |

---

<div align="center">
  <i>If you find this project helpful or impressive, consider leaving a ⭐ on the repository!</i>
</div>
