import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { Loader2 } from "lucide-react";
import * as React from "react";
import { ButtonProps, buttonVariants } from "./button";

const LoadingButton = React.forwardRef<
  HTMLButtonElement,
  ButtonProps & { loading: boolean }
>(({ className, variant, size, asChild = false, loading, children, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      disabled={loading}
      ref={ref}
      {...props}>
      <>
        {loading && <Loader2 className={cn("h-4 w-4 animate-spin", children && "mr-2")} />}
        {children}
      </>
    </Comp>
  );
});

LoadingButton.displayName = "LoadingButton";

export { buttonVariants, LoadingButton };
