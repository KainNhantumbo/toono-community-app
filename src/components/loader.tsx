import { LOADING_SCREEN_MESSAGES } from "@/shared/constants";
import { Spinner } from "./ui/spinner";

const randomMessage = (): string => {
  return LOADING_SCREEN_MESSAGES[
    Math.floor(Math.random() * LOADING_SCREEN_MESSAGES.length)
  ];
};

export const Loader = () => (
  <div className='grid h-[100vh] w-[100vw] place-content-center place-items-center'>
    <section className='flex h-full w-full items-center gap-3 p-[calc(25%_-_1px)_12px] font-medium'>
      <Spinner show size={"medium"} />
      <h3 className='base-border font-sans-display rounded-3xl p-1 px-2 text-center text-sm font-semibold uppercase'>
        {randomMessage()}
      </h3>
    </section>
  </div>
);
