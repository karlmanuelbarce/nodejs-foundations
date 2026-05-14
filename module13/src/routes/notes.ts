// src/routes/notes.ts
import { Router, Request, Response, NextFunction } from 'express';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';
import { prisma } from '../db';
import { createNoteSchema, updateNoteSchema, noteQuerySchema } from '../schemas';
import { validate } from '../validate';
import { asyncHandler } from '../async-handler';

const router = Router();

// List all notes
router.get('/', asyncHandler(async (req: Request, res: Response) => {
  const { tag, search } = noteQuerySchema.parse(req.query);
  const notes = await prisma.note.findMany({
    where: {
      ...(tag && { tag }),
      ...(search && {
        OR: [
          { title: { contains: search } },
          { content: { contains: search } }
        ]
      })
    },
    orderBy: { createdAt: 'desc' }
  });
  res.json(notes);
}));

// Get one note
router.get('/:id', asyncHandler(async (req: Request, res: Response) => {
  const note = await prisma.note.findUnique({
    where: { id: parseInt(req.params.id as string) }
  });
  if (!note) {
    res.status(404).json({ error: { status: 404, message: 'Note not found' } });
    return;
  }
  res.json(note);
}));

// Create a note
router.post('/', validate(createNoteSchema), asyncHandler(async (req: Request, res: Response) => {
  const note = await prisma.note.create({ data: req.body });
  res.status(201).json(note);
}));

// Update a note
router.put('/:id', validate(updateNoteSchema), asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const note = await prisma.note.update({
      where: { id: parseInt(req.params.id as string) },
      data: req.body
    });
    res.json(note);
  } catch (err: unknown) {
    if (err instanceof PrismaClientKnownRequestError && err.code === 'P2025') {
      res.status(404).json({ error: { status: 404, message: 'Note not found' } });
      return;
    }
    next(err);
  }
}));

// Delete a note
router.delete('/:id', asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  try {
    await prisma.note.delete({
      where: { id: parseInt(req.params.id as string) }
    });
    res.status(204).send();
  } catch (err: unknown) {
    if (err instanceof PrismaClientKnownRequestError && err.code === 'P2025') {
      res.status(404).json({ error: { status: 404, message: 'Note not found' } });
      return;
    }
    next(err);
  }
}));

export default router;
