import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { DEFAULT_ERROR_MESSAGE } from "@/shared/constants";
import { useRouteError } from "react-router-dom";
import { Button } from "./ui/button";

export const RouteErrorBoundary = () => {
  const error = useRouteError();
  console.error(error);

  if (error instanceof Error) {
    return (
      <Dialog
        modal
        defaultOpen
        onOpenChange={(isOpen) => {
          if (!isOpen) location.reload();
        }}>
        <DialogContent className='max-h-[400px] max-w-[320px] overflow-auto mobile:max-w-[580px]'>
          <DialogHeader>
            <DialogTitle>Oops! This is an error.</DialogTitle>
            <DialogDescription>{error.name}</DialogDescription>
          </DialogHeader>

          <div className='rounded-lg bg-destructive/5 p-3'>
            {error.stack ? error.stack : DEFAULT_ERROR_MESSAGE}
          </div>

          <DialogFooter>
            <DialogClose className='font-medium'>
              <Button className='font-medium' variant={"destructive"}>
                <span className='text-white'>Close</span>
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }
};
