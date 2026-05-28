const User = require("../model/User");
const Prescription = require("../model/Prescription");

const getPatients = async (req, res) => {
  const prescriptions = await Prescription.find({ doctorId: req.user._id });

  const patientMap = {};
  prescriptions.forEach((p) => {
    if (!patientMap[p.patientEmail]) {
      patientMap[p.patientEmail] = {
        patientName: p.patientName,
        patientEmail: p.patientEmail,
        prescriptionCount: 0,
        lastVisit: p.createdAt,
      };
    }
    patientMap[p.patientEmail].prescriptionCount += 1;
    if (p.createdAt > patientMap[p.patientEmail].lastVisit) {
      patientMap[p.patientEmail].lastVisit = p.createdAt;
    }
  });

  const patients = Object.values(patientMap);
  res.json(patients);
};

const getPatientHistory = async (req, res) => {
  const { email } = req.params;

  const prescriptions = await Prescription.find({
    doctorId: req.user._id,
    patientEmail: email,
  }).sort({ createdAt: -1 });

  res.json(prescriptions);
};

module.exports = { getPatients, getPatientHistory };