import { POSTS_LIMIT_PER_PAGE } from "@/shared/constants";
import { UserPost, mutateUserPosts } from "@/state/slices/users-posts";
import { AppDispatch, RootState } from "@/state/store";
import { useInfiniteQuery } from "@tanstack/react-query";
import * as React from "react";
import { useInView } from "react-intersection-observer";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import client from "@/config/http-client";

export const useUserPostsQuery = () => {
  const { ref: inViewRef, inView } = useInView();
  const dispatch = useDispatch<AppDispatch>();
  const auth = useSelector((state: RootState) => state.auth);
  const [params] = useSearchParams();

  const { data, refetch, fetchNextPage, hasNextPage, isLoading, isError, error } =
    useInfiniteQuery({
      initialPageParam: 0,
      queryKey: ["user-posts"],
      queryFn: async ({ pageParam = 0 }) => {
        const queryParams = new URLSearchParams({
          search: params.get("search") || "",
          offset: params.get("offset") || String(pageParam * POSTS_LIMIT_PER_PAGE),
          limit: params.get("limit") || String(POSTS_LIMIT_PER_PAGE),
          sort: params.get("sort") || "",
          fields: "id,title,updated_at,tags,created_at",
          userId: auth.id
        });

        const { data } = await client<UserPost[]>({
          method: "get",
          url: `/api/v1/posts?${queryParams.toString()}`
        });

        return { data, currentOffset: pageParam + 1 };
      },
      getNextPageParam: ({ data, currentOffset }) =>
        data.length >= POSTS_LIMIT_PER_PAGE ? currentOffset : undefined
    });

  const posts = React.useMemo((): UserPost[] => {
    if (data)
      return data.pages
        .map(({ data: posts }) => posts)
        .reduce((accumulator, currentObj) => [...accumulator, ...currentObj]);
    return [];
  }, [data]);

  React.useEffect(() => {
    dispatch(mutateUserPosts([...posts]));
  }, [posts]);

  React.useEffect(() => {
    if (inView && hasNextPage) fetchNextPage();
  }, [inView, hasNextPage]);

  React.useEffect(() => {
    const debounceTimer = setTimeout(() => refetch(), 500);
    return () => clearTimeout(debounceTimer);
  }, [params, refetch]);

  return { refetch, inViewRef, isError, isLoading, hasNextPage, error };
};
