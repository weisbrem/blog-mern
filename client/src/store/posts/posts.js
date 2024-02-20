import { createSlice } from '@reduxjs/toolkit';
import { fetchPosts } from './posts.async';

const initialState = {
  posts: {
    items: [],
    status: 'idle',
  },
  tags: {
    items: [],
    status: 'idle',
  },
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducer: {},
  extraReducers: {
    [fetchPosts.pending](state) {
      state.posts.items = [];
      state.posts.status = 'loading';
    },
    [fetchPosts.fulfilled](state, action) {
      state.posts.items = action.payload;
      state.posts.status = 'fulfilled';
    },
    [fetchPosts.rejected](state, action) {
      state.posts.items = [];
      state.posts.status = 'rejected';
    },
  },
});

export const postsReducer = postsSlice.reducer;
