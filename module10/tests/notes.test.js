process.env.DATABASE_URL = 'file:./test.db';

const request = require('supertest');
const app = require('../src/app');
const prisma = require('../src/db');

beforeAll(async () => {
  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS "Note" (
      "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
      "title" TEXT NOT NULL,
      "content" TEXT NOT NULL,
      "tag" TEXT,
      "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `);
});

beforeEach(async () => {
  await prisma.note.deleteMany();
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe('POST /notes', () => {
  it('creates a note and returns 201', async () => {
    const res = await request(app)
      .post('/notes')
      .send({ title: 'Test Note', content: 'Some content' });

    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({ title: 'Test Note', content: 'Some content' });
    expect(res.body.id).toBeDefined();
  });

  it('creates a note with an optional tag', async () => {
    const res = await request(app)
      .post('/notes')
      .send({ title: 'Tagged', content: 'Content here', tag: 'work' });

    expect(res.status).toBe(201);
    expect(res.body.tag).toBe('work');
  });

  it('returns 400 when title is missing', async () => {
    const res = await request(app)
      .post('/notes')
      .send({ content: 'No title here' });

    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/title/i);
  });

  it('returns 400 when content is missing', async () => {
    const res = await request(app)
      .post('/notes')
      .send({ title: 'No content here' });

    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/content/i);
  });

  it('returns 400 when title exceeds 100 characters', async () => {
    const res = await request(app)
      .post('/notes')
      .send({ title: 'a'.repeat(101), content: 'Valid content' });

    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/title/i);
  });

  it('returns 400 when content exceeds 5000 characters', async () => {
    const res = await request(app)
      .post('/notes')
      .send({ title: 'Valid title', content: 'a'.repeat(5001) });

    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/content/i);
  });
});

describe('GET /notes', () => {
  it('returns an empty array when there are no notes', async () => {
    const res = await request(app).get('/notes');

    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });

  it('returns all notes ordered by createdAt descending', async () => {
    await prisma.note.create({ data: { title: 'First', content: 'Content A', updatedAt: new Date() } });
    await prisma.note.create({ data: { title: 'Second', content: 'Content B', updatedAt: new Date() } });

    const res = await request(app).get('/notes');

    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(2);
    expect(res.body[0].title).toBe('Second');
    expect(res.body[1].title).toBe('First');
  });
});

describe('GET /notes/:id', () => {
  it('returns the note with the given id', async () => {
    const note = await prisma.note.create({
      data: { title: 'Specific', content: 'Find me', updatedAt: new Date() },
    });

    const res = await request(app).get(`/notes/${note.id}`);

    expect(res.status).toBe(200);
    expect(res.body.id).toBe(note.id);
    expect(res.body.title).toBe('Specific');
  });

  it('returns 404 for a non-existent id', async () => {
    const res = await request(app).get('/notes/99999');

    expect(res.status).toBe(404);
    expect(res.body.error).toMatch(/not found/i);
  });
});

describe('DELETE /notes/:id', () => {
  it('deletes a note and returns 204', async () => {
    const note = await prisma.note.create({
      data: { title: 'Delete me', content: 'Bye', updatedAt: new Date() },
    });

    const res = await request(app).delete(`/notes/${note.id}`);

    expect(res.status).toBe(204);

    const deleted = await prisma.note.findUnique({ where: { id: note.id } });
    expect(deleted).toBeNull();
  });

  it('returns 404 when deleting a non-existent note', async () => {
    const res = await request(app).delete('/notes/99999');

    expect(res.status).toBe(404);
    expect(res.body.error).toMatch(/not found/i);
  });
});
