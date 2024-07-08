import { metadata } from "@/shared/constants";
import { Link } from "react-router-dom";
import { useDocumentTitle } from "@uidotdev/usehooks";

export default function NotFoundPage() {
  useDocumentTitle("404 - Page Not Found");

  return (
    <main className='grid h-[100vh] w-full place-content-center place-items-center'>
      <section className='logo-container'>
        <div className='font-sans-display text-3xl'>
          <span>{metadata.appName}</span>
        </div>
      </section>
      <section className='flex flex-col items-center gap-5'>
        <h1 className='font-sans-display text-primary-default text-center text-6xl font-bold leading-tight'>
          404
        </h1>
        <h2 className='text-error font-sans font-bold uppercase'>Page not found</h2>
        <p className='max-w-screen-mobile text-center font-sans font-medium normal-case'>
          But if you don't change your direction, and if you keep looking, you may end up
          where you are heading.
        </p>
        <Link
          to={"/"}
          replace
          className='mt-5 rounded-lg border-[2px] border-solid border-muted p-3 px-5 font-sans font-medium transition-colors hover:border-primary hover:text-primary '>
          Take me back
        </Link>
      </section>
    </main>
  );
}
