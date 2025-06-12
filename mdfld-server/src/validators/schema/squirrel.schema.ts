import { z } from 'zod';

const personSearch = z
  .object({
    name: z.string().optional(),
    role: z.string().optional(),
    company: z.string().optional(),
    state: z.string().optional(),
    country: z.string().optional(),
    start: z.string(),
  })
  .refine(data => data.name || data.role || data.company, {
    message: 'At least one of "name", "role", "webiste" or "organizations" must be present',
    path: ['name', 'role', 'organizations', 'website'],
  });

export const squirrelSchema = {
  personSearch,
};
