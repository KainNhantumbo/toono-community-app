import { LOADING_SCREEN_MESSAGES } from "@/shared/constants";
import { RiseLoader } from "react-spinners";

const randomMessage = (): string => {
  return LOADING_SCREEN_MESSAGES[
    Math.floor(Math.random() * LOADING_SCREEN_MESSAGES.length)
  ];
};

export const Loader = () => (
  <div className='grid h-[100vh] w-[100vw] place-content-center place-items-center'>
    <section className='flex h-full w-full flex-col items-center gap-8 p-[calc(25%_-_1px)_12px] font-medium'>
      <h3 className='font-sans-display text-center text-lg font-medium uppercase'>
        {randomMessage()}
      </h3>
      <RiseLoader
        color={`rgb(var(--primary-default))`}
        cssOverride={{
          display: "block",
          background: `transparent})`
        }}
      />
    </section>
  </div>
);
