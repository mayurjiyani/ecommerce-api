const jwt = require('jsonwebtoken');

exports.authenticate = (req, res, next) => {
    const authHeader = req.header('Authorization');
    if (!authHeader) {
        return res.status(401).json({ message: 'Access denied' });
    }

    // Extract the token from the "Bearer <token>" string
    const token = authHeader.replace("Bearer ", "");

    if (!token) {
        return res.status(401).json({ message: 'Access denied' });
    }

    try {
        // Verify the token using the secret
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.log("Error verifying token:", error);
        res.status(400).json({ message: 'Invalid token' });
    }
};
