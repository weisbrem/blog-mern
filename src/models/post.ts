import { Schema, model } from 'mongoose';

const PostModel = new Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      require: true,
    },
    title: {
      type: String,
      required: true,
      unique: true,
    },
    text: {
      type: String,
      required: true,
      unique: true,
    },
    tags: {
      type: Array,
      default: [],
    },
    viewsCount: {
      type: Number,
      default: 0,
    },
    imageUrl: String,
  },
  {
    timestamps: true,
  }
);

export default model('Post', PostModel);
