import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { useAppContext } from "@/context/app-context";
import { errorTransformer } from "@/lib/error";
import { DEFAULT_ERROR_MESSAGE } from "@/shared/constants";
import { mutateUserPosts } from "@/state/slices/users-posts";
import { AppDispatch, RootState } from "@/state/store";
import { HttpError } from "@/types";
import { Trash2Icon, XIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { TooltipWrapper } from "./tooltip-wrapper";
import { Button } from "./ui/button";

export const DeletePostAlert = ({ id }: { id: string }) => {
  const { client } = useAppContext();
  const dispatch = useDispatch<AppDispatch>();
  const posts = useSelector((state: RootState) => state.posts);

  const onDelete = async () => {
    try {
      await client({ method: "delete", url: `/api/v1/posts/${id}` });
      dispatch(mutateUserPosts(posts.filter((item) => item.id !== id)));
      toast.success("Post deleted.");
    } catch (error) {
      const { message } = errorTransformer(error as HttpError);
      toast.error(message || DEFAULT_ERROR_MESSAGE, {
        action: { onClick: () => onDelete(), label: "Retry" }
      });
      console.error(message || error);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={"ghost"}>
          <TooltipWrapper content='Delete product'>
            <Trash2Icon className='h-auto w-4' />
          </TooltipWrapper>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className='font-sans-body'>
        <AlertDialogHeader>
          <AlertDialogTitle className='font-sans'>Delete Post</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this post.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className='group flex items-center gap-2 rounded-lg border-none bg-transparent shadow-none'>
            <XIcon className='w-4 transition-colors group-hover:stroke-blue-400 group-active:stroke-blue-400' />
            <span className='capitalize transition-colors group-hover:text-blue-400'>
              Cancel
            </span>
          </AlertDialogCancel>
          <AlertDialogAction onClick={onDelete} asChild>
            <Button variant={"destructive"}>
              <Trash2Icon className='stroke-muted' />
              <span>Confirm</span>
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
