
// QUESTION 5 :Implémenter les méthodes du contrôleur

const users = []; // Réutilisation de la liste fictive d'utilisateurs

module.exports = {
    /**
     * Récupération de tous les utilisateurs
     */
    getAllUsers(req, res) {
        res.status(200).json(users);
    },

    /**
     * Récupération d'un utilisateur par ID
     */
    getUserById(req, res) {
        const { id } = req.params;
        const user = users.find(u => u.id === parseInt(id));
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
        res.status(200).json(user);
    },

    /**
     * Suppression d'un utilisateur
     */
    deleteUser(req, res) {
        const { id } = req.params;
        const initialLength = users.length;
        users = users.filter(u => u.id !== parseInt(id));

        if (initialLength === users.length) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        res.status(200).json({ message: 'Utilisateur supprimé' });
    }
};
