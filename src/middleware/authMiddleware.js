const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({ message: 'Accès non autorisé, token manquant.' });
    }

    // Simuler la validation d'un token (à remplacer par une vraie logique si nécessaire)
    if (token !== 'valid-token') {
        return res.status(403).json({ message: 'Token invalide.' });
    }

    next(); // Passe au prochain middleware ou à la route
};

module.exports = authMiddleware;
