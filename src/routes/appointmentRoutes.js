// Import necessary modules and functions
const express = require('express');
const {
    createAppointment,
    getAppointments,
    getAppointmentById,
    updateAppointment,
    deleteAppointment,
} = require('../controllers/appointmentController');
const { authenticate } = require('../middlewares/authMiddleware');
const { checkPermission } = require('../middlewares/permissions');
const { UserType } = require('../common/enum');

const router = express.Router();

// Route for creating an appointment (Accessible by Patients and Admin)
// POST request to create a new appointment;
router.post('/', authenticate, checkPermission([UserType.PATIENT, UserType.ADMIN]), createAppointment);

// Route for getting all appointments 
// GET request to retrieve appointments. Patients can see their own, Doctors see their assigned ones, Admin can view all.
router.get('/', authenticate, checkPermission([UserType.DOCTOR, UserType.ADMIN, UserType.PATIENT]), getAppointments);

// Route for getting a specific appointment by ID 
// GET request to retrieve a particular appointment by its ID. 
router.get('/:id', authenticate, checkPermission([UserType.DOCTOR, UserType.ADMIN, UserType.PATIENT]), getAppointmentById);

// Route for updating an appointment
// PUT request to update an existing appointment.
router.put('/:id', authenticate, checkPermission([UserType.DOCTOR, UserType.ADMIN, UserType.PATIENT]), updateAppointment);

// Route for deleting an appointment 
// DELETE request to remove an appointment. Only Admins and Patients can delete.
router.delete('/:id', authenticate, checkPermission([UserType.ADMIN, UserType.PATIENT]), deleteAppointment);

module.exports = router;
