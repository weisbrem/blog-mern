import express, { Application } from 'express';
import mongoose from 'mongoose';
import multer, { diskStorage } from 'multer';
import dotenv from 'dotenv';
import cors from 'cors';

import { getMe, login, register } from './controllers/UserController';
import { create, getAll, getOne, remove, update } from './controllers/PostController';

import { registerValidationSchema } from './validation/auth';
import { loginValidationSchema } from './validation/login';
import { postValidationSchema } from './validation/post';
import checkAuth from './middleware/checkAuth';
import handleValidationError from './middleware/handleValidationError';

dotenv.config();

mongoose
  .connect(`${process.env.DB}`)
  .then(() => console.log('DB conected'))
  .catch((err) => console.log('DB err', err));

const app: Application = express();

const storage = diskStorage({
  destination: (_, __, cb) => {
    cb(null, 'src/uploads');
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('src/uploads'));

/** /auth/login */
app.post('/auth/login', loginValidationSchema, handleValidationError, login);
/** /auth/register */
app.post('/auth/register', registerValidationSchema, handleValidationError, register);
/** auth/me */
app.get('/auth/me', checkAuth, getMe);
/** /posts/ */
app.get('/posts', getAll);
app.get('/posts/:id', getOne);
app.post('/posts', checkAuth, postValidationSchema, handleValidationError, create);
app.delete('/posts/:id', checkAuth, remove);
app.patch('/posts/:id', checkAuth, postValidationSchema, handleValidationError, update);
/** uploads */
app.post('/uploads', checkAuth, upload.single('image'), (req, res) => {
  res.json({
    url: `/uploads/${req.file?.originalname}`,
  });
});

app.listen(process.env.PORT, () => {
  console.log('Server started');
});
