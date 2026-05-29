# MediCare Hub

> A digital prescription management platform for doctors and patients, built with React, Vite, Express, and MongoDB.

MediCare Hub streamlines prescription handling by letting doctors create, update, search, and delete prescriptions while giving patients secure access to their own medical history. The platform uses role-based authentication, a clean responsive dashboard UI, and a browser-based prescription download flow for a practical clinic workflow.

## ✨ Features

- Role-based authentication for `doctor` and `patient` accounts.
- Secure JWT login and registration flow.
- Doctor dashboard with prescription and patient summaries.
- Patient dashboard with personal prescription history.
- Create, edit, view, search, and delete prescriptions.
- Patient record aggregation for doctors.
- Prescription detail modal with browser print-based PDF download.
- Responsive landing page, auth screens, and dashboard sidebar navigation.

## 🛠 Tech Stack

### Frontend

- React 19
- Vite
- React Router DOM
- Axios
- Tailwind CSS 4

### Backend

- Node.js
- Express 5
- MongoDB with Mongoose
- JSON Web Tokens
- bcryptjs
- CORS

### Storage and Auth

- MongoDB Atlas or any MongoDB instance
- JWT stored in localStorage on the client
- Bearer token auth sent through Axios interceptors



### Core Workflow

- New user registers as a doctor or patient.
- Backend creates a hashed password record and returns a JWT.
- Frontend stores the user object in `localStorage`.
- Protected routes use the stored token and role to guard access.
- Doctors manage prescriptions and patient records.
- Patients view their own prescriptions and open prescription details.

## 📁 Folder Structure

```text
MediCareHub/
├── Backend/
│   ├── server.js
│   └── src/
│       ├── app.js
│       ├── config/
│       │   ├── database.js
│       │   └── jwt.js
│       ├── controllers/
│       │   ├── authController.js
│       │   ├── patientController.js
│       │   └── prescriptionController.js
│       ├── middleware/
│       │   └── auth.js
│       ├── model/
│       │   ├── User.js
│       │   └── Prescription.js
│       └── routes/
│           ├── authRoutes.js
│           ├── patientRoutes.js
│           └── prescriptionRoutes.js
├── Frontend/
│   ├── index.html
│   ├── vite.config.js
│   ├── eslint.config.js
│   └── src/
│       ├── App.jsx
│       ├── main.jsx
│       ├── index.css
│       ├── components/
│       │   ├── Navbar.jsx
│       │   └── Footer.jsx
│       ├── layout/
│       │   └── DashboardLayout.jsx
│       ├── pages/
│       │   ├── HomePage.jsx
│       │   ├── LoginPage.jsx
│       │   ├── SignupPage.jsx
│       │   ├── DoctorDashboard.jsx
│       │   ├── PatientDashboard.jsx
│       │   ├── CreatePrescription.jsx
│       │   ├── EditPrescription.jsx
│       │   ├── PrescriptionHistory.jsx
│       │   └── PatientRecords.jsx
│       ├── routes/
│       │   └── ProtectedRoute.jsx
│       └── services/
│           └── api.js
└── Readme.md
```

## 🚀 Installation and Setup

### Prerequisites

- Node.js 18+ recommended
- npm
- MongoDB database access

### 1) Clone the repository

```bash
git clone <repository-url>
cd MediCareHub
```

### 2) Set up the backend

```bash
cd Backend
npm install
```

Create a `.env` file inside `Backend/`:

```env
PORT=3000
FRONTEND_URL=http://localhost:5173
MONGO_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-jwt-secret>
JWT_EXPIRE=7d
```

Start the backend:

```bash
npm run dev
```

### 3) Set up the frontend

```bash
cd ../Frontend
npm install
```

Create a `.env` file inside `Frontend/`:

```env
VITE_API_URL=http://localhost:3000/api
```

Start the frontend:

```bash
npm run dev
```

## 🔐 Environment Variables

### Backend

| Variable | Required | Description |
| --- | --- | --- |
| `PORT` | Yes | Server port used by Express. |
| `FRONTEND_URL` | Yes | Allowed CORS origin for the React app. |
| `MONGO_URI` | Yes | MongoDB connection string. |
| `JWT_SECRET` | Yes | Secret used to sign and verify JWT tokens. |
| `JWT_EXPIRE` | Yes | JWT expiration duration, for example `7d`. |

### Frontend

| Variable | Required | Description |
| --- | --- | --- |
| `VITE_API_URL` | Yes | Base URL for the backend API, for example `http://localhost:3000/api`. |

## 🧩 API Endpoints

| Method | Endpoint | Access | Description |
| --- | --- | --- | --- |
| `POST` | `/api/auth/register` | Public | Register a new doctor or patient. |
| `POST` | `/api/auth/login` | Public | Login and receive a JWT token. |
| `GET` | `/api/auth/profile` | Protected | Get the authenticated user profile. |
| `GET` | `/api/prescriptions` | Protected | List prescriptions for the current user. Supports `?search=`. |
| `POST` | `/api/prescriptions` | Doctor only | Create a new prescription. |
| `GET` | `/api/prescriptions/:id` | Protected | Get a single prescription by ID. |
| `PUT` | `/api/prescriptions/:id` | Doctor only | Update a prescription. |
| `DELETE` | `/api/prescriptions/:id` | Doctor only | Delete a prescription. |
| `GET` | `/api/patients` | Doctor only | Get aggregated patient records. |
| `GET` | `/api/patients/:email/history` | Doctor only | Get prescription history for a patient. |

