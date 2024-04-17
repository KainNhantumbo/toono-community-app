import { metadata } from '@/shared/constants';
import { Link } from 'react-router-dom';

export const NotFoundPage = () => {
  return (
    <main className='w-full h-[100vh] grid place-content-center place-items-center'>
      <section className='logo-container'>
        <div className='font-sans-display text-3xl'>
          <span>{metadata.appName}</span>
        </div>
      </section>
      <section className='flex flex-col items-center gap-5'>
        <h1 className='font-sans-display font-bold text-center text-primary-default text-6xl leading-tight'>
          404
        </h1>
        <h2 className='font-bold uppercase font-sans text-error'>Page not found</h2>
        <p className='max-w-screen-mobile text-center font-sans normal-case font-medium'>
          But if you don't change your direction, and if you keep looking, you may end up
          where you are heading.
        </p>
        <Link
          to={'/'}
          replace
          className='rounded-lg font-medium font-sans border-solid border-[2px] border-font mt-5 p-3 px-5 hover:border-primary hover:text-primary transition-colors '>
          Take me back
        </Link>
      </section>
    </main>
  );
};
