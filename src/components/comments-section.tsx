import * as React from "react";
import client from "@/config/http-client";
import { LoginRequest } from "./login-request";
import { RootState } from "@/state/store";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { errorTransformer } from "@/lib/error";
import { toast } from "sonner";

export interface CommentsSectionProps {
  postId: string;
}

export type Comment = {
  id: string;
  content: string;
  post_id: string;
  parent_comment: string;
  user_id: string;
  created_at: string;
  updated_at: string;
};

export function CommentsSection({ postId }: CommentsSectionProps) {
  const auth = useSelector((state: RootState) => state.auth);
  const [comments, setComments] = React.useState<Comment[]>([]);

  const { data, refetch, error, isError, isLoading } = useQuery({
    queryKey: ["comments-section"],
    queryFn: async () => {
      try {
        const { data } = await client.get<Comment[]>(`/api/v1/comments/${postId}`);
        return data;
      } catch (error) {
        const { message } = errorTransformer(error);
        console.error(error);
        console.warn(message);
        toast.error(message, { action: { label: "Retry", onClick: () => refetch() } });
        throw error;
      }
    }
  });

  const handleCreateComment = async () => {};
  const handleUpdateComment = async (commentId: string) => {};
  const handleDeleteComment = async (commentId: string) => {};

  React.useEffect(() => {
    if (data && !isError) setComments(data);
  }, [data]);

  React.useEffect(() => {
    console.info("mounted");
  }, [postId]);

  return <section key={postId}></section>;
}

export const CommentForm = ({
  value,
  onChange
}: {
  value: string;
  onChange: (value: string) => void;
}) => {


  return(
    <></>
  )
};
