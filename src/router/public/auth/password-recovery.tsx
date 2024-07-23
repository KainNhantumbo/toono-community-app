import { Layout } from "@/components/layout";
import { Spotlight } from "@/components/spotlight-effect";
import * as CoreForm from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoadingButton } from "@/components/ui/loading-button";
import httpClient from "@/config/http-client";
import { useThemeContext } from "@/context/theme-context";
import { errorTransformer } from "@/lib/error";
import { UserPasswordRecoveryType, userLoginSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDocumentTitle } from "@uidotdev/usehooks";
import { MailIcon, SendHorizontalIcon } from "lucide-react";
import * as React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function PasswordRecoveryPage() {
  const navigate = useNavigate();
  const { theme } = useThemeContext();
  const [loading, setLoading] = React.useState<boolean>(false);

  const form = useForm<UserPasswordRecoveryType>({
    resolver: zodResolver(userLoginSchema),
    defaultValues: { email: "" }
  });

  const onSubmit = async (formData: UserPasswordRecoveryType) => {
    setLoading(true);
    try {
      await httpClient({
        method: "post",
        url: "/api/v1/auth/password-recovery",
        data: formData,
      });
      navigate(`/users/dashboard/password-recovery-success`);
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

  useDocumentTitle("Password Recovery - Toono Community");

  return (
    <Layout>
      <main className='flex w-full flex-col gap-12 px-4'>
        <div className='mx-auto w-full max-w-md p-4 shadow-input md:p-8'>
          <Spotlight
            fill={theme === "light" ? "#FACC15AA" : "#FACC15AA"}
            className='max-h-[100%]'
          />

          <section className='my-2 mb-4 space-y-3 text-center'>
            <h1>Recovery your account</h1>

            <h2 className="text-lg">Forgot your password? We got you covered.</h2>

            <p className="my-2">
              No worries... We'll email you instructions to recover your account by
              resetting the password.
            </p>
          </section>

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

              <LoadingButton
                variant={"default"}
                loading={loading}
                size={"lg"}
                className='flex w-full items-center gap-2'
                type='submit'>
                <SendHorizontalIcon className='h-auto w-4' />
                <span className='font-semibold'>Submit</span>
              </LoadingButton>
            </form>
          </CoreForm.Form>
        </div>
      </main>
    </Layout>
  );
}
