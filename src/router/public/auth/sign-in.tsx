import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoadingButton } from "@/components/ui/loading-button";
import { Separator } from "@/components/ui/separator";
import httpClient from "@/config/http-client";
import { errorTransformer } from "@/lib/error";
import { UserLoginType, userLoginSchema } from "@/schemas";
import { metadata } from "@/shared/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { ArrowRight, LockIcon, LockOpen, MailIcon, User2Icon } from "lucide-react";
import * as React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

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

          <div className='my-4 flex flex-col'>
            <Button variant={"default"}>
              <GitHubLogoIcon className='mr-2 h-4 w-4' />
              <span className='text-sm text-white'>Login with GitHub</span>
            </Button>
          </div>

          <Separator decorative className='my-5' />

          <p className='my-3 max-w-sm space-y-6 text-center text-sm'>
            Or complete the form below to access your account.
          </p>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='max my-auto h-full w-full space-y-8'>
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='flex items-center gap-2'>
                      <MailIcon className='h-5 w-auto' />
                      <span>Email</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder='Enter your email'
                        type='email'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormLabel className='flex items-center gap-2'>
                      <LockIcon className='h-5 w-auto' />
                      <span>Password</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        type='password'
                        placeholder='Enter your password'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
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
          </Form>
        </div>
      </main>
    </Layout>
  );
}
