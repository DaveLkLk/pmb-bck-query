function validateArray(req, res, next) {
    if (!Array.isArray(req.body)) {
        return res.status(400).json({ error: 'Se esperaba un array de palabras.' });
    }
    next();
}

module.exports = validateArray