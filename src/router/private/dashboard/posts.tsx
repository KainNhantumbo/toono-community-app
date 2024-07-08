import { AlertMessage } from "@/components/alert-message";
import { Layout } from "@/components/layout";
import { Loader } from "@/components/loader";
import { PostsTableRender } from "@/components/posts-table";
import { TooltipWrapper } from "@/components/tooltip-wrapper";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { useUserPostsQuery } from "@/hooks/use-user-posts-query";
import { errorTransformer } from "@/lib/error";
import { RootState } from "@/state/store";
import { useDocumentTitle } from "@uidotdev/usehooks";
import { AlertTriangle, ArrowLeft } from "lucide-react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function PostsPage() {
  const posts = useSelector((state: RootState) => state.posts);
  const { refetch, isError, isLoading, error } = useUserPostsQuery();

  useDocumentTitle("User Posts - Toono Community");

  return (
    <Layout>
      <main className='mx-auto w-full max-w-4xl space-y-5 px-3'>
        <section className='flex w-full flex-wrap items-center justify-between gap-3'>
          <div className='flex items-center gap-5'>
            <TooltipWrapper content='Back'>
              <Button
                onClick={() => history.back()}
                variant={"outline"}
                size={"icon"}
                className='rounded-full'>
                <ArrowLeft className='h-auto w-6' />
              </Button>
            </TooltipWrapper>
            <Heading title='Posts' description='View your saved posts' />
          </div>
          <Button asChild>
            <Link to={`/users/dashboard/posts/post-editor/create`}>Create Post</Link>
          </Button>
        </section>

        <Separator decorative />

        <section>
          {!isLoading && !isError ? <PostsTableRender data={posts} /> : null}

          {isLoading && !isError ? <Loader /> : null}
          {!isLoading && isError ? (
            <AlertMessage
              icon={AlertTriangle}
              action={{ handler: () => refetch(), label: "Retry" }}
              message={errorTransformer(error).message}
            />
          ) : null}
        </section>
      </main>
    </Layout>
  );
}
