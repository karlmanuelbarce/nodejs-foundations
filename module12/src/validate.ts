import { Request, Response, NextFunction } from 'express';
import { HttpError } from './middleware';

type FieldRule =
  | { type: 'string'; required?: boolean; minLength?: number; maxLength?: number }
  | { type: 'number'; required?: boolean; min?: number; max?: number }
  | { type: 'boolean'; required?: boolean };

type BodyRules = Record<string, FieldRule>;

export function validateBody(rules: BodyRules) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    const body = req.body as Record<string, unknown>;

    for (const [field, rule] of Object.entries(rules)) {
      const value = body[field];

      if (value === undefined || value === null) {
        if (rule.required !== false) {
          return next(new HttpError(400, `${field} is required`));
        }
        continue;
      }

      if (typeof value !== rule.type) {
        return next(new HttpError(400, `${field} must be a ${rule.type}`));
      }

      if (rule.type === 'string') {
        const str = value as string;
        if (rule.minLength !== undefined && str.length < rule.minLength) {
          return next(new HttpError(400, `${field} must be at least ${rule.minLength} character(s)`));
        }
        if (rule.maxLength !== undefined && str.length > rule.maxLength) {
          return next(new HttpError(400, `${field} must be ${rule.maxLength} characters or fewer`));
        }
      }

      if (rule.type === 'number') {
        const num = value as number;
        if (rule.min !== undefined && num < rule.min) {
          return next(new HttpError(400, `${field} must be at least ${rule.min}`));
        }
        if (rule.max !== undefined && num > rule.max) {
          return next(new HttpError(400, `${field} must be at most ${rule.max}`));
        }
      }
    }

    next();
  };
}

// Built with validateBody — same rules, no hand-rolled logic
export const validateCreateTask = validateBody({
  title: { type: 'string', minLength: 1, maxLength: 100 },
});