## 🧠 Data Models

### User

- `name`
- `email`
- `password`
- `role` (`doctor` or `patient`)
- timestamps

Passwords are hashed with `bcryptjs` before saving.

### Prescription

- `patientName`
- `patientEmail`
- `doctorName`
- `doctorId`
- `diagnosis`
- `medicines[]` with `name`, `dosage`, `frequency`, `duration`
- `notes`
- timestamps

## 🔑 Authentication Flow

1. A user registers or logs in through the frontend forms.
2. The backend validates the request and returns a JWT plus user profile data.
3. The frontend stores the returned user object in `localStorage` under `user`.
4. Axios automatically attaches the token as `Authorization: Bearer <token>`.
5. Backend `protect` middleware verifies the token and loads the user.
6. `doctorOnly` middleware blocks doctor-only endpoints for patients.
7. `ProtectedRoute` redirects unauthenticated users or wrong roles back to login.

## 🎨 UI Design Patterns

- Tailwind-based clean blue and slate visual system.
- Hero landing page with cards and section anchors.
- Sticky top navigation on the public site.
- Responsive dashboard sidebar for authenticated views.
- Table-driven management screens for prescriptions and records.
- Modal overlays for prescription details and delete confirmation.
- Print-friendly prescription preview styled for browser download/printing.

## 🧭 Usage

### For Doctors

- Sign up or log in as a doctor.
- Open the doctor dashboard to see prescription and patient summaries.
- Create prescriptions from the dedicated form.
- Search, edit, or delete prior prescriptions.
- Open patient records to review prescription history by patient.

### For Patients

- Sign up or log in as a patient.
- View your dashboard for a summary of your prescriptions.
- Open prescription history to inspect details.
- Use the download action to print or save a prescription copy.

## 📜 Scripts

### Backend

| Script | Command | Description |
| --- | --- | --- |
| `dev` | `npm run dev` | Starts the backend with Nodemon. |
| `test` | `npm test` | Placeholder script. No automated backend tests are defined yet. |

### Frontend

| Script | Command | Description |
| --- | --- | --- |
| `dev` | `npm run dev` | Starts the Vite development server. |
| `build` | `npm run build` | Builds the frontend for production. |
| `lint` | `npm run lint` | Runs ESLint checks. |
| `preview` | `npm run preview` | Previews the production build locally. |

## 🖼 Screenshots
![image alt](https://github.com/titoo9201/medicarehub/blob/bbfe73c471c607db784685252ee5f896d0e99176/Screenshot%202026-05-29%20003309.png)

![image alt](https://github.com/titoo9201/medicarehub/blob/bbfe73c471c607db784685252ee5f896d0e99176/Screenshot%202026-05-29%20003413.png)

![image alt](https://github.com/titoo9201/medicarehub/blob/ab0101979e4816a598042fd20cae2b7fddca8a10/Screenshot%202026-05-29%20003443.png)

![image alt](https://github.com/titoo9201/medicarehub/blob/ab0101979e4816a598042fd20cae2b7fddca8a10/Screenshot%202026-05-29%20003504.png)

![image alt](https://github.com/titoo9201/medicarehub/blob/ab0101979e4816a598042fd20cae2b7fddca8a10/Screenshot%202026-05-29%20003515.png)

![image alt](https://github.com/titoo9201/medicarehub/blob/ab0101979e4816a598042fd20cae2b7fddca8a10/Screenshot%202026-05-29%20003620.png)

![image alt](https://github.com/titoo9201/medicarehub/blob/ab0101979e4816a598042fd20cae2b7fddca8a10/Screenshot%202026-05-29%20003637.png)

![image alt](https://github.com/titoo9201/medicarehub/blob/ab0101979e4816a598042fd20cae2b7fddca8a10/Screenshot%202026-05-29%20003652.png)

![image alt](https://github.com/titoo9201/medicarehub/blob/ab0101979e4816a598042fd20cae2b7fddca8a10/Screenshot%202026-05-29%20003701.png)

![image alt](https://github.com/titoo9201/medicarehub/blob/ab0101979e4816a598042fd20cae2b7fddca8a10/Screenshot%202026-05-29%20003733.png)

![image alt](https://github.com/titoo9201/medicarehub/blob/ab0101979e4816a598042fd20cae2b7fddca8a10/Screenshot%202026-05-29%20003745.png)


## 🌐 Live Demo

Live demo link: https://medicarehub-app.onrender.com/



## 🤝 Contributing

1. Fork the repository.
2. Create a feature branch.
3. Make your changes and verify them locally.
4. Open a pull request with a clear description of the update.

Please keep changes focused, follow the existing code style, and avoid exposing secrets in commits or screenshots.

## 📄 License

This project is licensed under the ISC License.

## 👤 Author

**Titoo Singh**

