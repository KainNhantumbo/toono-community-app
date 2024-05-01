import * as Alert from "@/components/ui/alert-dialog";
import { useAppContext } from "@/context/app-context";
import { errorTransformer } from "@/lib/error";
import { Trash2, XIcon } from "lucide-react";
import * as React from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { LoadingButton } from "./ui/loading-button";

export type CommentDeleteProps = {
  commentId: string;
  handleReloadComments: () => void;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const DeleteCommentAlert = (_props: CommentDeleteProps) => {
  const { client } = useAppContext();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await client({ method: "delete", url: `/api/v1/comments/${_props.commentId}` });
      _props.handleReloadComments();
    } catch (error) {
      const { message } = errorTransformer(error);
      console.error(error);
      console.warn(message);
      toast.error(message, { action: { label: "Retry", onClick: () => handleDelete() } });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Alert.AlertDialog
      open={_props.isOpen}
      onOpenChange={(state) => _props.setIsOpen(state)}>
      <Alert.AlertDialogContent className='font-sans-body'>
        <Alert.AlertDialogHeader>
          <Alert.AlertDialogTitle className='font-sans'>
            Delete Comment
          </Alert.AlertDialogTitle>
          <Alert.AlertDialogDescription>
            Delete this comment? This action cannot be undone.
          </Alert.AlertDialogDescription>
        </Alert.AlertDialogHeader>
        <Alert.AlertDialogFooter>
          <Alert.AlertDialogCancel asChild>
            <Button variant={"ghost"}>
              <XIcon className='mr-2 h-auto w-4' />
              <span>Cancel</span>
            </Button>
          </Alert.AlertDialogCancel>
          <Alert.AlertDialogAction onClick={handleDelete} asChild>
            <LoadingButton
              loading={isLoading}
              variant={"destructive"}
              className='bg-destructive hover:bg-destructive/60'>
              <Trash2 className='mr-2 h-auto w-4 stroke-destructive-foreground' />
              <span className='text-destructive-foreground'>Confirm</span>
            </LoadingButton>
          </Alert.AlertDialogAction>
        </Alert.AlertDialogFooter>
      </Alert.AlertDialogContent>
    </Alert.AlertDialog>
  );
};
