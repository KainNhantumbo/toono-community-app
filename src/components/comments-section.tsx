import { CommentForm } from "@/components/comment-form";
import client from "@/config/http-client";
import { errorTransformer } from "@/lib/error";
import { RootState } from "@/state/store";
import { Comment, CommentWithChildren } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { AlertTriangleIcon } from "lucide-react";
import * as React from "react";
import { useSelector } from "react-redux";
import { AlertMessage } from "./alert-message";
import { CommentsRenderer } from "./comment-renderer";
import { Separator } from "./ui/separator";

export function CommentsSection({ postId }: { postId: string }) {
  const auth = useSelector((state: RootState) => state.auth);
  const [comments, setComments] = React.useState<Comment[]>([]);

  const { data, refetch, error, isError, isLoading } = useQuery({
    queryKey: ["comments-section"],
    queryFn: async () => {
      try {
        const { data } = await client.get<Comment[]>(`/api/v1/comments/public/${postId}`);
        return data;
      } catch (error) {
        const { message } = errorTransformer(error);
        console.error(error);
        console.warn(message);
        throw error;
      }
    }
  });

  const handleDeleteComment = async (commentId: string) => {};

  const rootComments = React.useMemo(() => {
    const byParent = new Map<string, Array<Comment>>();
    for (const comment of comments) {
      let children = byParent.get(comment.reply_comment || "root");
      if (!children) {
        children = [];
        byParent.set(comment.reply_comment || "root", children);
      }
      children.push(comment);
    }
    return byParent;
  }, [comments]);

  function getChildren(comment: Comment): CommentWithChildren {
    const currentComment = rootComments.get(comment.reply_comment || "root");
    return {
      ...comment,
      children: currentComment ? currentComment.map(getChildren) : []
    };
  }

  const formattedComments = React.useMemo(() => {
    const group: { [index: string]: Comment[] } = {};

    for (const comment of comments) {
      group[comment.reply_comment || "root"] ||= [];
      group[comment.reply_comment || "root"].push(comment);
    }

    return group;
  }, [comments]);

  // const getCommentReplies = (parentId: string) => rootComments[parentId];

  React.useEffect(() => {
    if (data && !isError) setComments(data);
  }, [data]);

  React.useEffect(() => {
    console.info("Map", rootComments);
    console.info("Array", formattedComments);
  }, [comments, rootComments, formattedComments]);

  return (
    <section
      key={postId}
      className='mx-auto w-full max-w-[820px] rounded-lg border bg-input/30 p-3'>
      <h2>Comments ({comments.length})</h2>
      <Separator decorative className='my-3' />
      <CommentForm postId={postId} handleReloadComments={refetch} />

      {isError && !isLoading ? (
        <AlertMessage
          icon={AlertTriangleIcon}
          message={errorTransformer(error).message}
          action={{ label: "Retry", handler: () => refetch() }}
        />
      ) : null}

      {comments.length > 0 ? (
        <CommentsRenderer comments={comments} handleReloadComments={() => refetch()} />
      ) : null}
    </section>
  );
}
