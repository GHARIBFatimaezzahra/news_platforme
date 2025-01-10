const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

/**
 * Routes pour les utilisateurs
 */

// Récupérer tous les utilisateurs
router.get('/', userController.getAllUsers);

// Récupérer un utilisateur par ID
router.get('/:id', userController.getUserById);

// Supprimer un utilisateur par ID
router.delete('/:id', userController.deleteUser);

module.exports = router;
