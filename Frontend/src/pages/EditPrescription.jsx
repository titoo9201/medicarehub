import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DashboardLayout from "../layout/DashboardLayout";
import { prescriptionAPI } from "../services/api";

const emptyMedicine = { name: "", dosage: "", frequency: "", duration: "" };

function EditPrescription() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [form, setForm] = useState({
    patientName: "",
    patientEmail: "",
    diagnosis: "",
    notes: "",
    medicines: [{ ...emptyMedicine }],
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const fetchPrescription = async () => {
      const res = await prescriptionAPI.getById(id);
      const data = res.data;
      setForm({
        patientName: data.patientName,
        patientEmail: data.patientEmail,
        diagnosis: data.diagnosis,
        notes: data.notes || "",
        medicines: data.medicines,
      });
      setFetching(false);
    };
    fetchPrescription();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleMedicineChange = (index, e) => {
    const updated = [...form.medicines];
    updated[index][e.target.name] = e.target.value;
    setForm({ ...form, medicines: updated });
  };

  const addMedicine = () => {
    setForm({ ...form, medicines: [...form.medicines, { ...emptyMedicine }] });
  };

  const removeMedicine = (index) => {
    if (form.medicines.length === 1) return;
    const updated = form.medicines.filter((_, i) => i !== index);
    setForm({ ...form, medicines: updated });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    await prescriptionAPI.update(id, form);
    navigate("/doctor/prescription-history");
    setLoading(false);
  };

  if (fetching) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-slate-500">Loading prescription...</div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Edit Prescription</h1>
        <p className="text-slate-500 mt-1">Update the prescription details</p>
      </div>

      <div className="max-w-3xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
              {error}
            </div>
          )}

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <h2 className="font-semibold text-slate-800 mb-4">Patient Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Patient Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="patientName"
                  value={form.patientName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Patient Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="patientEmail"
                  value={form.patientEmail}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <h2 className="font-semibold text-slate-800 mb-4">Medical Details</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Diagnosis <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="diagnosis"
                  value={form.diagnosis}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Notes
                </label>
                <textarea
                  name="notes"
                  value={form.notes}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none"
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-slate-800">Medicines</h2>
              <button
                type="button"
                onClick={addMedicine}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                + Add Medicine
              </button>
            </div>

            <div className="space-y-4">
              {form.medicines.map((med, index) => (
                <div
                  key={index}
                  className="border border-slate-200 rounded-lg p-4 bg-slate-50"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-slate-600">
                      Medicine #{index + 1}
                    </span>
                    {form.medicines.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeMedicine(index)}
                        className="text-sm text-red-500 hover:text-red-700"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1">
                        Medicine Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={med.name}
                        onChange={(e) => handleMedicineChange(index, e)}
                        required
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1">
                        Dosage
                      </label>
                      <input
                        type="text"
                        name="dosage"
                        value={med.dosage}
                        onChange={(e) => handleMedicineChange(index, e)}
                        required
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1">
                        Frequency
                      </label>
                      <input
                        type="text"
                        name="frequency"
                        value={med.frequency}
                        onChange={(e) => handleMedicineChange(index, e)}
                        required
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1">
                        Duration
                      </label>
                      <input
                        type="text"
                        name="duration"
                        value={med.duration}
                        onChange={(e) => handleMedicineChange(index, e)}
                        required
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 bg-blue-600 text-white font-semibold text-sm rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-60"
            >
              {loading ? "Updating..." : "Update Prescription"}
            </button>
            <button
              type="button"
              onClick={() => navigate("/doctor/prescription-history")}
              className="px-6 py-2.5 border border-slate-300 text-slate-700 font-medium text-sm rounded-lg hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}

export default EditPrescription;