import { body } from 'express-validator';

export const postValidationSchema = [
  body('title', 'Enter the title of the article').isLength({ min: 3 }).isString(),
  body('test', 'Enter the text of the article').isLength({ min: 10 }).isString(),
  body('tags', 'Incorrect tag format').optional().isString(),
  body('imageUrl', 'Incorrect image link').optional().isString(),
];
