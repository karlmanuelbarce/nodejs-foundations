const express = require('express');
const router = express.Router();
const prisma = require('../db');

router.get('/', async (req, res, next) => {
    try {
        const notes = await prisma.note.findMany({ orderBy: { createdAt: 'desc' } });
        res.status(200).json(notes);
    } catch (err) {
        next(err);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const note = await prisma.note.findUnique({
            where: { id: parseInt(req.params.id) }
        });
        if (!note) return res.status(404).json({ error: 'Note not found' });
        res.status(200).json(note);
    } catch (err) {
        next(err);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const { title, content, tag } = req.body;
        if (!title || !content) return res.status(400).json({ error: 'title and content are required' });
        const note = await prisma.note.create({
            data: { title, content, tag }
        });
        res.status(201).json(note);
    } catch (err) {
        next(err);
    }
});

router.put('/:id', async (req, res, next) => {
    try {
        const { title, content, tag } = req.body;
        if (!title || !content) return res.status(400).json({ error: 'title and content are required' });
        const note = await prisma.note.findUnique({ where: { id: parseInt(req.params.id) } });
        if (!note) return res.status(404).json({ error: 'Note not found' });
        const updated = await prisma.note.update({
            where: { id: parseInt(req.params.id) },
            data: { title, content, tag }
        });
        res.status(200).json(updated);
    } catch (err) {
        next(err);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const note = await prisma.note.findUnique({ where: { id: parseInt(req.params.id) } });
        if (!note) return res.status(404).json({ error: 'Note not found' });
        await prisma.note.delete({
            where: { id: parseInt(req.params.id) }
        });
        res.status(204).send();
    } catch (err) {
        next(err);
    }
});

module.exports = router;