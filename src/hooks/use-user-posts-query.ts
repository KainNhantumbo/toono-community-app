import client from "@/config/http-client";
import { UserPost, mutateUserPosts } from "@/state/slices/users-posts";
import { AppDispatch, RootState } from "@/state/store";
import { useQuery } from "@tanstack/react-query";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";

export const useUserPostsQuery = () => {
  const dispatch = useDispatch<AppDispatch>();
  const auth = useSelector((state: RootState) => state.auth);

  const { data, refetch, isLoading, isError, error } = useQuery({
    queryKey: ["user-posts"],
    queryFn: async () => {
      const queryParams = new URLSearchParams({
        fields: "id,title,updated_at,created_at",
        userId: auth.id
      });
      const { data } = await client.get<UserPost[]>(
        `/api/v1/posts?${queryParams.toString()}`
      );
      return [...data];
    }
  });

  const posts = React.useMemo((): UserPost[] => {
    if (data && Array.isArray(data)) return data;
    return [];
  }, [data]);

  React.useEffect(() => {
    dispatch(mutateUserPosts([...posts]));
  }, [posts]);

  return { refetch, isError, isLoading, error };
};
