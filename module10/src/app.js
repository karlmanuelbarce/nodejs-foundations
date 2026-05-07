const express = require('express');

const prisma = require('./db');
const app = express();

app.use(express.json());

app.get ('/health', (req, res) => {
    res.json({ status: 'ok' });
    });

module.exports = app;