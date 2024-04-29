import { Layout } from "@/components/layout";
import client from "@/config/http-client";
import * as React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Separator } from "@/components/ui/separator";
import * as Lucide from "lucide-react";
import { PostList, User } from "@/types";
import { initialUserState } from "@/hooks/use-user-data-query";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { errorTransformer } from "@/lib/error";
import { AlertMessage } from "@/components/alert-message";
import { Loader } from "@/components/loader";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import moment from "moment";

export default function UserPage() {
  const params = useParams();
  const [user, setUser] = React.useState<User & { posts: PostList }>({
    ...initialUserState,
    posts: []
  });

  const { data, isError, isLoading, refetch, error } = useQuery({
    queryKey: ["community-users"],
    queryFn: async () => {
      try {
        const { data } = await client.get<User & { posts: PostList }>(
          `/api/v1/users/public/${params["userId"]}`
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

  React.useEffect(() => {
    if (data) setUser(data);
  }, [data]);

  return (
    <Layout>
      <main>
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

        <section>
          {user.profile_image ? (
            <LazyLoadImage
              src={user.profile_image.url}
              alt={`${user.name} profile image`}
              className='mx-auto w-full max-w-[200px] rounded-full object-cover'
            />
          ) : null}

          <div>
            <h1>{user.name}</h1>
            {user.user_name ? <h3>{user.user_name}</h3> : null}
          </div>

          {Object.entries(user.network).map(([key, value], index) => {
            if (key && value) {
              return (
                <div key={index} className='flex flex-wrap items-center gap-3'>
                  <Link to={value}>
                    <span>@{key}</span>
                  </Link>
                </div>
              );
            }
            return null;
          })}
        </section>

        <Separator decorative />

        {!isError && !isLoading && user.posts.length < 1 ? (
          <div className='grid min-h-28 w-full grid-cols-1 place-content-center place-items-center'>
            <AlertMessage icon={Lucide.WindIcon} message='No posts to show.' />
          </div>
        ) : null}

        {!isLoading && !isError && user.posts.length > 0 ? (
          <ul className='flex w-full flex-col gap-2'>
            {user.posts.map((post, index) => (
              <li
                key={post.id}
                className='group flex list-none flex-col gap-2 rounded-lg border bg-input/30'>
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
                      <Lucide.MessageSquareTextIcon className='h-auto w-4 ' />
                      <span> {post.comments.length} comments</span>
                    </div>
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

        {!isLoading && !isError && (
          <p className='mx-auto my-2 select-none'>Reached the end.</p>
        )}
      </main>
    </Layout>
  );
}
