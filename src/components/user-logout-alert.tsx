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
import httpClient from "@/config/http-client";
import { errorTransformer } from "@/lib/error";
import { cn } from "@/lib/utils";
import { initialAuthState, mutateAuth } from "@/state/slices/auth";
import { AppDispatch } from "@/state/store";
import { CheckIcon, LogOutIcon, XIcon } from "lucide-react";
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
    <AlertDialog open={isOpen} onOpenChange={(state) => setOpen(state)}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Log out</AlertDialogTitle>
          <AlertDialogDescription>
            Do you really want to exit this session and log out?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button variant={"ghost"}>
              <XIcon className='mr-2 h-auto w-4' />
              <span>Cancel</span>
            </Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button onClick={onSignOut}>
              <LogOutIcon className='mr-2 h-auto w-4' />
              <span>Yes, log out.</span>
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
