import { Layout } from "@/components/layout";
import { Meteors } from "@/components/meteors-effect";
import { Button } from "@/components/ui/button";
import { useDocumentTitle } from "@uidotdev/usehooks";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function UpdateCredentialsSuccessPage() {
  useDocumentTitle("Update Credentials Success - Toono Community");

  return (
    <Layout>
      <main className='flex min-h-[80vh] w-full flex-col gap-12 px-4 '>
        <section className='m-auto w-full max-w-5xl p-4 mobile-x:p-8'>
          <div className=' mx-auto flex w-full flex-col justify-between gap-12 pt-10 md:p-0'>
            <div className='relative flex w-full flex-col gap-4'>
              <Meteors />
              <h1 className='max-w-md font-bold leading-normal sm:text-4xl'>
                Congratulations! You have successfully updated your account credentials.
              </h1>
              <p className='font-sm max-w-2xl'>
                Please click the button below to access your account.
              </p>

              <Button asChild>
                <Link to={"/auth/sign-in"} className='flex w-fit items-center gap-2'>
                  <ArrowRight className='h-auto w-4' />
                  <span>Finish</span>
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
