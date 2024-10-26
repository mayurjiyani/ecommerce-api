const express = require('express');
const {
    createPatient,
    getPatients,
    getPatientById,
    updatePatient,
    deletePatient
} = require('../controllers/patientController');
const { authenticate } = require('../middlewares/authMiddleware');
const { checkPermission } = require('../middlewares/permissions');
const { UserType } = require('../common/enum');

const router = express.Router();

// Define route for creating a new patient record
// Only accessible to authenticated users with roles: DOCTOR or ADMIN
router.post('/', authenticate, checkPermission([UserType.DOCTOR, UserType.ADMIN]), createPatient);

// Define route for getting a list of all patients
// Only accessible to authenticated users with roles: DOCTOR or ADMIN
router.get('/', authenticate, checkPermission([UserType.DOCTOR, UserType.ADMIN]), getPatients);

// Define route for getting a specific patient by their ID
// Accessible to authenticated users with roles: PATIENT (to view their own record) or ADMIN
router.get('/:id', authenticate, checkPermission([UserType.PATIENT, UserType.ADMIN]), getPatientById);

// Define route for updating a patient's record by their ID
// Only accessible to authenticated users with roles: DOCTOR or ADMIN
router.put('/:id', authenticate, checkPermission([UserType.DOCTOR, UserType.ADMIN]), updatePatient);

// Define route for deleting a patient's record by their ID
// Only accessible to authenticated users with the ADMIN role
router.delete('/:id', authenticate, checkPermission([UserType.ADMIN]), deletePatient);

module.exports = router;
