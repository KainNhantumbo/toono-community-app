import { useAppContext } from "@/context/app-context";
import { errorTransformer } from "@/lib/error";
import { RootState } from "@/state/store";
import { SubmitEvent } from "@/types";
import { PartyPopperIcon } from "lucide-react";
import * as React from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { LoginRequest } from "./login-request";
import { AutosizeTextarea } from "./ui/auto-size-textarea";
import { Label } from "./ui/label";
import { LoadingButton } from "./ui/loading-button";
import { cn } from "@/lib/utils";
import { useCommentsSectionContext } from "./comments-section";

export const CommentForm = () => {
  const { postId, refetch } = useCommentsSectionContext();
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
      await refetch();
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
        className='flex flex-col gap-3 rounded-lg border bg-background p-3'
        onSubmit={handleCreateComment}
        aria-disabled={!auth.id || isLoading}>
        <div className='flex flex-col gap-2'>
          <Label htmlFor={"new-comment"} className='text-base'>
            Add comment
          </Label>
          <AutosizeTextarea
            id='new-comment'
            value={value}
            disabled={!auth.id || isLoading}
            onChange={(e) => setValue(e.target.value)}
            placeholder='Type your new amazing comment here.'
          />
          <span
            className={cn("self-end text-sm font-medium", {
              "text-destructive": value.length <= 3 || value.length > 512
            })}>
            {value.length} / 512
          </span>
        </div>
        <LoadingButton
          disabled={!auth.id || value.length <= 3 || value.length > 512}
          loading={isLoading}
          type='submit'
          className='w-fit self-end'>
          <PartyPopperIcon className='mr-2 h-auto w-4 dark:stroke-slate-800' />
          <span>Publish</span>
        </LoadingButton>
      </form>
    </>
  );
};
