const Appointment = require('../models/Appointment');
const { UserType } = require('../common/enum');

// Create an appointment 
exports.createAppointment = async (req, res) => {
    try {
        const { doctor, patient, appointmentDate } = req.body;

        if (req.user.role !== UserType.PATIENT) {
            return res.status(403).json({ message: 'Only patients can create appointments.' });
        }

        const appointment = new Appointment({
            patient: patient,
            doctor,
            appointmentDate,
        });
        await appointment.save();
        res.status(201).json(appointment);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all appointments (Patients: their own, Doctors: assigned, Admin: all)
exports.getAppointments = async (req, res) => {
    try {
        let appointments;
        if (req.user.role === UserType.ADMIN) {
            appointments = await Appointment.find().populate('patient doctor', 'name');
        } else if (req.user.role === UserType.DOCTOR) {
            appointments = await Appointment.find({ doctor: req.user.id }).populate('patient', 'name');
        } else {
            appointments = await Appointment.find({ patient: req.user.id }).populate('doctor', 'name');
        }
        res.json(appointments);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get a specific appointment by ID
exports.getAppointmentById = async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id)
            .populate('patient doctor', 'name');

        if (!appointment) return res.status(404).json({ message: 'Appointment not found' });

        // Check access based on role
        if (
            req.user.role === UserType.PATIENT && appointment.patient._id.toString() !== req.user.id ||
            req.user.role === UserType.DOCTOR && appointment.doctor._id.toString() !== req.user.id
        ) {
            return res.status(403).json({ message: 'Access denied' });
        }

        res.json(appointment);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update an appointment (Patients: their own, Doctors: assigned, Admin: all)
exports.updateAppointment = async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id);

        if (!appointment) return res.status(404).json({ message: 'Appointment not found' });

        // Check access based on role
        if (
            req.user.role === 'patient' && appointment.patient.toString() !== req.user.id ||
            req.user.role === 'doctor' && appointment.doctor.toString() !== req.user.id
        ) {
            return res.status(403).json({ message: 'Access denied' });
        }

        const updates = req.body;
        Object.assign(appointment, updates);
        await appointment.save();
        res.json(appointment);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete an appointment (Admin, Patients only)
exports.deleteAppointment = async (req, res) => {
    try {
        const appointment = await Appointment.findByIdAndDelete(req.params.id);
        if (!appointment) return res.status(404).json({ message: 'Appointment not found' });

        res.json({ message: 'Appointment deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
