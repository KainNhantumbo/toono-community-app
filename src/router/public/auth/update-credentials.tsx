import { Layout } from "@/components/layout";
import { Spotlight } from "@/components/spotlight-effect";
import * as CoreForm from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoadingButton } from "@/components/ui/loading-button";
import httpClient from "@/config/http-client";
import { useThemeContext } from "@/context/theme-context";
import { errorTransformer } from "@/lib/error";
import { UpdateUserCredentialsSchemaType, updateUserCredentialsSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDocumentTitle } from "@uidotdev/usehooks";
import { LockIcon, MailIcon, SendHorizontalIcon } from "lucide-react";
import * as React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";

export default function UpdateCredentialsPage() {
  const navigate = useNavigate();
  const { theme } = useThemeContext();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [searchParams] = useSearchParams(window.location.search);

  const form = useForm<UpdateUserCredentialsSchemaType>({
    resolver: zodResolver(updateUserCredentialsSchema),
    defaultValues: { password: "", confirm_password: "" }
  });

  const onSubmit = async (formData: UpdateUserCredentialsSchemaType) => {
    setLoading(true);
    try {
      await httpClient({
        method: "post",
        url: "/api/v1/auth/update-credentials",
        data: {
          password: formData.password,
          token: searchParams.get("token")
        }
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

  useDocumentTitle("Password Recovery Request - Toono Community");

  return (
    <Layout>
      <main className='flex w-full flex-col gap-12 px-4'>
        <div className='mx-auto w-full max-w-md p-4 shadow-input md:p-8'>
          <Spotlight
            fill={theme === "light" ? "#FACC15AA" : "#FACC15AA"}
            className='max-h-[100%]'
          />

          <section className='my-2 mb-4 space-y-3 text-center'>
            <h1>Update Credentials</h1>

            <h2 className='text-lg'>
              Complete the form below to update your account password.
            </h2>
          </section>

          <CoreForm.Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='max my-auto h-full w-full space-y-8'>
              <CoreForm.FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <CoreForm.FormItem>
                    <CoreForm.FormLabel className='flex items-center gap-2'>
                      <MailIcon className='h-5 w-auto' />
                      <span>Password</span>
                    </CoreForm.FormLabel>
                    <CoreForm.FormControl>
                      <Input
                        disabled={loading}
                        placeholder='Enter your new password'
                        type='password'
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
                  <CoreForm.FormItem>
                    <CoreForm.FormLabel className='flex items-center gap-2'>
                      <LockIcon className='h-5 w-auto' />
                      <span>Confirm Password</span>
                    </CoreForm.FormLabel>
                    <CoreForm.FormControl>
                      <Input
                        disabled={loading}
                        placeholder='Confirm your password'
                        type='password'
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
