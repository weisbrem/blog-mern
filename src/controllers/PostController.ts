import { Request, Response } from 'express';
import PostModel from '../models/post';

export const getAll = async (req: Request, res: Response) => {
  try {
    const posts = await PostModel.find().populate('author').exec();

    res.json(posts);
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: 'Faild to get articles',
    });
  }
};

export const getOne = async (req: Request, res: Response) => {
  try {
    const postId = req.params.id;

    const post = await PostModel.findOneAndUpdate(
      {
        _id: postId,
      },
      {
        $inc: { viewsCount: 1 },
      },
      {
        returnDocument: 'after',
      }
    );

    res.send(post);
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: 'Faild to get article',
    });
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const { title, text, tags, imageUrl, userId } = req.body;

    const doc = new PostModel({
      title,
      text,
      tags,
      imageUrl,
      author: userId,
    });

    const post = await doc.save();

    res.json(post);
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: 'Faild to create an article',
    });
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const postId = req.params.id;

    const post = await PostModel.findOneAndDelete({
      _id: postId,
    });

    if (!post) {
      return res.status(404).json({
        message: 'The article not found',
      });
    }

    res.send({
      success: true,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: 'Faild to get article',
    });
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const postId = req.params.id;

    const { title, text, tags, imageUrl, userId } = req.body;

    await PostModel.updateOne(
      {
        _id: postId,
      },
      {
        title,
        text,
        tags,
        imageUrl,
        author: userId,
      }
    );

    res.json({
      success: true,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: 'Faild to update the article',
    });
  }
};
