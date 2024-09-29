import { Layout } from "@/components/layout";
import { Meteors } from "@/components/meteors-effect";
import { useDocumentTitle } from "@uidotdev/usehooks";

export default function UpdateCredentialsSuccessPage() {
  useDocumentTitle("Update Credentials - Toono Community");

  return (
    <Layout>
      <main className='flex min-h-[80vh] w-full flex-col gap-12 px-4 '>
        <section className='m-auto w-full max-w-5xl p-4 mobile-x:p-8'>
          <div className=' mx-auto flex w-full flex-col justify-between gap-12 pt-10 md:p-0'>
            <div className='relative flex w-full flex-col gap-4'>
              <Meteors />
              <h1 className='max-w-md font-bold leading-normal sm:text-4xl'>
                An email with update your account credentials instructions has been sent to
                your email address.
              </h1>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
