import { ContentEditor } from "@/components/content-editor";
import { Layout } from "@/components/layout";
import { TooltipWrapper } from "@/components/tooltip-wrapper";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoadingButton } from "@/components/ui/loading-button";
import { Separator } from "@/components/ui/separator";
import { useAppContext } from "@/context/app-context";
import { errorTransformer } from "@/lib/error";
import type { PostDraft, PublicPost } from "@/types";
import { isUUID } from "class-validator";
import { ArrowLeft } from "lucide-react";
import * as React from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const initialPostDraftState: PostDraft = {
  title: "",
  content: "",
  coverImage: "",
  tags: [],
  public: true
};

export default function PostsEditor() {
  const params = useParams();
  const { client } = useAppContext();
  const isUpdate: boolean = isUUID(params["id"]);
  const [postDraft, setPostDraft] = React.useState<PostDraft>(initialPostDraftState);
  const [loading, setLoading] = React.useState<boolean>(false);

  const handleUpdatePost = async () => {
    setLoading(true);
    try {
      await client({
        method: "patch",
        url: `/api/v1/posts/${params["id"]}`,
        data: postDraft
      });
    } catch (error) {
      const { message } = errorTransformer(error);
      console.error(error);
      console.warn(message);
      toast.error(message, {
        action: { onClick: () => handleUpdatePost(), label: "Retry" }
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePost = async () => {
    setLoading(true);
    try {
      await client({ method: "post", url: `/api/v1/posts`, data: postDraft });
      setPostDraft(initialPostDraftState);
    } catch (error) {
      const { message } = errorTransformer(error);
      console.error(error);
      console.warn(message);
      toast.error(message, {
        action: { onClick: () => handleCreatePost(), label: "Retry" }
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGetPost = async () => {
    try {
      const { data } = await client<PublicPost>({
        method: "get",
        url: `/api/v1/posts/${params["id"]}`
      });
      setPostDraft({
        title: data.title,
        content: data.content,
        public: data.public,
        coverImage: data.cover_image ? data.cover_image.url : "",
        tags: data.tags
      });
    } catch (error) {
      const { message } = errorTransformer(error);
      console.error(error);
      console.warn(message);
      toast.error(message, {
        action: { onClick: () => handleGetPost(), label: "Retry" }
      });
    }
  };

  React.useEffect(() => {
    if (isUpdate) {
      handleGetPost();
    }
  }, []);

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
            <Heading title='Posts Editor' description='Create and update your posts' />
          </div>
        </section>

        <Separator decorative />

        <section className='flex w-full flex-col gap-3'>
          <form onSubmit={(e) => e.preventDefault()}>
            <div>
              <Label htmlFor='title'>
                <span className='sr-only'>Post Title</span>
              </Label>
              <Input
                id='title'
                placeholder='Title'
                value={postDraft.title}
                onChange={(e) =>
                  setPostDraft((state) => ({ ...state, title: e.target.value }))
                }
              />
            </div>

            <ContentEditor
              value={postDraft.content}
              handler={({ text }) => setPostDraft((state) => ({ ...state, content: text }))}
            />

            <div>
              <LoadingButton
                loading={loading}
                onClick={() => {
                  if (isUpdate) return handleUpdatePost();
                  handleCreatePost();
                }}>
                <span>{isUpdate ? "Update Post" : "Create Post"}</span>
              </LoadingButton>
            </div>
          </form>
        </section>
      </main>
    </Layout>
  );
}
