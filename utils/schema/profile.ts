import { z } from 'zod';

export const updateProfileSchema = z
  .object({
    name: z.string(),
    old_password: z.string(),
    new_password: z.string().min(8),
  })
  .required();
