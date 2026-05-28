const Prescription = require("../model/Prescription");

const createPrescription = async (req, res) => {
  const { patientName, patientEmail, diagnosis, medicines, notes } = req.body;

  if (!patientName || !patientEmail || !diagnosis || !medicines) {
    return res.status(400).json({ message: "All required fields must be filled" });
  }

  const prescription = await Prescription.create({
    patientName,
    patientEmail,
    doctorName: req.user.name,
    doctorId: req.user._id,
    diagnosis,
    medicines,
    notes,
  });

  res.status(201).json(prescription);
};

const getPrescriptions = async (req, res) => {
  const { search } = req.query;
  let query = {};

  if (req.user.role === "doctor") {
    query.doctorId = req.user._id;
  } else {
    query.patientEmail = req.user.email;
  }

  if (search) {
    const searchRegex = { $regex: search, $options: "i" };
    if (req.user.role === "doctor") {
      query.$or = [
        { patientName: searchRegex },
        { diagnosis: searchRegex },
        { patientEmail: searchRegex },
      ];
      query.doctorId = req.user._id;
    } else {
      query.$or = [
        { diagnosis: searchRegex },
        { doctorName: searchRegex },
      ];
      query.patientEmail = req.user.email;
    }
  }

  const prescriptions = await Prescription.find(query).sort({ createdAt: -1 });
  res.json(prescriptions);
};

const getPrescriptionById = async (req, res) => {
  const prescription = await Prescription.findById(req.params.id);

  if (!prescription) {
    return res.status(404).json({ message: "Prescription not found" });
  }

  if (
    req.user.role === "doctor" &&
    prescription.doctorId.toString() !== req.user._id.toString()
  ) {
    return res.status(403).json({ message: "Access denied" });
  }

  if (
    req.user.role === "patient" &&
    prescription.patientEmail !== req.user.email
  ) {
    return res.status(403).json({ message: "Access denied" });
  }

  res.json(prescription);
};

const updatePrescription = async (req, res) => {
  const prescription = await Prescription.findById(req.params.id);

  if (!prescription) {
    return res.status(404).json({ message: "Prescription not found" });
  }

  if (prescription.doctorId.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "Access denied" });
  }

  const updated = await Prescription.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(updated);
};

const deletePrescription = async (req, res) => {
  const prescription = await Prescription.findById(req.params.id);

  if (!prescription) {
    return res.status(404).json({ message: "Prescription not found" });
  }

  if (prescription.doctorId.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "Access denied" });
  }

  await Prescription.findByIdAndDelete(req.params.id);
  res.json({ message: "Prescription deleted successfully" });
};

module.exports = {
  createPrescription,
  getPrescriptions,
  getPrescriptionById,
  updatePrescription,
  deletePrescription,
};