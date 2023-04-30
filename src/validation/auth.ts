import { body } from 'express-validator';

export const registerValidationSchema = [
  body('email', 'Incorrect mail format').isEmail(),
  body('password', 'Password must be at least 5 characters long').isLength({ min: 5 }),
  body('fullName', 'Enter user name').isLength({ min: 3 }),
  body('avatarUrl', 'Incorrect avatar link').optional().isURL(),
];
