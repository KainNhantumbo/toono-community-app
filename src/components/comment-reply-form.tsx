import { useAppContext } from "@/context/app-context";
import { errorTransformer } from "@/lib/error";
import { RootState } from "@/state/store";
import { PartyPopperIcon } from "lucide-react";
import * as React from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { LoginRequest } from "./login-request";
import { AutosizeTextarea } from "./ui/auto-size-textarea";
import { LoadingButton } from "./ui/loading-button";
import { SubmitEvent } from "@/types";
import { Label } from "./ui/label";

export type ReplyCommentProps = {
  commentId: string;
  initialValue?: string;
  user: { id: string; name: string; profile_image: { url: string } | null };
  handleReloadComments: () => void | Promise<unknown>;
};

export const ReplyComment = (_props: ReplyCommentProps) => {
  const auth = useSelector((state: RootState) => state.auth);
  const { client } = useAppContext();
  const [value, setValue] = React.useState<string>(_props.initialValue || "");
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isRequestLoginOpen, setIsRequestLoginOpen] = React.useState<boolean>(false);

  const onSubmit = async (e: SubmitEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await client({
        method: _props.initialValue ? "patch" : "post",
        url: `/api/v1/comments/${_props.commentId}`,
        data: { content: value, replyId: _props.commentId }
      });
      setValue("");
      await _props.handleReloadComments();
    } catch (error) {
      const { message } = errorTransformer(error);
      console.error(error);
      console.warn(message);
      toast.error(message, {
        action: { label: "Retry", onClick: () => onSubmit(e) }
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
        onSubmit={onSubmit}
        aria-disabled={!auth.id || isLoading}>
        <div className='flex flex-col gap-2'>
          <Label htmlFor={"reply-comment"}>Reply</Label>
          <AutosizeTextarea
            id='reply-comment'
            value={value}
            disabled={!auth.id || isLoading}
            onChange={(e) => setValue(e.target.value)}
            placeholder='Type your amazing reply here.'
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
