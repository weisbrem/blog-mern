import { Request, Response } from 'express';
import { genSalt, hash, compare } from 'bcrypt';
import jwt from 'jsonwebtoken';

import UserModel from '../models/user';

import { IUser } from '../interfaces/user.interface';

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, fullName, avatarUrl }: IUser = req.body;
    const salt = await genSalt(10);
    const passwordHash = await hash(password, salt);

    const doc = new UserModel({
      email,
      passwordHash,
      fullName,
      avatarUrl,
    });

    /** saving user in DB */
    const user = await doc.save();
    const token = jwt.sign(
      {
        _id: user._id,
      },
      `${process.env.JWT_SECRET}`,
      {
        expiresIn: '30d',
      }
    );

    const { _id, createdAt, updatedAt, __v } = user;

    return res.json({
      fullName,
      email,
      avatarUrl,
      _id,
      createdAt,
      updatedAt,
      __v,
      token,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: 'Registration failed. Try again later',
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: 'Incorrect login or password',
      });
    }

    const { passwordHash, _id, fullName, avatarUrl, createdAt, updatedAt, __v } = user;
    const isValidPassword = await compare(password, passwordHash);

    if (!isValidPassword) {
      return res.status(401).json({
        message: 'Incorrect login or password',
      });
    }

    const token = jwt.sign(
      {
        _id,
      },
      `${process.env.JWT_SECRET}`,
      {
        expiresIn: '30d',
      }
    );

    return res.json({
      fullName,
      email,
      avatarUrl,
      _id,
      createdAt,
      updatedAt,
      __v,
      token,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: 'Faild to login. Try again later',
    });
  }
};

export const getMe = async (req: Request, res: Response) => {
  try {
    const user = await UserModel.findById(req.body.userId);

    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    const { fullName, email, avatarUrl, _id, createdAt, updatedAt, __v } = user;

    return res.json({
      fullName,
      email,
      avatarUrl,
      _id,
      createdAt,
      updatedAt,
      __v,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: 'No access',
    });
  }
};
