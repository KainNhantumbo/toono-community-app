import { AlertMessage } from "@/components/alert-message";
import { ContentRenderer } from "@/components/content-renderer";
import { Layout } from "@/components/layout";
import { Loader } from "@/components/loader";
import { LoginRequest } from "@/components/login-request";
import { SharePost } from "@/components/share-post";
import { TableOfContents } from "@/components/table-of-contents-renderer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LoadingButton } from "@/components/ui/loading-button";
import { Skeleton } from "@/components/ui/skeleton";
import { useClapsQuery } from "@/hooks/use-claps-query";
import { usePublicPostQuery } from "@/hooks/use-public-post-query";
import { errorTransformer } from "@/lib/error";
import { cn } from "@/lib/utils";
import { RootState } from "@/state/store";
import * as Lucide from "lucide-react";
import moment from "moment";
import * as React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import * as Huge from "hugeicons-react";

const CommentsSection = React.lazy(() => import("@/components/comments-section"));

export default function PostPage() {
  const queryKey = window.location.pathname;
  const auth = useSelector((state: RootState) => state.auth);
  const [isRequestLoginOpen, setIsRequestLoginOpen] = React.useState<boolean>(false);
  const { post, error, isLoading, isError, refetch, isInClapsArray } = usePublicPostQuery({
    queryKey
  });
  const { handleAddClap, handleRemoveClap, isClapsQueryLoading } = useClapsQuery({
    reloadFn: () => refetch()
  });

  React.useEffect(() => {
    // correct the scroll position on enter
    scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  return (
    <Layout>
      <main className='mx-auto w-full max-w-4xl mobile:mb-3 mobile:space-y-5 mobile:px-3'>
        <LoginRequest isOpen={isRequestLoginOpen} setIsOpen={setIsRequestLoginOpen} />

        {isError && !isLoading ? (
          <div className='grid min-h-28 w-full grid-cols-1 place-content-center place-items-center'>
            <AlertMessage
              icon={Lucide.AlertTriangleIcon}
              message={errorTransformer(error).message}
              action={{ label: "Retry", handler: () => refetch() }}
            />
          </div>
        ) : null}

        {!isError && isLoading ? <Loader className='h-full w-full' /> : null}

        {!isError && !isLoading ? (
          <>
            <article className='mx-auto flex w-full max-w-[820px] flex-col gap-2 mobile:mb-3 mobile:rounded-lg mobile:border mobile:bg-input/30'>
              <section>
                <div className='w-full'>
                  {post.coverImage ? (
                    <LazyLoadImage
                      src={post.coverImage.url}
                      alt={`Cover image of ${post.title}`}
                      className='h-full max-h-[300px] w-full object-cover mobile:rounded-t-lg'
                    />
                  ) : (
                    <Skeleton className='h-[400] w-full' />
                  )}
                </div>

                <section className='mx-auto flex w-full max-w-2xl flex-col gap-2 p-3'>
                  <div className='flex w-full flex-nowrap items-center gap-2'>
                    <Link to={`/community/users/${post.user.id}`}>
                      <Avatar>
                        {post.user.profile_image ? (
                          <AvatarImage
                            loading='lazy'
                            decoding='async'
                            className='border'
                            src={post.user.profile_image.url}
                            alt={`${post.user.name} profile image`}
                          />
                        ) : (
                          <AvatarFallback className='cursor-pointer rounded-lg border bg-transparent hover:bg-muted'>
                            <Huge.UserAdd01Icon className='h-auto w-5' />
                            <span className='sr-only'>user icon</span>
                          </AvatarFallback>
                        )}
                      </Avatar>
                    </Link>
                    <div className='space-y-1'>
                      <p>{post.user.name}</p>
                      <span className='text-[.75rem]'>
                        Posted on {moment(post.created_at).format("LL")} : Edited at{" "}
                        {moment(post.updated_at).format("LL")}
                      </span>
                    </div>
                  </div>

                  <h1 className='my-6 scroll-m-20 text-3xl font-extrabold tracking-tight sm:text-center lg:text-4xl'>
                    {post.title}
                  </h1>

                  <div className='flex flex-wrap items-center gap-2 sm:justify-center'>
                    {post.tags.length > 0
                      ? post.tags.map((tag, index) => (
                          <div
                            key={index}
                            className='flex cursor-pointer select-none flex-nowrap items-center rounded-sm border p-1 px-2'>
                            <Huge.GridIcon className='mr-1 h-auto w-4' />
                            <span className='text-sm'>{tag}</span>
                          </div>
                        ))
                      : null}
                  </div>

                  <div className='flex flex-wrap items-center gap-2 sm:justify-center'>
                    <div className='flex select-none flex-nowrap items-center gap-2 rounded-sm p-1 px-2 text-sm transition-all'>
                      <Huge.Comment01Icon className='h-auto w-4' />
                      <span>{post.comments.length} comments</span>
                    </div>

                    <div className='flex select-none flex-nowrap items-center gap-2 rounded-sm p-1 px-2 text-sm transition-all'>
                      <Huge.ViewIcon className='h-auto w-4 ' />
                      <span>{post.visits ?? 0} views</span>
                    </div>
                    <div className='flex select-none flex-nowrap items-center gap-2 rounded-sm p-1 px-2 text-sm transition-all'>
                      <Huge.AnalysisTextLinkIcon className='h-auto w-4 ' />
                      <span>{post.words ?? 0} words</span>
                    </div>
                    <div className='flex select-none flex-nowrap items-center gap-2 rounded-sm p-1 px-2 text-sm transition-all'>
                      <Huge.Clock05Icon className='h-auto w-4 ' />
                      <span>{post.read_time}</span>
                    </div>
                  </div>

                  <div className='flex w-full flex-col gap-3 mobile:flex-row'>
                    <LoadingButton
                      loading={isClapsQueryLoading}
                      variant={"outline"}
                      className='flex w-full select-none flex-nowrap items-center gap-2 rounded-sm p-1 px-2 text-sm transition-all'
                      onClick={() => {
                        if (!auth.token) return setIsRequestLoginOpen(true);
                        if (isInClapsArray) return handleRemoveClap(post.id);
                        return handleAddClap(post.id);
                      }}>
                      <Huge.Clapping02Icon
                        className={cn({ "text-primary": isInClapsArray })}
                      />
                      <span>{post.claps.length} claps!</span>
                    </LoadingButton>
                    <SharePost slug={post.slug} title={post.title} />
                  </div>
                </section>
              </section>

              <section className='px-6 pb-6'>
                <TableOfContents content={post.content} />
                <ContentRenderer>{post.content}</ContentRenderer>
              </section>
            </article>
          </>
        ) : null}

        <React.Suspense fallback={<Loader />}>
          <CommentsSection key={post.id} postId={post.id} />
        </React.Suspense>
      </main>
    </Layout>
  );
}
