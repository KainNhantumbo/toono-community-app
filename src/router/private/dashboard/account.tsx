import { AlertMessage } from "@/components/alert-message";
import { DropzoneArea } from "@/components/dropzone";
import { Layout } from "@/components/layout";
import { Loader } from "@/components/loader";
import { TooltipWrapper } from "@/components/tooltip-wrapper";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import * as CoreForm from "@/components/ui/form";
import { Heading } from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import { PopoverContent } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useAppContext } from "@/context/app-context";
import { useUserDataQuery } from "@/hooks/use-user-data-query";
import { errorTransformer } from "@/lib/error";
import { cn, formatDate } from "@/lib/utils";
import { UpdateUserDataType, UpdateUserSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { InstagramLogoIcon } from "@radix-ui/react-icons";
import { Popover, PopoverTrigger } from "@radix-ui/react-popover";
import * as Ri from "@remixicon/react";
import { useDocumentTitle } from "@uidotdev/usehooks";
import * as Lucide from "lucide-react";
import moment from "moment";
import * as React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function Account() {
  const { data: initialUserState, error, isLoading, refetch, isError } = useUserDataQuery();
  const [profileImage, setProfileImage] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);
  const { client, authenticate } = useAppContext();

  const form = useForm<UpdateUserDataType>({
    resolver: zodResolver(UpdateUserSchema),
    disabled: loading,
    values: {
      name: initialUserState.name,
      available: initialUserState.available,
      biography: initialUserState.biography,
      birthday: initialUserState.birthday
        ? new Date(initialUserState.birthday).toISOString()
        : null,
      network: initialUserState.network,
      education: initialUserState.education,
      learning: initialUserState.learning,
      location: initialUserState.location,
      user_name: initialUserState.user_name,
      work: initialUserState.work,
      confirm_password: "",
      password: ""
    }
  });

  const handleSubmit = async (data: UpdateUserDataType) => {
    console.info("submitted", data);
    setLoading(true);
    try {
      if (data.password && data.password.length > 0) {
        if (data.password !== data.confirm_password) {
          return toast.error("Passwords don't match. Please check and try again.");
        }
      }
      await client({
        method: "patch",
        url: `/api/v1/users`,
        data: { ...data, profileImage }
      });

      // reset the password fields if filled
      if (data.password) {
        form.resetField("password", { defaultValue: "" });
        form.resetField("confirm_password", { defaultValue: "" });
      }
      toast.success("User data updated successfully.");
      // this will revalidate the user auth data such
      // as the profile image if it has been changed
      await authenticate();
    } catch (error) {
      const { message } = errorTransformer(error);
      toast.error(message, {
        action: { label: "Retry", onClick: () => handleSubmit(data) }
      });
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (initialUserState.profile_image) {
      setProfileImage(initialUserState.profile_image.url);
    }
  }, [initialUserState]);

  useDocumentTitle("User Account - Toono Community");

  return (
    <Layout>
      <main className='mx-auto mb-3 w-full max-w-4xl space-y-5 px-3'>
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

        <section className='space-y-5 rounded-lg border bg-input/30 p-3'>
          {isLoading && !isError ? <Loader className="w-full h-full" /> : null}
          {!isLoading && isError ? (
            <AlertMessage
              icon={Lucide.AlertTriangle}
              action={{ handler: () => refetch(), label: "Retry" }}
              message={errorTransformer(error).message}
            />
          ) : null}

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
                className='border-none'
                handler={(encodedImage) => {
                  setProfileImage(encodedImage);
                }}
              />
            )}
          </div>

          <Separator decorative />

          <CoreForm.Form {...form}>
            <form
              autoComplete='off'
              onSubmit={form.handleSubmit(handleSubmit)}
              className='max my-auto h-full w-full space-y-8'>
              <div className='flex flex-col items-center justify-between gap-4 sm:flex-row'>
                <CoreForm.FormField
                  control={form.control}
                  name='name'
                  render={({ field }) => (
                    <CoreForm.FormItem className='w-full'>
                      <CoreForm.FormLabel className='flex items-center gap-2'>
                        <Lucide.User className='h-5 w-auto' />
                        <span>Name</span>
                      </CoreForm.FormLabel>
                      <CoreForm.FormControl>
                        <Input
                          disabled={loading}
                          autoComplete='off'
                          placeholder='Enter your full name'
                          {...field}
                        />
                      </CoreForm.FormControl>
                      <CoreForm.FormMessage />
                    </CoreForm.FormItem>
                  )}
                />
                <CoreForm.FormField
                  control={form.control}
                  name='user_name'
                  render={({ field }) => (
                    <CoreForm.FormItem className='w-full'>
                      <CoreForm.FormLabel className='flex items-center gap-2'>
                        <Lucide.AtSign className='h-5 w-auto' />
                        <span>Username</span>
                      </CoreForm.FormLabel>
                      <CoreForm.FormControl>
                        <Input
                          disabled={loading}
                          autoComplete='off'
                          placeholder='Enter your username'
                          {...field}
                        />
                      </CoreForm.FormControl>
                      <CoreForm.FormMessage />
                    </CoreForm.FormItem>
                  )}
                />
              </div>

              <div className='flex flex-col items-center justify-between gap-4 sm:flex-row'>
                <CoreForm.FormField
                  control={form.control}
                  name='location'
                  render={({ field }) => (
                    <CoreForm.FormItem className='w-full'>
                      <CoreForm.FormLabel className='flex items-center gap-2'>
                        <Ri.RiUserLocationLine className='h-5 w-auto' />
                        <span>Location</span>
                      </CoreForm.FormLabel>
                      <CoreForm.FormControl>
                        <Input
                          disabled={loading}
                          placeholder='Enter your location'
                          {...field}
                        />
                      </CoreForm.FormControl>
                      <CoreForm.FormMessage />
                    </CoreForm.FormItem>
                  )}
                />

                <CoreForm.FormField
                  control={form.control}
                  name='birthday'
                  render={({ field }) => (
                    <CoreForm.FormItem className='flex flex-col'>
                      <CoreForm.FormLabel className='flex items-center gap-2'>
                        <Lucide.CakeIcon className='h-5 w-auto' />
                        <span>Date of birth</span>
                      </CoreForm.FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <CoreForm.FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-[240px] pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}>
                              {field.value ? (
                                <span>{moment(new Date(field.value)).format("LL")}</span>
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <Lucide.CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                            </Button>
                          </CoreForm.FormControl>
                        </PopoverTrigger>
                        <PopoverContent className='w-auto p-0' align='start'>
                          <Calendar
                            mode='single'
                            selected={new Date(field.value || "")}
                            onSelect={(date) => {
                              if (date) {
                                field.onChange(date.toISOString());
                              }
                            }}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <CoreForm.FormMessage />
                    </CoreForm.FormItem>
                  )}
                />
              </div>
              <CoreForm.FormField
                control={form.control}
                name='biography'
                render={({ field }) => (
                  <CoreForm.FormItem className='w-full'>
                    <CoreForm.FormLabel className='flex items-center gap-2'>
                      <Lucide.Text className='h-5 w-auto' />
                      <span>Bio</span>
                    </CoreForm.FormLabel>
                    <CoreForm.FormControl>
                      <Input
                        disabled={loading}
                        placeholder='Enter your biography'
                        {...field}
                      />
                    </CoreForm.FormControl>
                    <CoreForm.FormMessage />
                  </CoreForm.FormItem>
                )}
              />

              <CoreForm.FormField
                control={form.control}
                name='education'
                render={({ field }) => (
                  <CoreForm.FormItem className='w-full'>
                    <CoreForm.FormLabel className='flex items-center gap-2'>
                      <Lucide.School className='h-5 w-auto' />
                      <span>Education</span>
                    </CoreForm.FormLabel>
                    <CoreForm.FormControl>
                      <Textarea
                        disabled={loading}
                        rows={5}
                        placeholder='Enter your education details'
                        {...field}
                      />
                    </CoreForm.FormControl>
                    <CoreForm.FormMessage />
                  </CoreForm.FormItem>
                )}
              />

              <CoreForm.FormField
                control={form.control}
                name='learning'
                render={({ field }) => (
                  <CoreForm.FormItem className='w-full'>
                    <CoreForm.FormLabel className='flex items-center gap-2'>
                      <Lucide.GraduationCapIcon className='h-5 w-auto' />
                      <span>What are Learning?</span>
                    </CoreForm.FormLabel>
                    <CoreForm.FormControl>
                      <Textarea
                        disabled={loading}
                        rows={5}
                        placeholder='Enter what are your currently learning'
                        {...field}
                      />
                    </CoreForm.FormControl>
                    <CoreForm.FormMessage />
                  </CoreForm.FormItem>
                )}
              />

              <CoreForm.FormField
                control={form.control}
                name='work'
                render={({ field }) => (
                  <CoreForm.FormItem className='w-full'>
                    <CoreForm.FormLabel className='flex items-center gap-2'>
                      <Ri.RiSuitcase2Line className='h-5 w-auto' />
                      <span>Current Work</span>
                    </CoreForm.FormLabel>
                    <CoreForm.FormControl>
                      <Textarea
                        disabled={loading}
                        rows={5}
                        placeholder='Enter your work details'
                        {...field}
                      />
                    </CoreForm.FormControl>
                    <CoreForm.FormMessage />
                  </CoreForm.FormItem>
                )}
              />

              <CoreForm.FormField
                control={form.control}
                name='available'
                render={({ field }) => (
                  <CoreForm.FormItem className='w-full'>
                    <CoreForm.FormLabel className='flex items-center gap-2'>
                      <Lucide.Clock className='h-5 w-auto' />
                      <span>Your Availability</span>
                    </CoreForm.FormLabel>
                    <CoreForm.FormControl>
                      <Textarea
                        disabled={loading}
                        rows={5}
                        placeholder='Enter your availability details for work'
                        {...field}
                      />
                    </CoreForm.FormControl>
                    <CoreForm.FormMessage />
                  </CoreForm.FormItem>
                )}
              />

              <Separator decorative />

              <div className='grid w-full gap-5 mobile-x:grid-cols-2'>
                <CoreForm.FormField
                  control={form.control}
                  name='network.facebook'
                  render={({ field }) => (
                    <CoreForm.FormItem className='w-full'>
                      <CoreForm.FormLabel className='flex items-center gap-2'>
                        <Ri.RiFacebookLine className='h-5 w-auto' />
                        <span>Your Facebook</span>
                      </CoreForm.FormLabel>
                      <CoreForm.FormControl>
                        <Input
                          disabled={loading}
                          placeholder='Enter your facebook profile link'
                          {...field}
                        />
                      </CoreForm.FormControl>
                      <CoreForm.FormMessage />
                    </CoreForm.FormItem>
                  )}
                />

                <CoreForm.FormField
                  control={form.control}
                  name='network.github'
                  render={({ field }) => (
                    <CoreForm.FormItem className='w-full'>
                      <CoreForm.FormLabel className='flex items-center gap-2'>
                        <Ri.RiGithubLine className='h-5 w-auto' />
                        <span>Your Github</span>
                      </CoreForm.FormLabel>
                      <CoreForm.FormControl>
                        <Input
                          disabled={loading}
                          placeholder='Enter your github profile link'
                          {...field}
                        />
                      </CoreForm.FormControl>
                      <CoreForm.FormMessage />
                    </CoreForm.FormItem>
                  )}
                />

                <CoreForm.FormField
                  control={form.control}
                  name='network.instagram'
                  render={({ field }) => (
                    <CoreForm.FormItem className='w-full'>
                      <CoreForm.FormLabel className='flex items-center gap-2'>
                        <InstagramLogoIcon className='h-5 w-auto' />
                        <span>Your Instagram</span>
                      </CoreForm.FormLabel>
                      <CoreForm.FormControl>
                        <Input
                          disabled={loading}
                          placeholder='Enter your instagram profile link'
                          {...field}
                        />
                      </CoreForm.FormControl>
                      <CoreForm.FormMessage />
                    </CoreForm.FormItem>
                  )}
                />

                <CoreForm.FormField
                  control={form.control}
                  name='network.linkedin'
                  render={({ field }) => (
                    <CoreForm.FormItem className='w-full'>
                      <CoreForm.FormLabel className='flex items-center gap-2'>
                        <Lucide.LinkedinIcon className='h-5 w-auto' />
                        <span>Your LinkedIn</span>
                      </CoreForm.FormLabel>
                      <CoreForm.FormControl>
                        <Input
                          disabled={loading}
                          placeholder='Enter your LinkedIn profile link'
                          {...field}
                        />
                      </CoreForm.FormControl>
                      <CoreForm.FormMessage />
                    </CoreForm.FormItem>
                  )}
                />

                <CoreForm.FormField
                  control={form.control}
                  name='network.website'
                  render={({ field }) => (
                    <CoreForm.FormItem className='w-full'>
                      <CoreForm.FormLabel className='flex items-center gap-2'>
                        <Lucide.Globe2 className='h-5 w-auto' />
                        <span>Your Website</span>
                      </CoreForm.FormLabel>
                      <CoreForm.FormControl>
                        <Input
                          disabled={loading}
                          placeholder='Enter your website link'
                          {...field}
                        />
                      </CoreForm.FormControl>
                      <CoreForm.FormMessage />
                    </CoreForm.FormItem>
                  )}
                />
              </div>

              <Separator decorative />

              <h3>
                Note: leave these fields below blank, if you don't want to update password.
              </h3>
              <div className='flex flex-col items-center justify-between gap-4 sm:flex-row'>
                <CoreForm.FormField
                  control={form.control}
                  name='password'
                  render={({ field }) => (
                    <CoreForm.FormItem className='w-full'>
                      <CoreForm.FormLabel className='flex items-center gap-2'>
                        <Lucide.LockIcon className='h-5 w-auto' />
                        <span>Password</span>
                      </CoreForm.FormLabel>
                      <CoreForm.FormControl>
                        <Input
                          disabled={loading}
                          type='password'
                          autoCorrect='off'
                          autoComplete='off'
                          placeholder='Enter your password'
                          {...field}
                        />
                      </CoreForm.FormControl>
                      <CoreForm.FormMessage />
                    </CoreForm.FormItem>
                  )}
                />
                <CoreForm.FormField
                  control={form.control}
                  name='confirm_password'
                  render={({ field }) => (
                    <CoreForm.FormItem className='w-full'>
                      <CoreForm.FormLabel className='flex items-center gap-2'>
                        <Lucide.LockIcon className='h-5 w-auto' />
                        <span>Confirm Password</span>
                      </CoreForm.FormLabel>
                      <CoreForm.FormControl>
                        <Input
                          disabled={loading}
                          type='password'
                          autoComplete='off'
                          autoCorrect='off'
                          placeholder='Confirm your password'
                          {...field}
                        />
                      </CoreForm.FormControl>
                      <CoreForm.FormMessage />
                    </CoreForm.FormItem>
                  )}
                />
              </div>

              <Button variant={"default"} disabled={loading} size={"lg"} type='submit'>
                <span className='font-semibold'>Update Data</span>
              </Button>
            </form>
          </CoreForm.Form>
        </section>
      </main>
    </Layout>
  );
}
