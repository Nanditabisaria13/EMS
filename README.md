<div align="center">

#  E.M.S. -  Employee Management System

An Employee Management System built with the MERN stack (MongoDB, Express, React, Node.js).
This application provides role-based dashboards for Admins and Employees with powerful features like task management, leave requests, real-time updates, and department management.

![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

</div>

---

# ✨ Features

🔐 **Authentication & Role-Based Access**

- Secure login & registration using JWT and bcrypt.

- Role-based access control for Admins and Employees.

🛠 **Admin Dashboard**

- Employee Management: Add, update, delete employee records.

- Task Management: Assign, update, delete tasks; mark tasks as completed/failed.

- Leave Approval: Review and approve/reject employee leave requests.

👩‍💻 **Employee Dashboard**

- Task Management: View assigned tasks, accept tasks, and mark them as completed/failed.

- Leave Requests: Submit leave applications and track request status.

🏢 **Department Management**

- Admins can add/remove departments to organize employees & tasks efficiently.

🎨 **Dark & Light Mode**

- Toggle between dark and light modes for a personalized interface.

🖼 **Image Upload (Multer + Cloudinary)**

- Profile image upload via Multer (backend file handling).

- Images stored and served from Cloudinary.

⚡ **Real-Time Updates**

- Both Admins and Employees get live updates on task progress and leave approvals.

# ⚙️ Installation & Setup

## 🔧 Prerequisites
- Node.js (v18+ recommended)
- npm (comes with Node.js)
- MongoDB (local or Atlas)

## 1. Clone the Repository
```bash 
git clone https://github.com/Nanditabisaria13/EMS.git
cd EMS
```

## 2. Backend Setup
```bash
cd EMS-backend
npm install

# Create a .env file in the EMS-backend folder with:

PORT=4000
MONGO_URI=your_mongo_db_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```
## 3. Frontend Setup (Vite + React)
```bash
cd EMS-frontend
npm install

# Create a .env file inside EMS-frontend folder with:
VITE_BACKEND_URL= http://localhost:3000
```
## Run the Application
```bash
# Run backend
npm run server

# Run frontend
npm run dev

```
# Access the Application

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:4000`

# Project Structure
```bash
EMS/
│── EMS-backend/       # Express.js API      
│   ├── config/        # Configuration files (DB, Cloudinary, etc.)
│   ├── models/        # MongoDB models
│   ├── routes/        # API routes
│   ├── controllers/   # Api Controller 
│   └── middleware/    # Auth & RBAC
│
│── EMS-frontend/          # React.js (Vite)
│   └── src/
│       ├── assets/    # Images, icons, and static files
│       ├── components/ # Reusable UI components
│       ├── context/   # Global state management (e.g., AdminContext, EmployeeContext)
│       └── pages/     # Page components (Admin, Employee, Common, etc.)
│
│
│── screenshots/     # Project screenshots (used in README)
│
└── README.md

```
# 📸 Screenshots  

### Home Page in Dark And Light Mode
<p align="center">
  <img src="Screenshots/HomePageDarkMode.png" alt="Dark Mode" width="45%"/>
  <img src="Screenshots/HomePageLightMode.png" alt="Light Mode" width="45%"/>
</p>  

###  Authentication Pages

<p align="center">
  <img src="Screenshots/SignUpPage.png" alt="SingUp Page" width="45%"/>
  <img src="Screenshots/LoginPage.png" alt="Login Page" width="45%"/>
</p>  

### Admin Dashboard in Light and Dark Mode
<p align="center">
  <img src="Screenshots/AdminDashboardLightMode.png" alt="Admin Dashboard" width="45%"/>
  <img src="Screenshots/AdminDashboardDarkMode.png" alt="Admin Dashboard" width="45%"/>
</p>  

### Admin Employees Section
<p align="center">
  <img src="Screenshots/EmployeeList.png" alt="Employee List" width="30%"/>
  <img src="Screenshots/AddEmployee.png" alt="Add Employee" width="30%"/>
  <img src="Screenshots/Admin-Employee.png" alt="Employee-profile" width="30%"/>
</p>  

### Admin Task Board Section
<p align="center">
  <img src="Screenshots/CreateTask.png" alt="Create Task" width="45%"/>
  <img src="Screenshots/AdminTaskBoard.png" alt="Task Board" width="45%"/>
</p>  

### Admin Department and Leave Stats Section
<p align="center">
  <img src="Screenshots/Department.png" alt="Department Section" width="45%"/>
  <img src="Screenshots/AdminLeaveStats.png" alt="Leave Stats" width="45%"/>
</p>  

###  Employee Dashboard  in Dark and Light Mode
<p align="center">
  <img src="Screenshots/EmployeeDashboardDarkMode.png" alt="Employee Dashboard" width="45%"/>
  <img src="Screenshots/EmployeeDashboardLightMode.png" alt="Employee Dashboard" width="45%"/>
</p>  

### Employee Task Board and Leave Stats Section
<p align="center">
  <img src="Screenshots/EmployeeTaskBoard.png" alt="Task Board" width="30%"/>
  <img src="Screenshots/EmployeeLeaveStats.png" alt="Leave Stats" width="30%"/>
  <img src="Screenshots/ApplyLeave.png" alt="Apply Leave" width="30%"/>
</p>  

### Admin and Employee Profile 
<p align="center">
  <img src="Screenshots/AdminProfile.png" alt="Admin Profile" width="45%"/>
  <img src="Screenshots/EmployeeProfile.png" alt="Employee Profile" width="45%"/>
</p>  

# 💻 Tech Stack

- **Frontend** : React.js, TailwindCSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (NoSQL)
- **Authentication**: JWT (JSON Web Tokens), bcrypt
- **File Uploads**: Multer + Cloudinary
- **Styling**: TailwindCSS (responsive + modern UI)

# 🤝 Contributing

Pull requests are welcome! Feel free to fork this repo and submit improvements.