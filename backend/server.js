const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const bookRoutes = require('./routes/bookRoutes');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
connectDB();

app.use(bodyParser.json());
app.use('/api/books', bookRoutes);

 app.get('/', (req, res) => {
    res.send('Backend server is running');
});

 app.get('/health', (req, res) => {
    res.send({ status: 'UP' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
