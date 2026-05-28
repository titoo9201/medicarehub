import React, { useEffect, useState } from "react";
import DashboardLayout from "../layout/DashboardLayout";
import { patientAPI } from "../services/api";

function PatientRecords() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [history, setHistory] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchPatients = async () => {
      const res = await patientAPI.getAll();
      setPatients(res.data);
      setLoading(false);
    };
    fetchPatients();
  }, []);

  const handleViewHistory = async (patient) => {
    setSelectedPatient(patient);
    setHistoryLoading(true);
    const res = await patientAPI.getHistory(patient.patientEmail);
    setHistory(res.data);
    setHistoryLoading(false);
  };

  const filteredPatients = patients.filter(
    (p) =>
      p.patientName.toLowerCase().includes(search.toLowerCase()) ||
      p.patientEmail.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Patient Records</h1>
        <p className="text-slate-500 mt-1">
          {patients.length} patient(s) in your records
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className={`${selectedPatient ? "lg:col-span-2" : "lg:col-span-5"}`}>
          <div className="mb-4">
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
                🔍
              </span>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search patients..."
                className="w-full pl-9 pr-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            {loading ? (
              <div className="p-12 text-center text-slate-500">Loading patients...</div>
            ) : filteredPatients.length === 0 ? (
              <div className="p-12 text-center text-slate-500">
                <div className="text-4xl mb-4">👥</div>
                <p className="font-medium mb-1">No patients found</p>
                <p className="text-sm">Patients will appear here once you create prescriptions for them.</p>
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {filteredPatients.map((patient) => (
                  <div
                    key={patient.patientEmail}
                    className={`p-4 hover:bg-slate-50 transition-colors cursor-pointer ${
                      selectedPatient?.patientEmail === patient.patientEmail
                        ? "bg-blue-50 border-l-4 border-l-blue-600"
                        : ""
                    }`}
                    onClick={() => handleViewHistory(patient)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold text-sm">
                          {patient.patientName.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-medium text-slate-800 text-sm">
                            {patient.patientName}
                          </p>
                          <p className="text-xs text-slate-500">
                            {patient.patientEmail}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="inline-block text-xs font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                          {patient.prescriptionCount} Rx
                        </span>
                        <p className="text-xs text-slate-500 mt-1">
                          {new Date(patient.lastVisit).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {selectedPatient && (
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
              <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h2 className="font-semibold text-slate-800">
                    {selectedPatient.patientName}
                  </h2>
                  <p className="text-sm text-slate-500">{selectedPatient.patientEmail}</p>
                </div>
                <button
                  onClick={() => setSelectedPatient(null)}
                  className="text-slate-400 hover:text-slate-600 text-xl lg:hidden"
                >
                  ✕
                </button>
              </div>

              {historyLoading ? (
                <div className="p-12 text-center text-slate-500">
                  Loading history...
                </div>
              ) : history.length === 0 ? (
                <div className="p-12 text-center text-slate-500">
                  No prescriptions found for this patient.
                </div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {history.map((p) => (
                    <div key={p._id} className="p-5">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <span className="inline-block text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full mb-2">
                            {p.diagnosis}
                          </span>
                          <p className="text-xs text-slate-500">
                            {new Date(p.createdAt).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        {p.medicines.map((med, i) => (
                          <div
                            key={i}
                            className="flex items-center justify-between bg-slate-50 rounded-lg px-3 py-2"
                          >
                            <span className="text-sm font-medium text-slate-800">
                              {med.name}
                            </span>
                            <span className="text-xs text-slate-500">
                              {med.dosage} · {med.frequency} · {med.duration}
                            </span>
                          </div>
                        ))}
                      </div>

                      {p.notes && (
                        <p className="mt-3 text-xs text-slate-500 italic">
                          Note: {p.notes}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

export default PatientRecords;