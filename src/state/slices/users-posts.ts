import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type UserPost = {
  id: string;
  title: string;
  claps: string[];
  public: boolean;
  updated_at: string;
  created_at: string;
};

export const initialPostsState: UserPost[] = [];

const postsSlice = createSlice({
  name: "users-posts-slice",
  initialState: initialPostsState,
  reducers: {
    mutateUserPosts: (state, action: PayloadAction<UserPost[]>) => {
      state = action.payload;
      return state;
    }
  }
});

export const { mutateUserPosts } = postsSlice.actions;
export default postsSlice.reducer;
