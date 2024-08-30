const validateRequest = (schema, isPathParams = false, isQueryParams = false) => (req, res, next) => {
    // Initialize error variable
    let error;

    if (isPathParams) {
        // Validate path parameters
        ({ error } = schema.validate(req.params));
    } else if (isQueryParams) {
        // Validate query parameters
        ({ error } = schema.validate(req.query));
    } else {
        // Validate request body
        ({ error } = schema.validate(req.body));
    }

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    next();
};

module.exports = validateRequest;
