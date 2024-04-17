import { RiseLoader } from 'react-spinners';


const randomMessage = (): string => {
  const messages: Array<string> = [
    'backing the ui',
    'enhancing developer experience',
    'preparing your environment'
  ];
  return messages[Math.floor(Math.random() * messages.length)];
};

export const Loader = () => (
  <div className='w-[100vw] h-[100vh] grid place-content-center place-items-center'>
    <section className='w-full h-full font-medium flex flex-col gap-8 items-center p-[calc(25%_-_1px)_12px]'>
      <h3 className='font-medium uppercase font-sans-display text-lg text-center'>
        {randomMessage()}
      </h3>
      <RiseLoader
        color={`rgb(var(--primary-default))`}
        cssOverride={{
          display: 'block',
          background: `transparent})`
        }}
      />
    </section>
  </div>
);
