import { useAppContext } from "@/context/app-context";
import { errorTransformer } from "@/lib/error";
import { cn } from "@/lib/utils";
import { RootState } from "@/state/store";
import { SubmitEvent } from "@/types";
import { PartyPopperIcon, XIcon } from "lucide-react";
import * as React from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { LoginRequest } from "./login-request";
import { AutosizeTextAreaRef, AutosizeTextarea } from "./ui/auto-size-textarea";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { LoadingButton } from "./ui/loading-button";

export type ReplyCommentProps = {
  commentId: string;
  postId: string;
  initialValue?: string;
  close: () => void;
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
        url: _props.initialValue
          ? `/api/v1/comments/${_props.commentId}`
          : `/api/v1/comments/${_props.postId}`,
        data: { content: value, replyId: _props.commentId }
      });
      setValue("");
      await _props.handleReloadComments();
      _props.close();
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
          <Label htmlFor={"reply-comment"} className='text-base'>
            {_props.initialValue ? `Editing your comment` : `Reply to ${_props.user.name}`}
          </Label>
          <AutosizeTextarea
            id='reply-comment'
            value={value}
            disabled={!auth.id || isLoading}
            onChange={(e) => setValue(e.target.value)}
            placeholder='Type your amazing reply here.'
          />
          <span
            className={cn("self-end text-sm font-medium", {
              "text-destructive": value.length <= 3 || value.length > 512
            })}>
            {value.length} / 512
          </span>
        </div>
        <div className=' flex w-fit flex-nowrap items-center gap-2 self-end'>
          <Button variant={"ghost"} onClick={_props.close} type='button'>
            <XIcon className='mr-2 h-auto w-4' />
            <span>Cancel</span>
          </Button>
          <LoadingButton
            disabled={!auth.id || value.length <= 3 || value.length > 512}
            loading={isLoading}
            type='submit'
            className='w-fit self-end'>
            <PartyPopperIcon className='mr-2 h-auto w-4' />
            <span>{_props.initialValue ? `Save` : `Reply & Publish`}</span>
          </LoadingButton>
        </div>
      </form>
    </>
  );
};
