import * as Alert from "@/components/ui/alert-dialog";
import { useAppContext } from "@/context/app-context";
import { errorTransformer } from "@/lib/error";
import { DEFAULT_ERROR_MESSAGE } from "@/shared/constants";
import { initialAuthState, mutateAuth } from "@/state/slices/auth";
import { AppDispatch } from "@/state/store";
import { HttpError } from "@/types";
import { Trash2Icon, UserXIcon, XIcon } from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "./ui/button";

export const DeleteAccountAlert = () => {
  const { client } = useAppContext();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const onDelete = async () => {
    try {
      await client({ method: "delete", url: `/api/v1/users` });
      dispatch(mutateAuth(initialAuthState));
      navigate("/");
    } catch (error) {
      const { message } = errorTransformer(error as HttpError);
      toast.error(message || DEFAULT_ERROR_MESSAGE, {
        action: { onClick: () => onDelete(), label: "Retry" }
      });
      console.error(message || error);
    }
  };

  return (
    <Alert.AlertDialog>
      <Alert.AlertDialogTrigger asChild>
        <Button variant={"destructive"}>
          <Trash2Icon className='mr-2 h-auto w-4 stroke-destructive-foreground' />
          <span>Delete Account</span>
        </Button>
      </Alert.AlertDialogTrigger>
      <Alert.AlertDialogContent className='font-sans-body'>
        <Alert.AlertDialogHeader>
          <Alert.AlertDialogTitle className='font-sans'>
            Delete User Account
          </Alert.AlertDialogTitle>
          <Alert.AlertDialogDescription>
            This will permanently delete your account and all data related to it. This
            action cannot be undone.
          </Alert.AlertDialogDescription>
        </Alert.AlertDialogHeader>
        <Alert.AlertDialogFooter>
          <Alert.AlertDialogCancel className='flex items-center gap-2 shadow-none'>
            <XIcon className='mr-2 h-auto w-4' />
            <span>Cancel</span>
          </Alert.AlertDialogCancel>
          <Alert.AlertDialogAction onClick={onDelete} asChild>
            <Button
              variant={"destructive"}
              className='bg-destructive hover:bg-destructive/60'>
              <UserXIcon className='mr-2 h-auto w-4 stroke-destructive-foreground' />
              <span className='text-destructive-foreground'>Confirm</span>
            </Button>
          </Alert.AlertDialogAction>
        </Alert.AlertDialogFooter>
      </Alert.AlertDialogContent>
    </Alert.AlertDialog>
  );
};
