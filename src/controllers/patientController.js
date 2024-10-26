const Patient = require('../models/Patient');
const { UserType } = require('../common/enum');

// Create a new patient record
exports.createPatient = async (req, res) => {
  try {
    const patient = new Patient({ ...req.body, assignedDoctor: req.user.id });
    await patient.save();
    res.status(201).json(patient);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all patients, or those assigned to a specific doctor
exports.getPatients = async (req, res) => {
  try {
    const patients = req.user.role === UserType.ADMIN
      ? await Patient.find()
      : await Patient.find({ assignedDoctor: req.user.id });
    res.json(patients);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a specific patient by ID
exports.getPatientById = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) return res.status(404).json({ message: 'Patient not found' });
    res.json(patient);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update an existing patient record
exports.updatePatient = async (req, res) => {
  try {
    const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(patient);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a patient record by ID
exports.deletePatient = async (req, res) => {
  try {
    // Find the patient by ID and remove it
    const patient = await Patient.findByIdAndDelete(req.params.id);

    // If the patient is not found, return a 404 error
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.json({ message: 'Patient record deleted successfully', patient });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
