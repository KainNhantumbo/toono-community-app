import client from "@/config/http-client";
import { errorTransformer } from "@/lib/error";
import { PUBLIC_POSTS_LIMIT_PER_PAGE } from "@/shared/constants";
import { mutatePublicPosts } from "@/state/slices/public-posts";
import { AppDispatch, RootState } from "@/state/store";
import { PostList } from "@/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import * as React from "react";
import { useInView } from "react-intersection-observer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";

export const usePublicPostsQuery = () => {
  const navigate = useNavigate();
  const { ref: inViewRef, inView } = useInView();
  const dispatch = useDispatch<AppDispatch>();
  const filters = useSelector((state: RootState) => state.filters);
  const [params] = useSearchParams();

  const {
    data,
    refetch,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    isLoading,
    isError,
    error
  } = useInfiniteQuery({
    initialPageParam: 0,
    queryKey: ["public-posts-query"],
    queryFn: async ({ pageParam = 0 }) => {
      try {
        const queryParams = new URLSearchParams({
          offset: params.get("offset") || String(pageParam * PUBLIC_POSTS_LIMIT_PER_PAGE),
          limit: params.get("limit") || String(PUBLIC_POSTS_LIMIT_PER_PAGE),
          fields: "id,title,updated_at,slug,read_time,words,tags,created_at",
          sort: params.get("sort") || "",
          search: params.get("search") || ""
        });

        const { data } = await client.get<PostList>(
          `/api/v1/posts/public?${queryParams.toString()}`
        );

        return { data, currentOffset: pageParam + 1 };
      } catch (error) {
        const { message } = errorTransformer(error);
        console.error(error);
        console.warn(message);
        throw error;
      }
    },
    getNextPageParam: ({ data, currentOffset }) =>
      data.length >= PUBLIC_POSTS_LIMIT_PER_PAGE ? currentOffset : undefined
  });

  const posts = React.useMemo((): PostList => {
    if (data)
      return data.pages
        .map(({ data: posts }) => posts)
        .reduce((accumulator, currentObj) => [...accumulator, ...currentObj]);
    return [];
  }, [data]);

  React.useEffect(() => {
    dispatch(mutatePublicPosts([...posts]));
  }, [posts]);

  React.useEffect(() => {
    if (inView && hasNextPage) fetchNextPage();
  }, [inView, hasNextPage]);

  React.useEffect(() => {
    const query = new URLSearchParams({ ...filters });
    navigate(`/?${query}`);
  }, [filters]);

  React.useEffect(() => {
    const debounceTimer = setTimeout(() => refetch(), 500);
    return () => clearTimeout(debounceTimer);
  }, [params]);

  return {
    refetch,
    isFetchingNextPage,
    inViewRef,
    isError,
    isLoading,
    hasNextPage,
    error
  };
};
