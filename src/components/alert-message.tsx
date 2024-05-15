import { HugeIconType } from "@/types";
import type { LucideIcon } from "lucide-react";
import type { FC } from "react";
import { Button } from "./ui/button";

export type Props = {
  message: string;
  icon: LucideIcon | HugeIconType;
  action?: { handler: () => void | Promise<unknown>; label: string };
};

export const AlertMessage: FC<Props> = ({ message, icon: Icon, action }) => (
  <div className='flex w-full flex-col items-center gap-4 px-4 py-12 font-sans'>
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
