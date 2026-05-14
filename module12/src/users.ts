import { Router, Request, Response } from 'express';

const router = Router();

interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'member';
  bio?: string;
}

interface CreateUserBody {
  name: string;
  email: string;
  role: 'admin' | 'member';
  bio?: string;
}

interface UpdateUserBody {
  name?: string;
  email?: string;
  role?: 'admin' | 'member';
  bio?: string;
}

let users: User[] = [];
let nextId = 1;

router.get('/', (_req: Request, res: Response) => {
  res.json(users);
});

router.get('/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id as string);
  const user = users.find(u => u.id === id);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.json(user);
});

router.post('/', (req: Request<{}, {}, CreateUserBody>, res: Response) => {
  const { name, email, role, bio } = req.body;
  if (!name || !email || !role) {
    return res.status(400).json({ error: 'name, email, and role are required' });
  }
  const user: User = { id: nextId++, name, email, role, bio };
  users.push(user);
  res.status(201).json(user);
});

router.put('/:id', (req: Request<{ id: string }, {}, UpdateUserBody>, res: Response) => {
  const id = parseInt(req.params.id as string);
  const user = users.find(u => u.id === id);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  if (req.body.name !== undefined) user.name = req.body.name;
  if (req.body.email !== undefined) user.email = req.body.email;
  if (req.body.role !== undefined) user.role = req.body.role;
  if (req.body.bio !== undefined) user.bio = req.body.bio;
  res.json(user);
});

router.delete('/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id as string);
  const idx = users.findIndex(u => u.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  users.splice(idx, 1);
  res.status(204).send();
});

export default router;
