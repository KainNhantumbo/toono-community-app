import { ContentEditor } from "@/components/content-editor";
import { DropzoneArea } from "@/components/dropzone";
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
import { ArrowLeft, Trash2 } from "lucide-react";
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
      toast.success("Post updated!");
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
      toast.success("Post created!");
      scrollTo({ behavior: "smooth", left: 0, top: Infinity });
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
        coverImage: data.coverImage !== null ? data.coverImage.url : "",
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
      <main className='mx-auto mb-3 w-full max-w-4xl space-y-5 px-3'>
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

        <section className='flex w-full flex-col gap-3 bg-background'>
          <form
            onSubmit={(e) => e.preventDefault()}
            className='base-border flex w-full flex-col gap-3 rounded-md'>
            <div className='w-full'>
              {postDraft.coverImage ? (
                <div className='relative flex w-full flex-col items-center gap-3'>
                  <img
                    src={postDraft.coverImage}
                    alt={`${postDraft.title} post image`}
                    className='w-full rounded-t-lg  object-cover'
                  />

                  <Button
                    variant={"destructive"}
                    size={"icon"}
                    className='absolute right-1 top-1'
                    onClick={() => setPostDraft((state) => ({ ...state, coverImage: "" }))}>
                    <Trash2 className='stroke-white/90' />
                    <span className='sr-only'>Delete Image</span>
                  </Button>
                </div>
              ) : (
                <DropzoneArea
                  width={1000}
                  height={420}
                  className='w-full border-none pt-10'
                  handler={(encodedImage) => {
                    setPostDraft((state) => ({ ...state, coverImage: encodedImage }));
                  }}
                />
              )}
            </div>

            <div className='md:px-10'>
              <Label htmlFor='title'>
                <span className='sr-only'>Post Title</span>
              </Label>
              <Input
                id='title'
                value={postDraft.title}
                placeholder='Your new post title here...'
                className='h-full w-full rounded-none border-none text-xl shadow-none outline-none focus-visible:ring-0 md:text-4xl'
                onChange={(e) =>
                  setPostDraft((state) => ({ ...state, title: e.target.value }))
                }
              />
            </div>

            <div></div>

            <ContentEditor
              value={postDraft.content}
              handler={({ text }) => setPostDraft((state) => ({ ...state, content: text }))}
            />

            <div className='px-8 pb-4'>
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
