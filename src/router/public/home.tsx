import { AlertMessage } from "@/components/alert-message";
import { Layout } from "@/components/layout";
import { Loader } from "@/components/loader";
import { sidebarPaths } from "@/components/sidebar-sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { usePublicPostsQuery } from "@/hooks/use-public-posts-query";
import { errorTransformer } from "@/lib/error";
import { cn } from "@/lib/utils";
import { mutateFilters, sortOptions } from "@/state/slices/filters";
import { AppDispatch, RootState } from "@/state/store";
import * as Huge from "hugeicons-react";
import { Loader2 } from "lucide-react";
import moment from "moment";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function HomePage() {
  const { error, isLoading, hasNextPage, inViewRef, isError, refetch } =
    usePublicPostsQuery();
  const posts = useSelector((state: RootState) => state.publicPosts);
  const filters = useSelector((state: RootState) => state.filters);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <Layout>
      <main className='mx-auto mb-3 flex w-full max-w-4xl gap-3 px-3'>
        <aside className='sticky top-[70px] hidden h-fit w-fit flex-col gap-3 sm:flex'>
          {sidebarPaths.map((_path, i) => (
            <Button
              key={i}
              asChild
              className='group w-full justify-start'
              variant={"ghost"}>
              <Link to={_path.path} className='items-start justify-start'>
                <_path.icon className='mr-2 h-auto w-5' />
                <span className='group-hover:underline group-hover:underline-offset-2'>
                  {_path.label}
                </span>
              </Link>
            </Button>
          ))}
        </aside>

        <article className='flex w-full flex-col gap-3'>
          {filters.search ? (
            <div className='flex flex-wrap justify-between gap-2 rounded-lg border bg-input/30 p-2'>
              <div className='space-y-2'>
                <h2>Search: {filters.search}</h2>
                <h3>Initial results: {posts.length}</h3>
              </div>

              <Button
                variant={"destructive"}
                onClick={() => dispatch(mutateFilters({ ...filters, search: "" }))}>
                <Huge.Delete03Icon className='mr-2 h-auto w-4 stroke-white' />
                <span>Clear</span>
              </Button>
            </div>
          ) : null}

          {!isError && isLoading ? <Loader className='h-full w-full' /> : null}

          {isError && !isLoading ? (
            <AlertMessage
              icon={Huge.Alert02Icon}
              message={errorTransformer(error).message}
              className='h-full w-full'
              action={{ label: "Retry", handler: () => refetch() }}
            />
          ) : null}

          {posts.length > 0 ? (
            <RadioGroup
              defaultValue={filters.sort}
              className='mb-1 flex w-full flex-wrap items-center'
              onValueChange={(selected) =>
                dispatch(mutateFilters({ ...filters, sort: selected }))
              }>
              {sortOptions.map((option, i) => (
                <div key={i}>
                  <RadioGroupItem
                    value={option.value}
                    id={option.value}
                    className='sr-only'
                    disabled={isLoading}
                  />
                  <Label
                    htmlFor={option.value}
                    className={cn(
                      "text-md flex cursor-pointer select-none flex-nowrap gap-2 rounded-sm p-2 px-4 font-display text-muted-foreground transition-all hover:bg-input/30",
                      {
                        "font-bold text-card-foreground": filters.sort == option.value
                      }
                    )}>
                    <option.icon
                      className={cn(
                        {
                          "text-card-foreground": filters.sort == option.value
                        },
                        "h-auto w-5"
                      )}
                    />

                    <span>{option.label}</span>

                    {isLoading && <Loader2 className={cn("mr-2 h-4 w-4 animate-spin")} />}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          ) : null}

          {!isError && !isLoading && posts.length < 1 ? (
            <div className='mt-3 grid min-h-28 w-full grid-cols-1 place-content-center place-items-center'>
              <AlertMessage icon={Huge.StarIcon} message='No posts to show.' />
            </div>
          ) : null}

          {posts.length > 0 && !isLoading && !isError ? (
            <ul className='flex w-full flex-col gap-2'>
              {posts.map((post, index) => (
                <li
                  key={post.id}
                  ref={posts.length === index + 1 ? inViewRef : undefined}
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
                              <Huge.UserAdd01Icon className='h-auto w-5' />
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
                              <Huge.GridIcon className='mr-1 h-auto w-4' />
                              <span className='text-sm'>{tag}</span>
                            </div>
                          ))
                        : null}
                    </div>

                    <div className='flex flex-wrap items-center gap-2'>
                      <div className='flex select-none flex-nowrap items-center gap-2 rounded-sm p-1 px-2 text-sm transition-all'>
                        <Huge.Comment01Icon className='h-auto w-4 ' />
                        <span> {post.comments.length} comments</span>
                      </div>
                      <div className='flex select-none flex-nowrap items-center gap-2 rounded-sm p-1 px-2 text-sm transition-all'>
                        <Huge.Clapping02Icon className='h-auto w-4 ' />
                        <span> {post.claps.length} claps</span>
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
