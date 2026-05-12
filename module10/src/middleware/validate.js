const prisma = require('../db');

function validateNote(req, res, next) {
    const { title, content } = req.body;
    if (!title || !content) {
        return res.status(400).json({ error: 'title and content are required' });
    }
    if (title.length > 100) {
        return res.status(400).json({ error: 'title must be 100 characters or less' });
    }
    if (content.length > 5000) {
        return res.status(400).json({ error: 'content must be 5000 characters or less' });
    }
    next();
}

async function validateNoteExists(req, res, next) {
    try {
        const note = await prisma.note.findUnique({ where: { id: parseInt(req.params.id) } });
        if (!note) return res.status(404).json({ error: 'Note not found' });
        req.note = note;
        next();
    } catch (err) {
        next(err);
    }
}

module.exports = { validateNote, validateNoteExists };
