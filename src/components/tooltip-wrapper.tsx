import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";
import type { FC, ReactNode } from "react";

export type TooltipProps = {
  children: ReactNode;
  content: string;
  offsetDistance?: number | undefined;
};

export const TooltipWrapper: FC<TooltipProps> = ({ offsetDistance, children, content }) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild={true}>{children}</TooltipTrigger>
      <TooltipContent className='border bg-background' sideOffset={offsetDistance}>
        <p className='text-card-foreground'>{content}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);
