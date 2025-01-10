// QUESTION 3 : Ajouter un middleware de logging

const loggerMiddleware = (req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next(); // Passe au middleware ou à la route suivante
};

module.exports = loggerMiddleware;
