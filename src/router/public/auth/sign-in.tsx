import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import * as CoreForm from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoadingButton } from "@/components/ui/loading-button";
import { Separator } from "@/components/ui/separator";
import httpClient from "@/config/http-client";
import { errorTransformer } from "@/lib/error";
import { UserLoginType, userLoginSchema } from "@/schemas";
import { metadata } from "@/shared/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { LockIcon, LockOpen, MailIcon, UserPlus } from "lucide-react";
import * as React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

export default function SigninPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);

  const form = useForm<UserLoginType>({
    resolver: zodResolver(userLoginSchema),
    defaultValues: { email: "", password: "" }
  });

  const onSubmit = async (data: UserLoginType) => {
    setLoading(true);
    try {
      await httpClient({
        method: "post",
        url: "/api/v1/auth/sign-in",
        data,
        withCredentials: true
      });
      navigate(`/users/dashboard/overview`);
    } catch (error) {
      const { message } = errorTransformer(error);
      console.error(message);
      // TODO: ADD TOAST HERE
      // toast.error(message, {
      //   action: {
      //     label: "Retry",
      //     onClick: () => onSubmit(data)
      //   }
      // });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <main className='flex w-full flex-col gap-12 px-4'>
        <div className='mx-auto w-full max-w-md p-4 shadow-input md:p-8'>
          <h2 className='text-center text-4xl font-bold'>
            Welcome back to {metadata.appName} Community
          </h2>

          <div className='my-5 flex flex-col space-y-3'>
            <Button variant={"default"}>
              <GitHubLogoIcon className='mr-2 h-4 w-4' />
              <span className='text-sm text-white'>Login with GitHub</span>
            </Button>
            <Button asChild variant={"secondary"}>
              <Link to={"/auth/sign-up"}>
                <UserPlus className='mr-2 h-4 w-4' />
                <span>Or create account</span>
              </Link>
            </Button>
          </div>

          <Separator decorative className='my-5' />

          <p className='my-3 max-w-sm space-y-6 text-center text-sm'>
            Or complete the form below to access your account.
          </p>

          <CoreForm.Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='max my-auto h-full w-full space-y-8'>
              <CoreForm.FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <CoreForm.FormItem>
                    <CoreForm.FormLabel className='flex items-center gap-2'>
                      <MailIcon className='h-5 w-auto' />
                      <span>Email</span>
                    </CoreForm.FormLabel>
                    <CoreForm.FormControl>
                      <Input
                        disabled={loading}
                        placeholder='Enter your email'
                        type='email'
                        {...field}
                      />
                    </CoreForm.FormControl>
                    <CoreForm.FormMessage />
                  </CoreForm.FormItem>
                )}
              />

              <CoreForm.FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <CoreForm.FormItem className='w-full'>
                    <CoreForm.FormLabel className='flex items-center gap-2'>
                      <LockIcon className='h-5 w-auto' />
                      <span>Password</span>
                    </CoreForm.FormLabel>
                    <CoreForm.FormControl>
                      <Input
                        disabled={loading}
                        type='password'
                        placeholder='Enter your password'
                        {...field}
                      />
                    </CoreForm.FormControl>
                    <CoreForm.FormMessage />
                  </CoreForm.FormItem>
                )}
              />
              <LoadingButton
                loading={loading}
                variant={"default"}
                size={"lg"}
                className='flex w-full items-center gap-2'
                type='submit'>
                <LockOpen className='w-4 stroke-white' />
                <span className='font-semibold text-white'>Sign in</span>
              </LoadingButton>
            </form>
          </CoreForm.Form>
        </div>
      </main>
    </Layout>
  );
}
