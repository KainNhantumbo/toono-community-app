import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
import type { PostList } from "@/types";

export const initialPostsState: PostList = [];

const publicPostsSlice = createSlice({
  name: "public-posts-slice",
  initialState: initialPostsState,
  reducers: {
    mutatePublicPosts: (state, action: PayloadAction<PostList>) => {
      state = action.payload;
      return state;
    }
  }
});

export const { mutatePublicPosts } = publicPostsSlice.actions;
export default publicPostsSlice.reducer;
