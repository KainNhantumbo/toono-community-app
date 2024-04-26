import { AlertMessage } from "@/components/alert-message";
import { Layout } from "@/components/layout";
import { Loader } from "@/components/loader";
import { usePublicPostsQuery } from "@/hooks/use-public-posts-query";
import { errorTransformer } from "@/lib/error";
import { RootState } from "@/state/store";
import { AlertTriangleIcon } from "lucide-react";
import { useSelector } from "react-redux";

export default function HomePage() {
  const { error, isLoading, hasNextPage, inViewRef, isError, refetch } =
    usePublicPostsQuery();
  const posts = useSelector((state: RootState) => state.publicPosts);

  return (
    <Layout>
      <main className='mx-auto mb-3 w-full max-w-4xl space-y-5 px-3'>
        {isError && !isLoading ? (
          <AlertMessage
            icon={AlertTriangleIcon}
            message={errorTransformer(error).message}
            action={{ label: "Retry", handler: () => refetch() }}
          />
        ) : null}

        {!isError && isLoading ? <Loader /> : null}

        {!isLoading && !isError ? (
          <ul className='flex w-full flex-col gap-2'>
            {posts.map((post) => (
              <li
                key={post.id}
                className='base-border group flex list-none flex-col gap-2 rounded-lg bg-background'>
                {post.coverImage ? (
                  <img
                    src={post.coverImage.url}
                    className='max-h-[120px] w-full rounded-t-lg object-cover'
                  />
                ) : null}

                <section className='p-3'>
                  <h3 className='font-display font- text-xl font-semibold'>{post.title}</h3>

                  <div className='flex flex-wrap items-center gap-3'>
                    <div></div>
                  </div>
                </section>
              </li>
            ))}
          </ul>
        ) : null}
      </main>
    </Layout>
  );
}
