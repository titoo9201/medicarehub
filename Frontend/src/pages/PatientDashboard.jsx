import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../layout/DashboardLayout";
import { prescriptionAPI } from "../services/api";

function PatientDashboard() {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const res = await prescriptionAPI.getAll();
      setPrescriptions(res.data);
      setLoading(false);
    };
    fetchData();
  }, []);

  const recentPrescriptions = prescriptions.slice(0, 5);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-slate-500">Loading dashboard...</div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Patient Dashboard</h1>
        <p className="text-slate-500 mt-1">View and manage your prescriptions</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500 mb-1">Total Prescriptions</p>
              <p className="text-2xl font-bold text-slate-800">
                {prescriptions.length}
              </p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center text-2xl">
              📋
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500 mb-1">Doctors Visited</p>
              <p className="text-2xl font-bold text-slate-800">
                {new Set(prescriptions.map((p) => p.doctorName)).size}
              </p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-green-50 flex items-center justify-center text-2xl">
              👨‍⚕️
            </div>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <Link
          to="/patient/prescription-history"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          <span>📋</span> View All Prescriptions
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h2 className="font-semibold text-slate-800">Recent Prescriptions</h2>
          <Link
            to="/patient/prescription-history"
            className="text-sm text-blue-600 hover:underline"
          >
            View all
          </Link>
        </div>

        {recentPrescriptions.length === 0 ? (
          <div className="p-12 text-center text-slate-500">
            <div className="text-4xl mb-4">📋</div>
            <p className="font-medium mb-1">No prescriptions found</p>
            <p className="text-sm">Your prescriptions will appear here once your doctor creates them.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                    Doctor
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                    Diagnosis
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                    Medicines
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentPrescriptions.map((p) => (
                  <tr key={p._id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-slate-800">
                      {p.doctorName}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {p.diagnosis}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {p.medicines.length} medicine(s)
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500">
                      {new Date(p.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

export default PatientDashboard;