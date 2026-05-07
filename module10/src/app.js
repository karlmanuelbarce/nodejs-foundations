const express = require('express');

const prisma = require('./db');
const app = express();

const notesRouter = require('./routes/notes');

app.use(express.json());
app.use('/notes', notesRouter);

app.get ('/health', (req, res) => {
    res.json({ status: 'ok' });
    });

module.exports = app;