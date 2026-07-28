# 🎓 TTU Industrial Attachment System (TTU-IAS)

A comprehensive web-based Industrial Attachment Management System developed for **Takoradi Technical University (TTU)** to automate and streamline the internship process for students, academic supervisors, industry supervisors, companies, liaison officers, and administrators.

The system replaces manual paper-based processes with a secure digital platform that manages the entire internship lifecycle—from placement requests to assessments and result publication.

---

## 📖 Overview

The TTU Industrial Attachment System enables all stakeholders involved in industrial attachment to manage internship activities efficiently through a centralized web application.

Students can submit placement requests, weekly logbooks, monthly reports, and final reports. Supervisors can monitor student progress, review reports, certify logbooks, complete assessments, and publish results. Administrators and liaison officers manage users, placements, and internship activities through dedicated dashboards.

---

## ✨ Key Features

### 👨‍🎓 Student Portal

- Secure login
- Internship dashboard
- Placement request submission
- Weekly logbook submission
- Monthly report submission
- Final report submission
- View supervisor feedback
- View assessment results
- Internship journey tracker

---

### 🏢 Company Portal

- Company dashboard
- Assign Industry Supervisors
- Manage assigned students
- Monitor internship activities

---

### 👨‍🏫 Academic Supervisor Portal

- View assigned students
- Review reports
- Review logbooks
- Complete assessments
- View assessment results

---

### 🏭 Industry Supervisor Portal

- View assigned students
- Review reports
- Certify weekly logbooks
- Complete assessments
- View assessment results

---

### 🤝 Liaison Officer Portal

- Review placement requests
- Approve placement requests
- Reject placement requests
- Monitor placements
- View internship results

---

### 👨‍💼 Administrator Portal

- User Management
- Company Management
- Supervisor Management
- Student Management
- Internship Monitoring
- System Administration

---

## 🔐 User Roles

The system supports six user roles:

- Administrator
- Liaison Officer
- Student
- Company
- Academic Supervisor
- Industry Supervisor

Each role has dedicated dashboards and permissions based on Role-Based Access Control (RBAC).

---

## 🛠 Technologies Used

| Category | Technology |
|----------|------------|
| Frontend | Next.js 16 |
| Backend | Next.js App Router |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Database | PostgreSQL |
| ORM | Prisma |
| Authentication | NextAuth.js |
| Notifications | Sonner |
| Deployment | Vercel |
| Database Hosting | Neon |

---

## 🏗 System Modules

- Authentication Module
- Student Module
- Company Module
- Academic Supervisor Module
- Industry Supervisor Module
- Liaison Module
- Administrator Module
- Placement Management
- Logbook Management
- Report Management
- Assessment Management
- Results Management

---

## 📂 Project Structure

```
TTU-IAS/
│
├── app/
├── components/
├── lib/
├── prisma/
├── public/
├── docs/
│
├── README.md
├── package.json
├── tsconfig.json
└── next.config.ts
```

---

## ⚙ Installation

Clone the repository

```bash
git clone https://github.com/yourusername/ttu-ias.git
```

Install dependencies

```bash
npm install
```

Configure environment variables

```env
DATABASE_URL=
DIRECT_URL=
NEXTAUTH_SECRET=
NEXTAUTH_URL=
```

Run Prisma migrations

```bash
npx prisma migrate deploy
```

Start development server

```bash
npm run dev
```

Open

```
http://localhost:3000
```

---

## 🚀 Deployment

The system is deployed using:

- **Vercel** (Application Hosting)
- **Neon PostgreSQL** (Database Hosting)

---

## 🧪 Testing

The system has successfully undergone:

- Functional Testing
- End-to-End Testing
- Mobile Responsiveness Testing
- User Acceptance Testing
- Role-Based Access Testing

---

## 🔮 Future Improvements

Future enhancements may include:

- Email Notifications
- SMS Notifications
- File Upload Support
- Attendance Tracking
- Analytics Dashboard
- Mobile Application
- AI-assisted Report Review

---

## 👨‍💻 Developer

Developed as a Final Year Project for

**Takoradi Technical University**

Bachelor of Technology

Department of Computer Science / Information Technology

---

## 📜 License

This project was developed for academic purposes as part of a final-year undergraduate project.

© 2026 TTU Industrial Attachment System