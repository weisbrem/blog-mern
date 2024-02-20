import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const { data } = await api.get('/posts');

  return data;
});
