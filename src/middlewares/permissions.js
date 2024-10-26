const User = require('../models/User');

exports.checkPermission = (allowedUserTypes) => {
    return async function (req, res, next) {
        try {
            const loggedInUser = req.user;

            // Check if the user exists in the database
            const userDetails = await User.findById(loggedInUser.id);
            if (!userDetails) {
                return res.status(403).json({ message: 'User not found' });
            }

            // Check if the user's role is allowed
            if (allowedUserTypes.includes(userDetails.role)) {
                return next();
            } else {
                return res.status(403).json({ message: 'You are not authorized for this action' });
            }
        } catch (error) {
            console.error('Error in checkPermission middleware:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    };
};
