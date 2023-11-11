import { z } from 'zod';

export const signInSchema = z
  .object({
    username_or_email: z.string(),
    password: z.string(),
  })
  .required();

export const signUpSchema = z
  .object({
    username: z.string().min(6).max(12),
    email: z.string().email(),
    name: z.string(),
    password: z.string().min(8),
    confirm_password: z.string(),
  })
  .required()
  .refine((data) => data.password === data.confirm_password, {
    message: 'Password do not match',
    path: ['confirm_password'],
  });
