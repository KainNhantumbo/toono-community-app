import { AlertMessage } from "@/components/alert-message";
import { Layout } from "@/components/layout";
import { Loader } from "@/components/loader";
import { renderParagraphs } from "@/components/paragraph-render";
import { TooltipWrapper } from "@/components/tooltip-wrapper";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import client from "@/config/http-client";
import { initialUserState } from "@/hooks/use-user-data-query";
import { errorTransformer } from "@/lib/error";
import { createUserConnection } from "@/lib/utils";
import { PostList, User } from "@/types";
import { useQuery } from "@tanstack/react-query";
import * as Lucide from "lucide-react";
import moment from "moment";
import * as React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link, useParams } from "react-router-dom";

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
        const { data } = await client.get<
          User & { posts: Omit<PostList, "user" | "coverImage"> }
        >(`/api/v1/users/${params["userId"]}`);
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
      <main className='mx-auto w-full max-w-4xl mobile:mb-3 mobile:space-y-5 mobile:px-3'>
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

        {!isError && !isLoading && user.posts.length < 1 ? (
          <div className='grid min-h-28 w-full grid-cols-1 place-content-center place-items-center'>
            <AlertMessage icon={Lucide.WindIcon} message='No posts to show.' />
          </div>
        ) : null}

        <section className='flex w-full flex-col items-center gap-3'>
          {user.profile_image ? (
            <LazyLoadImage
              src={user.profile_image.url}
              alt={`${user.name} profile image`}
              className='mx-auto w-full max-w-[200px] rounded-full object-cover'
            />
          ) : null}

          <div className='flex flex-col items-center gap-2'>
            <h1 className='font-bold'>{user.name}</h1>
            {user.user_name ? (
              <h3 className='text-muted-foreground'>{user.user_name}</h3>
            ) : null}
            {user.biography ? (
              <h4 className='text-muted-foreground'>{user.biography}</h4>
            ) : null}
          </div>

          <div className='my-3 flex items-center justify-center gap-3'>
            {Object.entries(user.network)
              .sort((a, b) => (a[0] > b[0] ? 1 : -1))
              .map(([key, value], index) => {
                if (key && value) {
                  const { icon: Icon, name } = createUserConnection(key);
                  return (
                    <a
                      href={value}
                      key={index}
                      target='_blank'
                      className='group'
                      rel='noopener noreferrer'>
                      <TooltipWrapper content={`Find me on ${name}`}>
                        <Icon className='h-auto w-6 group-hover:text-primary group-hover:transition-colors' />
                      </TooltipWrapper>
                      <span className='sr-only'>{name}</span>
                    </a>
                  );
                }
                return null;
              })}
          </div>
          <p className='text-center'>
            Active since {moment(user.created_at).format("MMMM, YYYY")}
          </p>
          <Separator decorative />

          <div className='w-full max-w-2xl space-y-3 text-center'>
            {renderParagraphs(user.work)}
            {renderParagraphs(user.learning)}
            {renderParagraphs(user.education)}
            {renderParagraphs(user.available)}
          </div>
          <Separator decorative />
        </section>

        {!isLoading && !isError && user.posts.length > 0 ? (
          <>
            <Heading title='Posts' description={`See ${user.name} published articles!`} />
            <ul className='flex w-full select-none flex-col gap-2'>
              {user.posts.map((post) => (
                <li
                  key={post.id}
                  className='group flex list-none flex-col gap-2 rounded-lg bg-input/30'>
                  <section className='mx-auto w-full max-w-3xl space-y-3 p-3'>
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
                              className='flex cursor-pointer select-none flex-nowrap items-center'>
                              <Lucide.HashIcon className='mr-1 h-auto w-4' />
                              <span className='text-sm'>{tag}</span>
                            </div>
                          ))
                        : null}
                    </div>

                    <div className='flex flex-wrap items-center gap-2'>
                      <div className='flex flex-nowrap items-center gap-2 rounded-sm p-1 px-2 text-sm'>
                        <Lucide.MessageSquareTextIcon className='h-auto w-4 ' />
                        <span> {post.comments.length} comments</span>
                      </div>
                      <div className='flex flex-nowrap items-center gap-2 rounded-sm p-1 px-2 text-sm'>
                        <Lucide.HandHeartIcon className='h-auto w-4 ' />
                        <span> {post.claps.length} claps</span>
                      </div>
                      <div className='flex flex-nowrap items-center gap-2 rounded-sm p-1 px-2 text-sm'>
                        <Lucide.EyeIcon className='h-auto w-4 ' />
                        <span>{post.visits ?? 0} views</span>
                      </div>
                      <div className='flex flex-nowrap items-center gap-2 rounded-sm p-1 px-2 text-sm'>
                        <Lucide.TextSelectIcon className='h-auto w-4 ' />
                        <span>{post.words ?? 0} words</span>
                      </div>
                      <div className='flex flex-nowrap items-center gap-2 rounded-sm p-1 px-2 text-sm'>
                        <Lucide.FileClockIcon className='h-auto w-4 ' />
                        <span>{post.read_time}</span>
                      </div>
                    </div>
                  </section>
                </li>
              ))}
            </ul>
          </>
        ) : null}

        {!isLoading && !isError && (
          <p className='mx-auto my-2 select-none'>Reached the end.</p>
        )}
      </main>
    </Layout>
  );
}
