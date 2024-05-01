import client from "@/config/http-client";
import { errorTransformer } from "@/lib/error";
import { RootState } from "@/state/store";
import { PublicPost } from "@/types";
import { useQuery } from "@tanstack/react-query";
import * as React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const initialPostState: PublicPost = {
  id: "",
  title: "",
  slug: "",
  content: "",
  read_time: "",
  words: 0,
  visits: 0,
  tags: [],
  coverImage: null,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  claps: [],
  comments: [],
  user: { id: "", name: "", profile_image: null }
};

export const usePublicPostQuery = () => {
  const params = useParams();
  const auth = useSelector((state: RootState) => state.auth);

  const [post, setPost] = React.useState<PublicPost>(initialPostState);
  const { data, isError, isLoading, error, refetch } = useQuery({
    queryKey: ["community-posts"],
    queryFn: async () => {
      try {
        const { data } = await client.get<PublicPost>(
          `/api/v1/posts/public/${params["slug"]}`
        );
        return data;
      } catch (error) {
        const { message } = errorTransformer(error);
        console.error(error);
        console.warn(message);
        throw error;
      }
    }
  });

  const isInClapsArray: boolean = React.useMemo(() => {
    if (!auth.id) return false;
    const exists = post.claps.find((clap) => clap.user_id === auth.id);
    if (exists) return true;
    return false;
  }, [post]);

  React.useEffect(() => {
    if (data) setPost(data);
  }, [data]);

  return { isError, error, isLoading, post, refetch, isInClapsArray };
};
