import { configureStore } from "@reduxjs/toolkit";
import FiltersReducer from "@/state/slices/filters";
import PublicPostsReducer from "@/state/slices/public-posts";
import AuthReducer from "./slices/auth";
import UserPostsReducer from "./slices/users-posts";

export const store = configureStore({
  reducer: {
    filters: FiltersReducer,
    auth: AuthReducer,
    posts: UserPostsReducer,
    publicPosts: PublicPostsReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
