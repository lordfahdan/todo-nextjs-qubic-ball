import { z } from 'zod';

export const addTodoSchema = z
  .object({
    name: z.string(),
    description: z.string(),
  })
  .required();