require('dotenv').config();
const express = require('express');
const cors = require('cors');
const newsRoutes = require('./routes/newsRoutes');
const authRoutes = require('./routes/authRoutes');


const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use('/api/auth', authRoutes);

// Routes
app.use('/api/news', newsRoutes);

// Middleware d'erreur
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Erreur Serveur');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
