
// QUESTION 3: Ajouter un middleware pour la gestion des erreurs

const errorMiddleware = (err, req, res, next) => {
    console.error('Erreur détectée :', err.message);

    res.status(err.status || 500).json({
        message: err.message || 'Une erreur interne est survenue.',
    });
};

module.exports = errorMiddleware;
