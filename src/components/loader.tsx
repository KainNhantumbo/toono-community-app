import { LOADING_SCREEN_MESSAGES } from "@/shared/constants";
import { Spinner } from "./ui/spinner";
import { cn } from "@/lib/utils";

const randomMessage = (): string => {
  return LOADING_SCREEN_MESSAGES[
    Math.floor(Math.random() * LOADING_SCREEN_MESSAGES.length)
  ];
};

type Props = { message?: string; className?: string };

export const Loader = ({ className, message }: Props) => (
  <div
    className={cn(
      "grid h-[100vh] w-[100vw] place-content-center place-items-center",
      className
    )}>
    <section className='flex h-full w-full items-center gap-3 p-[calc(25%_-_1px)_12px] font-medium'>
      <Spinner show size={"medium"} />
      <h3 className='base-border font-sans-display rounded-3xl p-1 px-2 text-center text-sm font-semibold uppercase'>
        {message ?? randomMessage()}
      </h3>
    </section>
  </div>
);
