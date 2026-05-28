import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../layout/DashboardLayout";
import { prescriptionAPI } from "../services/api";

function generatePrescriptionHTML(prescription) {
  const dateFormatted = new Date(prescription.createdAt).toLocaleDateString(
    "en-US",
    { year: "numeric", month: "long", day: "numeric" }
  );

  const medicineRows = prescription.medicines
    .map(
      (med, i) => `
      <tr>
        <td style="padding: 10px 14px; border-bottom: 1px solid #e2e8f0; font-size: 13px; color: #475569;">${i + 1}</td>
        <td style="padding: 10px 14px; border-bottom: 1px solid #e2e8f0; font-size: 13px; font-weight: 600; color: #1e293b;">${med.name}</td>
        <td style="padding: 10px 14px; border-bottom: 1px solid #e2e8f0; font-size: 13px; color: #475569;">${med.dosage}</td>
        <td style="padding: 10px 14px; border-bottom: 1px solid #e2e8f0; font-size: 13px; color: #475569;">${med.frequency}</td>
        <td style="padding: 10px 14px; border-bottom: 1px solid #e2e8f0; font-size: 13px; color: #475569;">${med.duration}</td>
      </tr>
    `
    )
    .join("");

  const notesSection = prescription.notes
    ? `
    <div style="margin-top: 24px; background: #fffbeb; border: 1px solid #fcd34d; border-radius: 8px; padding: 16px;">
      <p style="font-size: 11px; font-weight: 700; color: #92400e; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 6px 0;">
        Doctor's Notes
      </p>
      <p style="font-size: 13px; color: #78350f; margin: 0; line-height: 1.6;">${prescription.notes}</p>
    </div>
  `
    : "";

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <title>Prescription - ${prescription.patientName}</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
          background: #ffffff;
          color: #1e293b;
          padding: 0;
        }
        @media print {
          body { padding: 0; }
          @page { margin: 20mm; size: A4; }
        }
      </style>
    </head>
    <body>
      <div style="max-width: 750px; margin: 0 auto; padding: 40px 40px;">

        <div style="display: flex; justify-content: space-between; align-items: flex-start; padding-bottom: 24px; border-bottom: 3px solid #2563eb; margin-bottom: 32px;">
          <div style="display: flex; align-items: center; gap: 12px;">
            <div style="width: 44px; height: 44px; background: #2563eb; border-radius: 10px; display: flex; align-items: center; justify-content: center;">
              <span style="color: white; font-weight: 800; font-size: 22px;">M</span>
            </div>
            <div>
              <div style="font-size: 20px; font-weight: 800; color: #1e40af;">MediCare Hub</div>
              <div style="font-size: 11px; color: #64748b; margin-top: 1px;">Digital Prescription Management Platform</div>
            </div>
          </div>
          <div style="text-align: right;">
            <div style="font-size: 11px; color: #64748b; text-transform: uppercase; font-weight: 600; letter-spacing: 0.05em;">
              Prescription Date
            </div>
            <div style="font-size: 14px; font-weight: 600; color: #1e293b; margin-top: 4px;">${dateFormatted}</div>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 28px;">
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 16px;">
            <p style="font-size: 10px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 10px;">
              Patient Information
            </p>
            <div style="margin-bottom: 8px;">
              <p style="font-size: 11px; color: #94a3b8;">Full Name</p>
              <p style="font-size: 14px; font-weight: 600; color: #1e293b; margin-top: 2px;">${prescription.patientName}</p>
            </div>
            <div>
              <p style="font-size: 11px; color: #94a3b8;">Email Address</p>
              <p style="font-size: 13px; color: #475569; margin-top: 2px;">${prescription.patientEmail}</p>
            </div>
          </div>

          <div style="background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 10px; padding: 16px;">
            <p style="font-size: 10px; font-weight: 700; color: #1d4ed8; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 10px;">
              Doctor Information
            </p>
            <div style="margin-bottom: 8px;">
              <p style="font-size: 11px; color: #93c5fd;">Doctor Name</p>
              <p style="font-size: 14px; font-weight: 600; color: #1e40af; margin-top: 2px;">${prescription.doctorName}</p>
            </div>
            <div>
              <p style="font-size: 11px; color: #93c5fd;">Diagnosis</p>
              <p style="font-size: 13px; font-weight: 500; color: #1e40af; margin-top: 2px;">${prescription.diagnosis}</p>
            </div>
          </div>
        </div>

        <div style="margin-bottom: 24px;">
          <p style="font-size: 11px; font-weight: 700; color: #475569; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 12px;">
            Prescribed Medicines
          </p>
          <table style="width: 100%; border-collapse: collapse; border: 1px solid #e2e8f0; border-radius: 10px; overflow: hidden;">
            <thead>
              <tr style="background: #2563eb;">
                <th style="padding: 12px 14px; text-align: left; font-size: 11px; font-weight: 700; color: white; text-transform: uppercase; letter-spacing: 0.05em;">#</th>
                <th style="padding: 12px 14px; text-align: left; font-size: 11px; font-weight: 700; color: white; text-transform: uppercase; letter-spacing: 0.05em;">Medicine Name</th>
                <th style="padding: 12px 14px; text-align: left; font-size: 11px; font-weight: 700; color: white; text-transform: uppercase; letter-spacing: 0.05em;">Dosage</th>
                <th style="padding: 12px 14px; text-align: left; font-size: 11px; font-weight: 700; color: white; text-transform: uppercase; letter-spacing: 0.05em;">Frequency</th>
                <th style="padding: 12px 14px; text-align: left; font-size: 11px; font-weight: 700; color: white; text-transform: uppercase; letter-spacing: 0.05em;">Duration</th>
              </tr>
            </thead>
            <tbody>
              ${medicineRows}
            </tbody>
          </table>
        </div>

        ${notesSection}

        <div style="margin-top: 48px; padding-top: 20px; border-top: 1px solid #e2e8f0; display: flex; justify-content: space-between; align-items: flex-end;">
          <div>
            <p style="font-size: 11px; color: #94a3b8;">This is a digitally generated prescription.</p>
            <p style="font-size: 11px; color: #94a3b8; margin-top: 2px;">MediCare Hub &copy; ${new Date().getFullYear()}</p>
          </div>
          <div style="text-align: center;">
            <div style="width: 180px; border-top: 1px solid #1e293b; margin-bottom: 8px;"></div>
            <p style="font-size: 13px; font-weight: 700; color: #1e293b;">${prescription.doctorName}</p>
            <p style="font-size: 11px; color: #64748b; margin-top: 2px;">Authorized Physician</p>
          </div>
        </div>

      </div>
    </body>
    </html>
  `;
}

function downloadPrescriptionPDF(prescription) {
  const htmlContent = generatePrescriptionHTML(prescription);
  const printWindow = window.open("", "_blank", "width=900,height=700");

  if (!printWindow) {
    alert("Please allow popups for this website to download prescriptions.");
    return;
  }

  printWindow.document.open();
  printWindow.document.write(htmlContent);
  printWindow.document.close();

  printWindow.onload = function () {
    setTimeout(() => {
      printWindow.focus();
      printWindow.print();
    }, 500);
  };
}

function PrescriptionDetail({ prescription, onClose }) {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = () => {
    setDownloading(true);
    downloadPrescriptionPDF(prescription);
    setTimeout(() => setDownloading(false), 2000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[92vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200 flex-shrink-0">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Prescription Details
            </h2>
            <p className="text-sm text-slate-500 mt-0.5">
              {new Date(prescription.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleDownload}
              disabled={downloading}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {downloading ? (
                <>
                  <svg
                    className="w-4 h-4 animate-spin"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    />
                  </svg>
                  Preparing...
                </>
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 10v6m0 0l-3-3m3 3l3-3M3 17a4 4 0 004 4h10a4 4 0 004-4v-1M16 6l-4-4-4 4"
                    />
                  </svg>
                  Download PDF
                </>
              )}
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="overflow-y-auto flex-1 p-6 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
                Patient
              </p>
              <p className="text-sm font-bold text-slate-800">
                {prescription.patientName}
              </p>
              <p className="text-xs text-slate-500 mt-0.5">
                {prescription.patientEmail}
              </p>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <p className="text-xs font-semibold text-blue-500 uppercase tracking-wide mb-2">
                Doctor
              </p>
              <p className="text-sm font-bold text-blue-800">
                {prescription.doctorName}
              </p>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
              Diagnosis
            </p>
            <p className="text-sm font-semibold text-slate-800">
              {prescription.diagnosis}
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">
              Prescribed Medicines
            </p>
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <table className="w-full">
                <thead className="bg-blue-600">
                  <tr>
                    {["#", "Medicine", "Dosage", "Frequency", "Duration"].map(
                      (h) => (
                        <th
                          key={h}
                          className="text-left px-4 py-3 text-xs font-semibold text-white uppercase tracking-wide"
                        >
                          {h}
                        </th>
                      )
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {prescription.medicines.map((med, i) => (
                    <tr key={i} className="hover:bg-slate-50 transition-colors">
                      <td className="px-4 py-3 text-sm text-slate-400">
                        {i + 1}
                      </td>
                      <td className="px-4 py-3 text-sm font-semibold text-slate-800">
                        {med.name}
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-600">
                        {med.dosage}
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-600">
                        {med.frequency}
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-600">
                        {med.duration}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {prescription.notes && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <p className="text-xs font-semibold text-amber-600 uppercase tracking-wide mb-2">
                Doctor's Notes
              </p>
              <p className="text-sm text-amber-800 leading-relaxed">
                {prescription.notes}
              </p>
            </div>
          )}
        </div>

        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex-shrink-0">
          <p className="text-xs text-slate-400 text-center">
            Click "Download PDF" to save or print this prescription
          </p>
        </div>
      </div>
    </div>
  );
}

function PrescriptionHistory() {
  const [prescriptions, setPrescriptions] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const fetchPrescriptions = async (q = "") => {
    setLoading(true);
    const res = await prescriptionAPI.getAll(q);
    setPrescriptions(res.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchPrescriptions();
  }, []);

  const handleSearch = (e) => {
    const val = e.target.value;
    setSearch(val);
    fetchPrescriptions(val);
  };

  const handleDelete = async () => {
    setDeleteLoading(true);
    await prescriptionAPI.delete(deleteId);
    setDeleteId(null);
    setDeleteLoading(false);
    fetchPrescriptions(search);
  };

  return (
    <DashboardLayout>
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              {user?.role === "doctor" ? "All Prescriptions" : "My Prescriptions"}
            </h1>
            <p className="text-slate-500 mt-1 text-sm">
              {prescriptions.length} prescription(s) found
            </p>
          </div>
          {user?.role === "doctor" && (
            <Link
              to="/doctor/create-prescription"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4v16m8-8H4"
                />
              </svg>
              New Prescription
            </Link>
          )}
        </div>
      </div>

      <div className="mb-5">
        <div className="relative max-w-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
            />
          </svg>
          <input
            type="text"
            value={search}
            onChange={handleSearch}
            placeholder={
              user?.role === "doctor"
                ? "Search by patient name, diagnosis..."
                : "Search by diagnosis, doctor name..."
            }
            className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-16 text-center">
            <div className="inline-flex items-center gap-3 text-slate-500">
              <svg
                className="w-5 h-5 animate-spin text-blue-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                />
              </svg>
              Loading prescriptions...
            </div>
          </div>
        ) : prescriptions.length === 0 ? (
          <div className="p-16 text-center text-slate-500">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
              📋
            </div>
            <p className="font-semibold text-slate-700 mb-1">
              No prescriptions found
            </p>
            <p className="text-sm">
              {search
                ? "Try a different search term."
                : user?.role === "doctor"
                ? "Create your first prescription to get started."
                : "Your prescriptions will appear here once your doctor creates them."}
            </p>
            {user?.role === "doctor" && !search && (
              <Link
                to="/doctor/create-prescription"
                className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                Create Prescription
              </Link>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                    {user?.role === "doctor" ? "Patient" : "Doctor"}
                  </th>
                  <th className="text-left px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                    Diagnosis
                  </th>
                  <th className="text-left px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                    Medicines
                  </th>
                  <th className="text-left px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                    Date
                  </th>
                  <th className="text-left px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {prescriptions.map((p) => (
                  <tr
                    key={p._id}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="font-semibold text-slate-800 text-sm">
                        {user?.role === "doctor" ? p.patientName : p.doctorName}
                      </div>
                      {user?.role === "doctor" && (
                        <div className="text-xs text-slate-400 mt-0.5">
                          {p.patientEmail}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-block text-xs font-medium text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full">
                        {p.diagnosis}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {p.medicines.length} medicine(s)
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500">
                      {new Date(p.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setSelected(p)}
                          className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors font-medium"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-3 h-3"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          </svg>
                          View
                        </button>
                        {user?.role === "doctor" && (
                          <>
                            <Link
                              to={`/doctor/edit-prescription/${p._id}`}
                              className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors font-medium"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-3 h-3"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                />
                              </svg>
                              Edit
                            </Link>
                            <button
                              onClick={() => setDeleteId(p._id)}
                              className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors font-medium"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-3 h-3"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                              </svg>
                              Delete
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {selected && (
        <PrescriptionDetail
          prescription={selected}
          onClose={() => setSelected(null)}
        />
      )}

      {deleteId && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v2m0 4h.01M10.293 3.293a1 1 0 011.414 0l7 7a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7a1 1 0 010-1.414l7-7z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-slate-900 text-center mb-2">
              Delete Prescription
            </h3>
            <p className="text-sm text-slate-500 text-center mb-6">
              Are you sure you want to delete this prescription? This action
              cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteId(null)}
                disabled={deleteLoading}
                className="flex-1 py-2.5 border border-slate-300 text-slate-700 font-semibold text-sm rounded-lg hover:bg-slate-50 transition-colors disabled:opacity-60"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleteLoading}
                className="flex-1 py-2.5 bg-red-600 text-white font-semibold text-sm rounded-lg hover:bg-red-700 transition-colors disabled:opacity-60"
              >
                {deleteLoading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}

export default PrescriptionHistory;