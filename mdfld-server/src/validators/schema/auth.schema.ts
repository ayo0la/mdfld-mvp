import { z } from 'zod';

const login = z.object({
  email: z
    .string({
      required_error: 'Email is required',
      invalid_type_error: 'Email must be a string',
    })
    .min(1, { message: 'Email cannot be empty' })
    .email({ message: 'Invalid email address' })
    .toLowerCase(),
  password: z.string({ required_error: 'Password is required' }).min(1, { message: 'Password cannot be empty' }),
});

const register = z.object({
  first_name: z.string({ required_error: 'FirstName is required' }).min(1, { message: 'FirstName cannot be empty' }),
  last_name: z.string({ required_error: 'LastName is required' }).min(1, { message: 'LastName cannot be empty' }),
  email: z
    .string({
      required_error: 'Email is required',
      invalid_type_error: 'Email must be a string',
    })
    .min(1, { message: 'Email cannot be empty' })
    .email({ message: 'Invalid email address' })
    .toLowerCase(),
  password: z.string({ required_error: 'Password is required' }).min(1, { message: 'Password cannot be empty' }),
  role: z.string({ required_error: 'Role is required' }),
});

const forgetPassword = z.object({
  email: z
    .string({
      required_error: 'Email is required',
      invalid_type_error: 'Email must be a string',
    })
    .min(1, { message: 'Email cannot be empty' })
    .email({ message: 'Invalid email address' })
    .toLowerCase(),
});

export const authSchema = {
  login,
  register,
  forgetPassword,
};
