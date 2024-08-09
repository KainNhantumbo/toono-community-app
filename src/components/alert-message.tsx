import { HugeIconType } from "@/types";
import type { LucideIcon } from "lucide-react";
import type { FC } from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

export type Props = {
  message: string;
  icon: LucideIcon | HugeIconType;
  className?: string;
  action?: { handler: () => void | Promise<unknown>; label: string };
};

export const AlertMessage: FC<Props> = ({ className, message, icon: Icon, action }) => (
  <div
    className={cn(
      "flex w-full flex-col items-center gap-4 px-4 py-12 font-sans",
      className
    )}>
    <Icon className='h-auto w-12' />
    <p className='text-md mx-auto w-full max-w-[380px] text-center font-medium'>
      {message}
    </p>
    {action ? (
      <Button variant={"default"} onClick={action.handler}>
        {action.label}
      </Button>
    ) : null}
  </div>
);
