require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');

const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: '✅ ShopForge Backend is Running!' });
});

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;

console.log('🔄 Connecting to MongoDB...');
console.log('URI:', process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI, {
        serverSelectionTimeoutMS: 30000,
        socketTimeoutMS: 45000,
        family: 4,
    })
    .then(() => {
        console.log('✅ MongoDB Connected Successfully');
        app.listen(PORT, () => {
            console.log(`✅ Server running on http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error('❌ MongoDB Connection Failed:', err.message);
        console.error('Full error:', err);
    });