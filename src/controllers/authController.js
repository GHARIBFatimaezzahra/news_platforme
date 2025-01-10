
// QUESTION 5 :Implémenter les méthodes du contrôleur


const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const users = []; // Stockage temporaire, remplace-le par une base de données

exports.register = (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    users.push({ username, password: hashedPassword });
    res.status(201).json({ message: 'Utilisateur enregistré avec succès' });
};

exports.login = (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username);
    if (user && bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign({ username }, 'secretKey', { expiresIn: '1h' });
        res.json({ message: 'Connexion réussie', token });
    } else {
        res.status(401).json({ message: 'Identifiants invalides' });
    }
};
