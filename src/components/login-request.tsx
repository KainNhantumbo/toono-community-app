import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";
import { ArrowRight, XIcon } from "lucide-react";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

export const LoginRequest = ({
  isOpen,
  setIsOpen
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const navigate = useNavigate();

  return (
    <AlertDialog open={isOpen} onOpenChange={(state) => setIsOpen(state)}>
      <AlertDialogContent className='font-sans-body'>
        <AlertDialogHeader>
          <AlertDialogTitle className='font-sans'>Login</AlertDialogTitle>
          <AlertDialogDescription>
            You need to be logged to complete this action.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button variant={"ghost"}>
              <XIcon className='mr-2 h-auto w-4' />
              <span>Cancel</span>
            </Button>
          </AlertDialogCancel>
          <AlertDialogAction onClick={() => navigate("/auth/sign-in")} asChild>
            <Button variant={"default"}>
              <ArrowRight className='mr-2 h-auto w-4' />
              <span>Go to login page</span>
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
