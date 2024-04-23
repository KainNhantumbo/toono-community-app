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
import type { FC } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "./ui/button";

export const UserLogoutAlert: FC = () => {
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
    <AlertDialog>
      <AlertDialogTrigger
        className={cn(
          "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
          "w-full hover:bg-muted"
        )}>
        <LogOutIcon className='mr-2 h-auto w-4 ' />
        <span>Log out</span>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className='font-sans'>Log out</AlertDialogTitle>
          <AlertDialogDescription>
            Do you really want to exit this session and log out?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction asChild>
            <Button
              variant={"secondary"}
              onClick={onSignOut}
              className='group bg-primary shadow-none hover:bg-primary'>
              <CheckIcon className='mr-2 h-auto w-4 stroke-white  transition-colors group-hover:stroke-blue-400' />
              <span className='text-white transition-colors group-hover:text-blue-400'>
                Yes, log out.
              </span>
            </Button>
          </AlertDialogAction>
          <AlertDialogCancel asChild>
            <Button className='group border-none shadow-none' variant={"ghost"}>
              <XIcon className='mr-2 h-auto w-4  transition-colors group-hover:stroke-destructive' />
              <span className=' transition-colors group-hover:text-destructive'>
                Cancel
              </span>
            </Button>
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
