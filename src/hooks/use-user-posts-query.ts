import { useAppContext } from "@/context/app-context";
import { errorTransformer } from "@/lib/error";
import { UserPost, mutateUserPosts } from "@/state/slices/users-posts";
import { AppDispatch, RootState } from "@/state/store";
import { useQuery } from "@tanstack/react-query";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";

export const useUserPostsQuery = () => {
  const { client } = useAppContext();
  const dispatch = useDispatch<AppDispatch>();
  const auth = useSelector((state: RootState) => state.auth);

  const { data, refetch, isLoading, isError, error } = useQuery({
    queryKey: ["user-posts"],
    queryFn: async () => {
      try {
        const queryParams = new URLSearchParams({
          fields: "id,title,updated_at,created_at",
          userId: auth.id
        });
        const { data } = await client<UserPost[]>({
          method: "get",
          url: `/api/v1/posts?${queryParams.toString()}`
        });
        return [...data];
      } catch (error) {
        const { message } = errorTransformer(error);
        console.error(error);
        console.warn(message);
        throw error;
      }
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
