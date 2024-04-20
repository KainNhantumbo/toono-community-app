import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Meteors } from "@/components/meteors-effect";
import { Layout } from "@/components/layout";

export default function SignupSuccessPage() {
  return (
    <Layout>
      <main className=' flex min-h-[80vh] w-full flex-col gap-12 px-4 '>
        <section className='m-auto w-full max-w-5xl p-4 mobile-x:p-8'>
          <div className=' mx-auto flex w-full flex-col justify-between gap-12 pt-10 md:p-0'>
            <div className='relative flex w-full flex-col gap-4'>
              <Meteors />
              <h1 className='max-w-md font-bold leading-normal sm:text-4xl'>
                Congratulations! You have successfully created your account.
              </h1>
              <p className='font-sm max-w-2xl'>
                Please click the button below to access your account.
              </p>

              <Button asChild>
                <Link to={"/auth/sign-in"} className='flex w-fit items-center gap-2'>
                  <ArrowRight className='h-auto w-5 stroke-white' />
                  <span className='font-semibold text-white'>Proceed</span>
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
