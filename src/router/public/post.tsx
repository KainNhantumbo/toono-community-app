import { AlertMessage } from "@/components/alert-message";
import { ContentRenderer } from "@/components/content-renderer";
import { Layout } from "@/components/layout";
import { Loader } from "@/components/loader";
import { LoginRequest } from "@/components/login-request";
import { TableOfContents } from "@/components/table-of-contents-renderer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LoadingButton } from "@/components/ui/loading-button";
import { Skeleton } from "@/components/ui/skeleton";
import client from "@/config/http-client";
import { useClapsQuery } from "@/hooks/use-claps-query";
import { errorTransformer } from "@/lib/error";
import { cn } from "@/lib/utils";
import { RootState } from "@/state/store";
import { PublicPost } from "@/types";
import { useQuery } from "@tanstack/react-query";
import * as Lucide from "lucide-react";
import moment from "moment";
import * as React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

const CommentsSection = React.lazy(() => import("@/components/comments-section"));

const initialPostState: PublicPost = {
  id: "",
  title: "",
  slug: "",
  content: "",
  read_time: "",
  words: 0,
  visits: 0,
  tags: [],
  coverImage: null,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  claps: [],
  comments: [],
  user: { id: "", name: "", profile_image: null }
};

export default function PostPage() {
  const params = useParams();
  const auth = useSelector((state: RootState) => state.auth);
  const [post, setPost] = React.useState<PublicPost>(initialPostState);
  const [isRequestLoginOpen, setIsRequestLoginOpen] = React.useState<boolean>(false);

  const { data, isError, isLoading, error, refetch } = useQuery({
    queryKey: ["community-posts"],
    queryFn: async () => {
      try {
        const { data } = await client.get<PublicPost>(
          `/api/v1/posts/public/${params["slug"]}`
        );
        return data;
      } catch (error) {
        const { message } = errorTransformer(error);
        console.error(error);
        console.warn(message);
        throw error;
      }
    }
  });

  const { handleAddClap, handleRemoveClap, isClapsQueryLoading } = useClapsQuery({
    reloadFn: () => refetch()
  });

  const isInClapsArray: boolean = React.useMemo(() => {
    if (!auth.id) return false;
    const exists = post.claps.find((clap) => clap.user_id === auth.id);
    if (exists) return true;
    return false;
  }, [post]);

  React.useEffect(() => {
    if (data) setPost(data);
  }, [data]);

  React.useEffect(() => {
    // correct the scroll position on enter
    scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  return (
    <Layout>
      <main className='relative mx-auto w-full max-w-4xl space-y-5 px-3'>
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

        {!isError && isLoading ? <Loader /> : null}

        {!isError && !isLoading ? (
          <>
            <article className='mx-auto mb-3 flex w-full max-w-[820px] flex-col gap-2 rounded-lg border bg-input/30'>
              <section>
                <div className='w-full'>
                  {post.coverImage ? (
                    <LazyLoadImage
                      src={post.coverImage.url}
                      alt={`Cover image of ${post.title}`}
                      className='h-full max-h-[300px] w-full rounded-t-lg object-cover'
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
                            <Lucide.User className='h-auto w-5' />
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

                  <h1 className='my-6 scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl'>
                    {post.title}
                  </h1>

                  <div className='flex flex-wrap items-center gap-2'>
                    {post.tags.length > 0
                      ? post.tags.map((tag, index) => (
                          <div
                            key={index}
                            className='flex cursor-pointer select-none flex-nowrap items-center rounded-sm border p-1 px-2'>
                            <Lucide.HashIcon className='mr-1 h-auto w-4' />
                            <span className='text-sm'>{tag}</span>
                          </div>
                        ))
                      : null}
                  </div>

                  <div className='flex flex-wrap items-center gap-2'>
                    <div className='flex select-none flex-nowrap items-center gap-2 rounded-sm p-1 px-2 text-sm transition-all'>
                      <Lucide.MessageSquareTextIcon className='h-auto w-4 ' />
                      <span> {post.comments.length} comments</span>
                    </div>

                    <div className='flex select-none flex-nowrap items-center gap-2 rounded-sm p-1 px-2 text-sm transition-all'>
                      <Lucide.EyeIcon className='h-auto w-4 ' />
                      <span>{post.visits ?? 0} views</span>
                    </div>
                    <div className='flex select-none flex-nowrap items-center gap-2 rounded-sm p-1 px-2 text-sm transition-all'>
                      <Lucide.TextSelectIcon className='h-auto w-4 ' />
                      <span>{post.words ?? 0} words</span>
                    </div>
                    <div className='flex select-none flex-nowrap items-center gap-2 rounded-sm p-1 px-2 text-sm transition-all'>
                      <Lucide.FileClockIcon className='h-auto w-4 ' />
                      <span>{post.read_time}</span>
                    </div>
                  </div>

                  <LoadingButton
                    loading={isClapsQueryLoading}
                    variant={"outline"}
                    className='flex select-none flex-nowrap items-center gap-2 rounded-sm p-1 px-2 text-sm transition-all'
                    onClick={() => {
                      if (!auth.token) return setIsRequestLoginOpen(true);
                      if (isInClapsArray) return handleRemoveClap(post.id);
                      return handleAddClap(post.id);
                    }}>
                    <Lucide.HandHeartIcon
                      className={cn({ "stroke-primary": isInClapsArray })}
                    />
                    <span>{post.claps.length} claps!</span>
                  </LoadingButton>
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
