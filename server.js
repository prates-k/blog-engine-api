require('dotenv').config();
const express = require('express');
const authRoutes = require('./src/routes/authRoutes');

const app = express();

app.use(express.json());

app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
    res.json({
        status: 'online',
        message: 'Welcome to the API 🚀',
        timestamp: new Date()
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('Server is running on port ' + PORT + '... 🚀');
});