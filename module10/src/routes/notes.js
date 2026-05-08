const express = require('express');
const router = express.Router();
const prisma = require('../db');
const { validateNote, validateNoteExists } = require('../middleware/validate');

router.get('/', async (req, res, next) => {
    try {
        const notes = await prisma.note.findMany({ orderBy: { createdAt: 'desc' } });
        res.status(200).json(notes);
    } catch (err) {
        next(err);
    }
});

router.get('/:id', validateNoteExists, async (req, res) => {
    res.status(200).json(req.note);
});

router.post('/', validateNote, async (req, res, next) => {
    try {
        const { title, content, tag } = req.body;
        const note = await prisma.note.create({
            data: { title, content, tag }
        });
        res.status(201).json(note);
    } catch (err) {
        next(err);
    }
});

router.put('/:id', validateNoteExists, validateNote, async (req, res, next) => {
    try {
        const { title, content, tag } = req.body;
        const updated = await prisma.note.update({
            where: { id: parseInt(req.params.id) },
            data: { title, content, tag }
        });
        res.status(200).json(updated);
    } catch (err) {
        next(err);
    }
});

router.delete('/:id', validateNoteExists, async (req, res, next) => {
    try {
        await prisma.note.delete({
            where: { id: parseInt(req.params.id) }
        });
        res.status(204).send();
    } catch (err) {
        next(err);
    }
});

module.exports = router;
