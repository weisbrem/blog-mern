import type { RequestHandler } from 'express';
import { validationResult } from 'express-validator';

const handleValidationError: RequestHandler = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array());
  }

  next();
};

export default handleValidationError;
