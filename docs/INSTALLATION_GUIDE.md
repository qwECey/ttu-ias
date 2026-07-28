# Installation Guide

## TTU Industrial Attachment System (TTU-IAS)

---

## 1. Introduction

This guide explains how to install, configure, and run the TTU Industrial Attachment System (TTU-IAS) on a local development machine or deploy it to a production environment.

---

# 2. System Requirements

Before installing the system, ensure your computer has the following software installed.

| Software | Recommended Version |
|-----------|---------------------|
| Node.js | 20.x or later |
| npm | Latest |
| PostgreSQL | 15 or later |
| Git | Latest |
| Visual Studio Code | Latest |

---

# 3. Clone the Repository

Open a terminal and run:

```bash
git clone https://github.com/YOUR_USERNAME/ttu-ias.git
```

Move into the project folder.

```bash
cd ttu-ias
```

---

# 4. Install Dependencies

Install all required packages.

```bash
npm install
```

---

# 5. Configure Environment Variables

Create a `.env` file in the project root.

Add the following variables:

```env
DATABASE_URL=

DIRECT_URL=

NEXTAUTH_SECRET=

NEXTAUTH_URL=http://localhost:3000
```

Replace the values with your own database connection and authentication settings.

---

# 6. Configure the Database

Run Prisma migrations.

```bash
npx prisma migrate deploy
```

If developing locally, you may also use:

```bash
npx prisma migrate dev
```

---

# 7. Seed the Database (Optional)

Populate the database with default users and sample data.

```bash
npx prisma db seed
```

---

# 8. Start the Development Server

Run:

```bash
npm run dev
```

The application will be available at:

```
http://localhost:3000
```

---

# 9. Build for Production

To generate an optimized production build:

```bash
npm run build
```

If the build completes successfully, start the production server:

```bash
npm start
```

---

# 10. Deployment

The TTU Industrial Attachment System is designed to be deployed using:

- Vercel (Application Hosting)
- Neon PostgreSQL (Database Hosting)

Ensure all production environment variables are configured before deployment.

---

# 11. Troubleshooting

## Dependencies fail to install

Run:

```bash
npm install
```

again.

---

## Prisma client not generated

Run:

```bash
npx prisma generate
```

---

## Database connection error

Verify:

- DATABASE_URL
- DIRECT_URL
- PostgreSQL server is running

---

## Build fails

Run:

```bash
npm run build
```

Review the error messages and resolve any missing dependencies or TypeScript errors before deployment.

---

# 12. Support

For technical issues regarding installation or deployment, contact the project development team.

---

© 2026 TTU Industrial Attachment System