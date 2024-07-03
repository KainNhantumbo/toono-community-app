import { Layout } from "@/components/layout";
import { Spotlight } from "@/components/spotlight-effect";
import { Button } from "@/components/ui/button";
import * as CoreForm from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoadingButton } from "@/components/ui/loading-button";
import { Separator } from "@/components/ui/separator";
import httpClient from "@/config/http-client";
import { useThemeContext } from "@/context/theme-context";
import { errorTransformer } from "@/lib/error";
import { UserLoginType, userLoginSchema } from "@/schemas";
import { metadata } from "@/shared/constants";
import { mutateAuth } from "@/state/slices/auth";
import { AppDispatch } from "@/state/store";
import { Auth } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { LockIcon, LockOpen, MailIcon, UserPlus } from "lucide-react";
import * as React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { toast } from "sonner";

export default function SigninPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { theme } = useThemeContext();
  const [loading, setLoading] = React.useState(false);

  const form = useForm<UserLoginType>({
    resolver: zodResolver(userLoginSchema),
    defaultValues: { email: "", password: "" }
  });

  const onSubmit = async (formData: UserLoginType) => {
    setLoading(true);
    try {
      const { data } = await httpClient<Auth>({
        method: "post",
        url: "/api/v1/auth/sign-in",
        data: formData,
        withCredentials: true
      });
      dispatch(mutateAuth({ ...data }));
      navigate(`/users/dashboard/overview`);
    } catch (error) {
      const { message } = errorTransformer(error);
      console.error(message);
      toast.error(message, {
        action: { label: "Retry", onClick: () => onSubmit(formData) }
      });
    } finally {
      setLoading(false);
    }
  };

  // github auth flow
  const [githubCode, setGithubCode] = React.useState("");
  const [params] = useSearchParams(window.location.search);
  const code = params.get("code");

  const onGithubAuth = async () => {
    try {
      if (code) {
        const scope = "read:user";
        await httpClient.get(`/api/v1/auth/oauth/github/${code}/${scope}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    onGithubAuth();
  }, [code]);

  const handleRedirectToGitHub = () => {
    const queryParams = new URLSearchParams({
      client_id: import.meta.env.VITE_GITHUB_CLIENT_ID,
      scope: "read:user"
    });
    const authUrl = `https://github.com/login/oauth/authorize?${queryParams.toString()}`;
    window.location.href = authUrl;
  };

  return (
    <Layout>
      <main className='flex w-full flex-col gap-12 px-4'>
        <div className='mx-auto w-full max-w-md p-4 shadow-input md:p-8'>
          <Spotlight
            fill={theme === "light" ? "#FACC15AA" : "#FACC15AA"}
            className='max-h-[100%]'
          />

          <h2 className='text-center text-4xl font-bold'>
            Welcome back to {metadata.appName} Community
          </h2>

          <div className='my-5 flex flex-col space-y-3'>
            <Button variant={"default"} onClick={handleRedirectToGitHub}>
              <GitHubLogoIcon className='mr-2 h-4 w-4' />
              <span className='text-sm'>Login with GitHub</span>
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
                variant={"default"}
                loading={loading}
                size={"lg"}
                className='flex w-full items-center gap-2'
                type='submit'>
                <LockOpen className='h-auto w-4' />
                <span className='font-semibold'>Sign in</span>
              </LoadingButton>
            </form>
          </CoreForm.Form>
        </div>
      </main>
    </Layout>
  );
}
