const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const URI = process.env.ATLAS_URI;

mongoose.connect(URI, { useNewUrlParser: true });

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database connection established successfully!');
});

const documentsRouter = require('./routes/documents');

app.use('/documents', documentsRouter);
app.use('*', (req, res) => res.status(404).json('Page Not Found'));

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});