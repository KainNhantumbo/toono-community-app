import { AlertMessage } from "@/components/alert-message";
import { Layout } from "@/components/layout";
import { Loader } from "@/components/loader";
import { TooltipWrapper } from "@/components/tooltip-wrapper";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Heading } from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import { LoadingButton } from "@/components/ui/loading-button";
import { useAppContext } from "@/context/app-context";
import { useUserDataQuery } from "@/hooks/use-user-data-query";
import { errorTransformer } from "@/lib/error";
import { UpdateUserDataType, UpdateUserSchema } from "@/schemas";
import { RootState } from "@/state/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { InstagramLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRightCircleIcon,
  Globe2,
  LockIcon,
  User2Icon
} from "lucide-react";
import * as React from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { Form } from "react-router-dom";
import { toast } from "sonner";

export default function Account() {
  const auth = useSelector((state: RootState) => state.auth);
  const { data, error, isLoading, refetch, isError } = useUserDataQuery();
  const [profileImage, setProfileImage] = React.useState<string>(() =>
    data.profile_image ? data.profile_image.url : ""
  );
  const [loading, setLoading] = React.useState<boolean>(false);
  const { client } = useAppContext();

  const form = useForm<UpdateUserDataType>({
    resolver: zodResolver(UpdateUserSchema),
    values: { ...(data as unknown as UpdateUserDataType) },
    disabled: isLoading
  });

  const onSubmit = async (data: UpdateUserDataType) => {
    try {
      setLoading(true);
      if (data.password && data.password.length > 0) {
        if (data.password !== data.confirm_password) {
          return toast.error("Passwords don't match. Please check and try again.");
        }
      }
      await client<UpdateUserDataType>({
        method: "patch",
        url: `/api/v1/users/${auth.id}`,
        data: { ...data }
      });
      toast.success("User data updated successfully.");
    } catch (error) {
      const { message } = errorTransformer(error);
      toast.error(message, {
        action: { label: "Retry", onClick: () => onSubmit(data) }
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <main className='mx-auto w-full max-w-4xl space-y-5 px-3'>
        <div className='flex items-center gap-5'>
          <TooltipWrapper content='Back'>
            <Button
              onClick={() => history.back()}
              variant={"outline"}
              size={"icon"}
              className='rounded-full'>
              <ArrowLeft className='h-auto w-6' />
            </Button>
          </TooltipWrapper>
          <Heading
            title='Account'
            description='Edit and update user account configurations'
          />
        </div>

        <section>
          {isLoading && !isError ? <Loader /> : null}
          {!isLoading && isError ? (
            <AlertMessage
              icon={AlertTriangle}
              action={{ handler: () => refetch(), label: "Retry" }}
              message={errorTransformer(error).message}
            />
          ) : null}

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='max my-auto h-full w-full space-y-8'>
              <div className='flex flex-col items-center justify-between gap-4 sm:flex-row'>
                <FormField
                  control={form.control}
                  name='name'
                  render={({ field }) => (
                    <FormItem className='w-full'>
                      <FormLabel className='flex items-center gap-2'>
                        <User2Icon className='h-5 w-auto' />
                        <span>Name</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder='Enter your full name'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='user_name'
                  render={({ field }) => (
                    <FormItem className='w-full'>
                      <FormLabel className='flex items-center gap-2'>
                        <User2Icon className='h-5 w-auto' />
                        <span>Username</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder='Enter your username'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name='biography'
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormLabel className='flex items-center gap-2'>
                      <User2Icon className='h-5 w-auto' />
                      <span>Bio</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder='Enter your biography'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='education'
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormLabel className='flex items-center gap-2'>
                      <User2Icon className='h-5 w-auto' />
                      <span>Your Education</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder='Enter your education details'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='learning'
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormLabel className='flex items-center gap-2'>
                      <User2Icon className='h-5 w-auto' />
                      <span>Your Learning</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder='Enter what are your currently learning'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='location'
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormLabel className='flex items-center gap-2'>
                      <User2Icon className='h-5 w-auto' />
                      <span>Your Location</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder='Enter your location'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='work'
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormLabel className='flex items-center gap-2'>
                      <User2Icon className='h-5 w-auto' />
                      <span>Your Current Work</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder='Enter your work details'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='available'
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormLabel className='flex items-center gap-2'>
                      <User2Icon className='h-5 w-auto' />
                      <span>Your Availability</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder='Enter your availability details for work'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='network.facebook'
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormLabel className='flex items-center gap-2'>
                      <User2Icon className='h-5 w-auto' />
                      <span>Your Facebook</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder='Enter your facebook profile link'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='network.github'
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormLabel className='flex items-center gap-2'>
                      <User2Icon className='h-5 w-auto' />
                      <span>Your Github</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder='Enter your github profile link'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='network.instagram'
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormLabel className='flex items-center gap-2'>
                      <InstagramLogoIcon className='h-5 w-auto' />
                      <span>Your Instagram</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder='Enter your instagram profile link'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='network.linkedin'
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormLabel className='flex items-center gap-2'>
                      <LinkedInLogoIcon className='h-5 w-auto' />
                      <span>Your LinkedIn</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder='Enter your LinkedIn profile link'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='network.website'
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormLabel className='flex items-center gap-2'>
                      <Globe2 className='h-5 w-auto' />
                      <span>Your Website</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder='Enter your website link'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <h3>
                Note: leave these fields below blank, if you don't want to update password.
              </h3>
              <div className='flex flex-col items-center justify-between gap-4 sm:flex-row'>
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
                <FormField
                  control={form.control}
                  name='confirm_password'
                  render={({ field }) => (
                    <FormItem className='w-full'>
                      <FormLabel className='flex items-center gap-2'>
                        <LockIcon className='h-5 w-auto' />
                        <span>Confirm Password</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          type='password'
                          placeholder='Confirm your password'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <LoadingButton
                variant={"default"}
                loading={loading}
                size={"lg"}
                className='flex w-full items-center gap-2'
                type='submit'>
                <ArrowRightCircleIcon className='w-4 stroke-white' />
                <span className='font-semibold text-white'>Update user</span>
              </LoadingButton>
            </form>
          </Form>
        </section>
      </main>
    </Layout>
  );
}
