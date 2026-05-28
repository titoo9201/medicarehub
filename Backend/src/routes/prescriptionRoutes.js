const express = require("express");
const router = express.Router();
const {
  createPrescription,
  getPrescriptions,
  getPrescriptionById,
  updatePrescription,
  deletePrescription,
} = require("../controllers/prescriptionController");
const { protect, doctorOnly } = require("../middleware/auth");

router.post("/", protect, doctorOnly, createPrescription);
router.get("/", protect, getPrescriptions);
router.get("/:id", protect, getPrescriptionById);
router.put("/:id", protect, doctorOnly, updatePrescription);
router.delete("/:id", protect, doctorOnly, deletePrescription);

module.exports = router;