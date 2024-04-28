import { AlertMessage } from "@/components/alert-message";
import { Layout } from "@/components/layout";
import { Loader } from "@/components/loader";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { usePublicPostsQuery } from "@/hooks/use-public-posts-query";
import { errorTransformer } from "@/lib/error";
import { RootState } from "@/state/store";
import * as Lucide from "lucide-react";
import moment from "moment";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function HomePage() {
  const { error, isLoading, hasNextPage, inViewRef, isError, refetch } =
    usePublicPostsQuery();
  const posts = useSelector((state: RootState) => state.publicPosts);

  return (
    <Layout>
      <main className='mx-auto mb-3 w-full max-w-4xl space-y-5 px-3'>
        {isError && !isLoading ? (
          <AlertMessage
            icon={Lucide.AlertTriangleIcon}
            message={errorTransformer(error).message}
            action={{ label: "Retry", handler: () => refetch() }}
          />
        ) : null}

        {!isError && isLoading ? <Loader /> : null}

        <article className='flex flex-col gap-3'>
          {!isLoading && !isError ? (
            <ul className='flex w-full flex-col gap-2'>
              {posts.map((post, index) => (
                <li
                  key={post.id}
                  ref={posts.length === index + 1 ? inViewRef : undefined}
                  className='group flex list-none flex-col gap-2 rounded-lg border bg-background'>
                  {post.coverImage ? (
                    <Link to={`/community/posts/${post.slug}`}>
                      <LazyLoadImage
                        src={post.coverImage.url}
                        className='max-h-[120px] w-full rounded-t-lg object-cover'
                      />
                    </Link>
                  ) : null}

                  <section className='mx-auto w-full max-w-3xl space-y-3 p-3'>
                    <div className='flex flex-nowrap items-center gap-2'>
                      <Link to={`/community/users/${post.user.id}`}>
                        <Avatar>
                          {post.user.profile_image ? (
                            <AvatarImage
                              loading='lazy'
                              decoding='async'
                              src={post.user.profile_image.url}
                              alt={`${post.user.name} profile image`}
                            />
                          ) : (
                            <AvatarFallback className='base-none cursor-pointer rounded-lg bg-transparent hover:bg-muted'>
                              <Lucide.User className='h-auto w-5' />
                              <span className='sr-only'>user icon</span>
                            </AvatarFallback>
                          )}
                        </Avatar>
                      </Link>
                      <div className='space-y-1'>
                        <p>{post.user.name}</p>
                        <span className='text-[.75rem]'>
                          {moment(post.created_at).format("LL")}
                        </span>
                      </div>
                    </div>

                    <Link to={`/community/posts/${post.slug}`}>
                      <h3 className='my-2 font-display text-xl font-semibold transition-all hover:underline hover:underline-offset-2'>
                        {post.title}
                      </h3>
                    </Link>

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
                      <div className='flex flex-nowrap items-center gap-2 rounded-sm p-1 px-2 text-sm transition-all hover:cursor-pointer hover:bg-primary/40'>
                        <Lucide.HandHeartIcon className='h-auto w-4 ' />
                        <span> {post.claps.length} claps</span>
                      </div>
                      <div className='flex flex-nowrap items-center gap-2 rounded-sm p-1 px-2 text-sm transition-all hover:cursor-pointer hover:bg-primary/40'>
                        <Lucide.EyeIcon className='h-auto w-4 ' />
                        <span>{post.visits ?? 0} views</span>
                      </div>
                      <div className='flex flex-nowrap items-center gap-2 rounded-sm p-1 px-2 text-sm transition-all hover:cursor-pointer hover:bg-primary/40'>
                        <Lucide.TextSelectIcon className='h-auto w-4 ' />
                        <span>{post.words ?? 0} words</span>
                      </div>
                      <div className='flex flex-nowrap items-center gap-2 rounded-sm p-1 px-2 text-sm transition-all hover:cursor-pointer hover:bg-primary/40'>
                        <Lucide.FileClockIcon className='h-auto w-4 ' />
                        <span>{post.read_time}</span>
                      </div>
                    </div>
                  </section>
                </li>
              ))}
            </ul>
          ) : null}

          {!hasNextPage && !isLoading && !isError && posts.length > 0 && (
            <p className='mx-auto my-2 select-none'>Reached the end.</p>
          )}
        </article>
      </main>
    </Layout>
  );
}
