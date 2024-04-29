import { LazyLoadImage } from "react-lazy-load-image-component";
import * as Lucide from "lucide-react";
import { Layout } from "@/components/layout";
import { errorTransformer } from "@/lib/error";
import { useQuery } from "@tanstack/react-query";
import client from "@/config/http-client";
import { PublicPost } from "@/types";
import * as React from "react";
import { ContentRenderer } from "@/components/content-renderer";
import { TableOfContents } from "@/components/table-of-contents-renderer";
import { Link, useParams } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import moment from "moment";
import { AlertMessage } from "@/components/alert-message";
import { Loader } from "@/components/loader";

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
  const [post, setPost] = React.useState<PublicPost>(initialPostState);
  const params = useParams();

  const { data, isError, isLoading, error, refetch } = useQuery({
    queryKey: ["community-posts"],
    queryFn: async () => {
      try {
        const { data } = await client.get<PublicPost>(`/api/v1/posts/public/${params["slug"]}`);
        return data;
      } catch (error) {
        const { message } = errorTransformer(error);
        console.error(error);
        console.warn(message);
        throw error
      }
    }
  });

  React.useEffect(() => {
    if (data) setPost(data);
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

        {!isError && !isLoading ? (
          <>
            <section>
              <div className='w-full'>
                {post.coverImage ? (
                  <LazyLoadImage
                    src={post.coverImage.url}
                    alt={`Cover image of ${post.title}`}
                    className='h-full max-h-[400px] w-full object-cover'
                  />
                ) : (
                  <Skeleton className='h-[400] w-full' />
                )}
              </div>
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
            </section>
            <article className='flex flex-col gap-2'>
              <TableOfContents content={post.content} />
              <ContentRenderer>{post.content}</ContentRenderer>
            </article>
            <section></section>
          </>
        ) : null}
      </main>
    </Layout>
  );
}
