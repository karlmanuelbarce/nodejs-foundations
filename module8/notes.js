require('dotenv/config');
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { PrismaBetterSqlite3 } = require('@prisma/adapter-better-sqlite3');

const app = express();
const adapter = new PrismaBetterSqlite3({ url: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });
 
app.use(express.json());

app.get('/notes', async (req, res, next) => {
    try {
        const notes = await prisma.note.findMany({ orderBy: { createdAt: 'desc' } });
        res.json(notes);
    } catch (err) {
        next(err);
    }
});

app.get('/notes/:id', async (req, res, next) => {
    try {
        const note = await prisma.note.findUnique({
            where: { id: parseInt(req.params.id) }
        });
        if (!note) return res.status(404).json({ error: 'Note not found' });
        res.json(note);
    } catch (err) {
        next(err);
    }
});

app.post('/notes', async (req, res, next) => {
    try {
        const { title, content } = req.body;
        if (!title || !content) return res.status(400).json({ error: 'title and content are required' });
        const note = await prisma.note.create({
            data: { title, content }
        });
        res.status(201).json(note);
    } catch (err) {
        next(err);
    }
});

app.put('/notes/:id', async (req, res, next) => {
    try {
        const note = await prisma.note.update({
            where: { id: parseInt(req.params.id) },
            data: req.body
        });
        res.json(note);
    } catch (err) {
        next(err);
    }
});

app.delete('/notes/:id', async (req, res, next) => {
    try {
        await prisma.note.delete({
            where: { id: parseInt(req.params.id) }
        });
        res.status(204).send();
    } catch (err) {
        next(err);
    }
});

// Global error handler
app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || 'Internal server error';
    console.error(`[ERROR] ${status} ${message}`);
    res.status(status).json({ error: { status, message } });
});
 
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});