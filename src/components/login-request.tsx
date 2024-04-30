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
import { Trash2Icon, XIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { TooltipWrapper } from "./tooltip-wrapper";
import { Button } from "./ui/button";

export const LoginRequest = () => {
  const navigate = useNavigate();

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
          <AlertDialogTitle className='font-sans'>Login</AlertDialogTitle>
          <AlertDialogDescription>
            You need to be logged to complete this action.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className='group flex items-center gap-2 rounded-lg border-none bg-transparent shadow-none'>
            <XIcon className='w-4 transition-colors group-hover:stroke-blue-400 group-active:stroke-blue-400' />
            <span className='capitalize transition-colors group-hover:text-blue-400'>
              Cancel
            </span>
          </AlertDialogCancel>
          <AlertDialogAction onClick={() => navigate("/auth/sign-in")} asChild>
            <Button variant={"default"}>
              <Trash2Icon className='stroke-muted' />
              <span>Confirm</span>
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
