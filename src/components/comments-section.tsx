import { CommentForm } from "@/components/comment-form";
import client from "@/config/http-client";
import { errorTransformer } from "@/lib/error";
import { Comment } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { AlertTriangleIcon } from "lucide-react";
import * as React from "react";
import { AlertMessage } from "./alert-message";
import { CommentsRenderer } from "./comment-renderer";
import { Separator } from "./ui/separator";

export default function CommentsSection({ postId }: { postId: string }) {
  const [comments, setComments] = React.useState<Comment[]>([]);

  const { data, refetch, error, isError, isLoading } = useQuery({
    queryKey: ["comments-section"],
    queryFn: async () => {
      try {
        if (!postId)
          throw new Error(
            "Warning: request canceled beacause this post id is not yet loaded."
          );
        const { data } = await client.get<Comment[]>(`/api/v1/comments/public/${postId}`);
        return data;
      } catch (error) {
        const { message } = errorTransformer(error);
        console.warn(message);
        throw error;
      }
    }
  });

  React.useEffect(() => {
    if (data && !isError) setComments(data);
  }, [data]);

  return (
    <section
      key={postId}
      className='mx-auto w-full max-w-[820px] p-1 mobile:rounded-lg mobile:border mobile:bg-input/30 mobile:p-3'>
      <h2>Comments ({comments.length})</h2>
      <p className='text-sm text-muted-foreground'>
        Feel free to contribute and share with our community!
      </p>

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
