import { body } from 'express-validator';

export const loginValidationSchema = [
  body('email', 'Incorrect mail format').isEmail(),
  body('password', 'Password must be at least 5 characters long').isLength({ min: 5 }),
];
