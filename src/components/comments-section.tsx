import * as React from "react";
import client from "@/config/http-client";
import { LoginRequest } from "./login-request";
import { RootState } from "@/state/store";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { errorTransformer } from "@/lib/error";
import { toast } from "sonner";
import { Separator } from "./ui/separator";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { LoadingButton } from "./ui/loading-button";
import { PartyPopperIcon } from "lucide-react";
import { useAppContext } from "@/context/app-context";
import { SubmitEvent, Comment } from "@/types";

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
        toast.error(message, { action: { label: "Retry", onClick: () => refetch() } });
        throw error;
      }
    }
  });

  const handleUpdateComment = async (commentId: string) => {};
  const handleDeleteComment = async (commentId: string) => {};

  React.useEffect(() => {
    if (data && !isError) setComments(data);
  }, [data]);

  React.useEffect(() => {
    console.info("mounted", comments);
  }, [postId, comments]);

  return (
    <section
      key={postId}
      className='mx-auto w-full max-w-[820px] rounded-lg border bg-input/30 p-3'>
      <h2>Comments ({comments.length})</h2>
      <Separator decorative className='my-3' />
      <CommentForm postId={postId} handleReloadComments={refetch} />

      <section></section>
    </section>
  );
}

export const CommentForm = ({
  postId,
  handleReloadComments
}: {
  postId: string;
  handleReloadComments: () => void | Promise<unknown>;
}) => {
  const auth = useSelector((state: RootState) => state.auth);
  const { client } = useAppContext();
  const [value, setValue] = React.useState<string>("");
  const [isRequestLoginOpen, setIsRequestLoginOpen] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const handleCreateComment = async (e: SubmitEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await client({
        method: "post",
        url: `/api/v1/comments/${postId}`,
        data: { content: value }
      });
      setValue("");
      await handleReloadComments();
    } catch (error) {
      const { message } = errorTransformer(error);
      console.error(error);
      console.warn(message);
      toast.error(message, {
        action: { label: "Retry", onClick: () => handleCreateComment(e) }
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <LoginRequest isOpen={isRequestLoginOpen} setIsOpen={setIsRequestLoginOpen} />
      <form
        className='flex flex-col gap-3 rounded-lg border p-3'
        onSubmit={handleCreateComment}
        aria-disabled={!auth.id || isLoading}>
        <div className='flex flex-col gap-2'>
          <Label htmlFor={`new-comment`}>Add comment</Label>
          <Textarea
            disabled={!auth.id || isLoading}
            onChange={(e) => setValue(e.target.value)}
            value={value}
            id='new-comment'
          />
        </div>
        <LoadingButton
          disabled={!auth.id}
          loading={isLoading}
          type='submit'
          className='w-fit self-end'>
          <PartyPopperIcon className='mr-2 h-auto w-4' />
          <span>Publish</span>
        </LoadingButton>
      </form>
    </>
  );
};
