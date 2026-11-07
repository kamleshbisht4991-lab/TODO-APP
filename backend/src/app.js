const express = require('express');
const app = express();

const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const { notFound, errorHandler } = require('./middleware/errorHandler');
const todoRoutes = require('./routes/todoRoutes');

dotenv.config();
app.use(cors({ origin: process.env.CLIENT_URL }));
app.use(express.json());
if (process.env.NODE_ENV !== 'production') {
    app.use(morgan('dev'));
}
app.get('/api/health', (req, res) => {
    res.status(200).json({ message: 'API is running' });
});
app.use('/api/todos', todoRoutes);
app.use(notFound);
app.use(errorHandler);


module.exports = app;