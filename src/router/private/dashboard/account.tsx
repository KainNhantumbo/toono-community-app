import { AlertMessage } from "@/components/alert-message";
import { DropzoneArea } from "@/components/dropzone";
import { Layout } from "@/components/layout";
import { Loader } from "@/components/loader";
import { TooltipWrapper } from "@/components/tooltip-wrapper";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Heading } from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useAppContext } from "@/context/app-context";
import { useUserDataQuery } from "@/hooks/use-user-data-query";
import { errorTransformer } from "@/lib/error";
import { formatDate } from "@/lib/utils";
import { UpdateUserDataType, UpdateUserSchema } from "@/schemas";
import { RootState } from "@/state/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { InstagramLogoIcon } from "@radix-ui/react-icons";
import {
  RiFacebookLine,
  RiGithubLine,
  RiSuitcase2Line,
  RiUserLocationLine
} from "@remixicon/react";
import * as Lucide from "lucide-react";
import * as React from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "sonner";

export default function Account() {
  const auth = useSelector((state: RootState) => state.auth);
  const { data: initialUserState, error, isLoading, refetch, isError } = useUserDataQuery();
  const [profileImage, setProfileImage] = React.useState<string>(() =>
    initialUserState.profile_image ? initialUserState.profile_image.url : ""
  );
  const [loading, setLoading] = React.useState<boolean>(false);
  const { client } = useAppContext();

  const form = useForm<UpdateUserDataType>({
    resolver: zodResolver(UpdateUserSchema),
    disabled: loading,
    values: {
      name: initialUserState.name,
      available: initialUserState.available,
      biography: initialUserState.biography,
      birthday: initialUserState.birthday ?? "",
      network: initialUserState.network,
      education: initialUserState.education,
      learning: initialUserState.learning,
      location: initialUserState.location,
      user_name: initialUserState.user_name,
      work: initialUserState.work
    }
  });

  const onSubmit = async (data: UpdateUserDataType) => {
    try {
      setLoading(true);
      if (data.password && data.password.length > 0) {
        if (data.password !== data.confirm_password) {
          return toast.error("Passwords don't match. Please check and try again.");
        }
      }
      console.info("submitted");
      await client({
        method: "patch",
        url: `/api/v1/users/${auth.id}`,
        data: { ...data, profileImage }
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
              <Lucide.ArrowLeft className='h-auto w-6' />
            </Button>
          </TooltipWrapper>
          <Heading
            title='Account'
            description='Edit and update user account configurations'
          />
        </div>

        <div className=' flex w-full items-center justify-between gap-3 text-sm font-medium uppercase'>
          <p>Account created at: {formatDate(initialUserState.created_at)}</p>
          <Separator orientation='vertical' decorative />
          <p>Last update: {formatDate(initialUserState.updated_at)}</p>
        </div>

        <Separator decorative />

        <div className='w-full'>
          {profileImage ? (
            <div className='flex w-full flex-col items-center gap-3'>
              <img
                src={profileImage}
                alt={`${initialUserState.name} profile image`}
                className='mx-auto w-full max-w-[200px] rounded-full object-cover'
              />

              <Button variant={"outline"} onClick={() => setProfileImage("")}>
                <Lucide.Trash2 className='mr-2 h-auto w-4' />
                <span>Delete Image</span>
              </Button>
            </div>
          ) : (
            <DropzoneArea
              width={200}
              height={200}
              handler={(encodedImage) => {
                setProfileImage(encodedImage);
              }}
            />
          )}
        </div>

        <Separator decorative />

        <section>
          {isLoading && !isError ? <Loader /> : null}
          {!isLoading && isError ? (
            <AlertMessage
              icon={Lucide.AlertTriangle}
              action={{ handler: () => refetch(), label: "Retry" }}
              message={errorTransformer(error).message}
            />
          ) : null}

          <Form {...form}>
            <form
              autoComplete='off'
              onSubmit={form.handleSubmit(onSubmit)}
              className='max my-auto mb-3 h-full w-full space-y-8'>
              <div className='flex flex-col items-center justify-between gap-4 sm:flex-row'>
                <FormField
                  control={form.control}
                  name='name'
                  render={({ field }) => (
                    <FormItem className='w-full'>
                      <FormLabel className='flex items-center gap-2'>
                        <Lucide.User className='h-5 w-auto' />
                        <span>Name</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          autoComplete='off'
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
                        <Lucide.UserCircle className='h-5 w-auto' />
                        <span>Username</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          autoComplete='off'
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
                      <Lucide.Text className='h-5 w-auto' />
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
                name='location'
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormLabel className='flex items-center gap-2'>
                      <RiUserLocationLine className='h-5 w-auto' />
                      <span>Location</span>
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
                name='education'
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormLabel className='flex items-center gap-2'>
                      <Lucide.School className='h-5 w-auto' />
                      <span>Education</span>
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        disabled={loading}
                        rows={5}
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
                      <Lucide.GraduationCapIcon className='h-5 w-auto' />
                      <span>What are Learning?</span>
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        disabled={loading}
                        rows={5}
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
                name='work'
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormLabel className='flex items-center gap-2'>
                      <RiSuitcase2Line className='h-5 w-auto' />
                      <span>Current Work</span>
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        disabled={loading}
                        rows={5}
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
                      <Lucide.Clock className='h-5 w-auto' />
                      <span>Your Availability</span>
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        disabled={loading}
                        rows={5}
                        placeholder='Enter your availability details for work'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Separator decorative />

              <div className='grid w-full gap-5 mobile-x:grid-cols-2'>
                <FormField
                  control={form.control}
                  name='network.facebook'
                  render={({ field }) => (
                    <FormItem className='w-full'>
                      <FormLabel className='flex items-center gap-2'>
                        <RiFacebookLine className='h-5 w-auto' />
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
                        <RiGithubLine className='h-5 w-auto' />
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
                        <Lucide.LinkedinIcon className='h-5 w-auto' />
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
                        <Lucide.Globe2 className='h-5 w-auto' />
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
              </div>

              <Separator decorative />

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
                        <Lucide.LockIcon className='h-5 w-auto' />
                        <span>Password</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          type='password'
                          autoCorrect='off'
                          autoComplete='off'
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
                        <Lucide.LockIcon className='h-5 w-auto' />
                        <span>Confirm Password</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          type='password'
                          autoComplete='off'
                          autoCorrect='off'
                          placeholder='Confirm your password'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button variant={"default"} disabled={loading} size={"lg"} type='submit'>
                <Lucide.ArrowRightCircleIcon className='mr-2 w-4 stroke-white' />
                <span className='font-semibold text-white'>Update Data</span>
              </Button>
            </form>
          </Form>
        </section>
      </main>
    </Layout>
  );
}
