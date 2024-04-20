import * as React from "react";

export const DotsBackground = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='relative flex h-[50rem] w-full  items-center justify-center bg-black/[0.2] bg-white dark:bg-black dark:bg-white/[0.2]'>
      {/* Radial gradient for the container to give a faded look */}
      <div className='pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black'></div>
      <p className='relative z-20 bg-gradient-to-b from-neutral-200 to-neutral-500 bg-clip-text py-8 text-4xl font-bold text-transparent sm:text-7xl'>
        {children}
      </p>
    </div>
  );
};
