const express = require("express");
const router = express.Router();
const { getPatients, getPatientHistory } = require("../controllers/patientController");
const { protect, doctorOnly } = require("../middleware/auth");

router.get("/", protect, doctorOnly, getPatients);
router.get("/:email/history", protect, doctorOnly, getPatientHistory);

module.exports = router;