
// QUESTION 5 :Implémenter les méthodes du contrôleur

const axios = require('axios');

const DUMMY_JSON_URL = 'https://dummyjson.com/posts';

const newsController = {
    async getAllNews(req, res) {
        try {
            const response = await axios.get(DUMMY_JSON_URL);
            res.json(response.data);
        } catch (error) {
            res.status(500).json({ message: 'Erreur serveur' });
        }
    },

    async getNewsById(req, res) {
        try {
            const response = await axios.get(`${DUMMY_JSON_URL}/${req.params.id}`);
            res.json(response.data);
        } catch (error) {
            res.status(500).json({ message: 'Erreur serveur' });
        }
    },

    async createNews(req, res) {
        try {
            const response = await axios.post(DUMMY_JSON_URL, req.body);
            res.status(201).json(response.data);
        } catch (error) {
            res.status(500).json({ message: 'Erreur serveur' });
        }
    }
};

module.exports = newsController;
