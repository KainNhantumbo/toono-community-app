import * as Alert from "@/components/ui/alert-dialog";
import httpClient from "@/config/http-client";
import { errorTransformer } from "@/lib/error";
import { initialAuthState, mutateAuth } from "@/state/slices/auth";
import { AppDispatch } from "@/state/store";
import { LogOutIcon, XIcon } from "lucide-react";
import * as React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "./ui/button";

type Props = { isOpen: boolean; setOpen: React.Dispatch<React.SetStateAction<boolean>> };

export const UserLogoutAlert = ({ isOpen, setOpen }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const onSignOut = async () => {
    try {
      await httpClient({
        method: "post",
        url: "/api/v1/auth/sign-out",
        withCredentials: true
      });
      dispatch(mutateAuth({ ...initialAuthState }));
      navigate("/");
    } catch (error) {
      const { message } = errorTransformer(error);
      console.error(error);
      console.warn(message);
      toast.error(message, { action: { label: "Retry", onClick: onSignOut } });
    }
  };
  return (
    <Alert.AlertDialog open={isOpen} onOpenChange={(state) => setOpen(state)}>
      <Alert.AlertDialogContent>
        <Alert.AlertDialogHeader>
          <Alert.AlertDialogTitle>Log out</Alert.AlertDialogTitle>
          <Alert.AlertDialogDescription>
            Do you really want to exit this session and log out?
          </Alert.AlertDialogDescription>
        </Alert.AlertDialogHeader>
        <Alert.AlertDialogFooter>
          <Alert.AlertDialogCancel asChild>
            <Button variant={"ghost"}>
              <XIcon className='mr-2 h-auto w-4' />
              <span>Cancel</span>
            </Button>
          </Alert.AlertDialogCancel>
          <Alert.AlertDialogAction asChild>
            <Button onClick={onSignOut}>
              <LogOutIcon className='mr-2 h-auto w-4' />
              <span>Yes, log out.</span>
            </Button>
          </Alert.AlertDialogAction>
        </Alert.AlertDialogFooter>
      </Alert.AlertDialogContent>
    </Alert.AlertDialog>
  );
};
