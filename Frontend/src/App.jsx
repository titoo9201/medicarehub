import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import DoctorDashboard from "./pages/DoctorDashboard";
import PatientDashboard from "./pages/PatientDashboard";
import CreatePrescription from "./pages/CreatePrescription";
import EditPrescription from "./pages/EditPrescription";
import PrescriptionHistory from "./pages/PrescriptionHistory";
import PatientRecords from "./pages/PatientRecords";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        <Route
          path="/doctor/dashboard"
          element={
            <ProtectedRoute role="doctor">
              <DoctorDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/doctor/create-prescription"
          element={
            <ProtectedRoute role="doctor">
              <CreatePrescription />
            </ProtectedRoute>
          }
        />
        <Route
          path="/doctor/edit-prescription/:id"
          element={
            <ProtectedRoute role="doctor">
              <EditPrescription />
            </ProtectedRoute>
          }
        />
        <Route
          path="/doctor/prescription-history"
          element={
            <ProtectedRoute role="doctor">
              <PrescriptionHistory />
            </ProtectedRoute>
          }
        />
        <Route
          path="/doctor/patient-records"
          element={
            <ProtectedRoute role="doctor">
              <PatientRecords />
            </ProtectedRoute>
          }
        />

        <Route
          path="/patient/dashboard"
          element={
            <ProtectedRoute role="patient">
              <PatientDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/patient/prescription-history"
          element={
            <ProtectedRoute role="patient">
              <PrescriptionHistory />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;