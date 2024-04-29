import { TableOfContents } from "@/components/table-of-contents-renderer";
import { ContentEditor } from "@/components/content-editor";
import { DropzoneArea } from "@/components/dropzone";
import { Layout } from "@/components/layout";
import MultipleSelector from "@/components/multiple-selector";
import { TooltipWrapper } from "@/components/tooltip-wrapper";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoadingButton } from "@/components/ui/loading-button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useAppContext } from "@/context/app-context";
import { errorTransformer } from "@/lib/error";
import type { PostDraft, PublicPost } from "@/types";
import { isUUID } from "class-validator";
import { ArrowLeft, Edit2, Eye, Trash2 } from "lucide-react";
import * as React from "react";
import { ContentRenderer } from "@/components/content-renderer";
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
  const [isEditing, setIsEditing] = React.useState<boolean>(true);
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
      const { data } = await client<PublicPost & { public: boolean }>({
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
      <main className='mx-auto mb-3 w-full max-w-4xl space-y-5 mobile-x:px-3'>
        <section className='flex w-full flex-wrap items-center justify-between gap-3'>
          <div className='flex items-center gap-5 px-2 mobile-x:p-0'>
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
          <div className='mx-auto flex  flex-wrap items-center gap-3 mobile-x:mx-0'>
            <Button
              variant={isEditing ? "default" : "outline"}
              onClick={() => setIsEditing(true)}>
              <Edit2 className='mr-2 h-auto w-4' />
              <span>Edit</span>
            </Button>
            <Button
              variant={!isEditing ? "default" : "outline"}
              onClick={() => setIsEditing(false)}>
              <Eye className='mr-2 h-auto w-4' />
              <span>Preview</span>
            </Button>
          </div>
        </section>

        <Separator decorative />

        {!isEditing ? (
          <div className={"w-full overflow-auto rounded-lg border bg-input/30 p-3"}>
            <TableOfContents content={postDraft.content} />
            <ContentRenderer>{postDraft.content}</ContentRenderer>
          </div>
        ) : null}
        {isEditing ? (
          <form
            onSubmit={(e) => e.preventDefault()}
            className='flex w-full flex-col gap-3 rounded-lg border bg-input/30'>
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
                    <Trash2 />
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
                className='h-full w-full rounded-none border-none bg-transparent text-xl shadow-none outline-none focus-visible:ring-0 md:text-4xl'
                onChange={(e) =>
                  setPostDraft((state) => ({ ...state, title: e.target.value }))
                }
              />
            </div>

            <div className='w-full px-1'>
              <MultipleSelector
                value={postDraft.tags.map((tag) => ({ label: tag, value: tag }))}
                placeholder='Type here to add up to 4 tags...'
                maxSelected={4}
                creatable={true}
                badgeClassName='text-md rounded-full gap-2'
                className='focus:ring-none border-none outline-none'
                onChange={(value) => {
                  const currentValues = Array.from(new Set(value.map((obj) => obj.value)));
                  setPostDraft((state) => ({
                    ...state,
                    tags: currentValues
                  }));
                }}
              />
            </div>

            <ContentEditor
              value={postDraft.content}
              handler={(content) => setPostDraft((state) => ({ ...state, content }))}
            />

            <div className='flex w-full flex-wrap items-center gap-3 px-1 pb-4 mobile-x:px-8'>
              <LoadingButton
                loading={loading}
                onClick={() => {
                  if (isUpdate) return handleUpdatePost();
                  handleCreatePost();
                }}>
                <span>{isUpdate ? "Update Post" : "Create Post"}</span>
              </LoadingButton>

              <Select
                value={String(postDraft.public)}
                onValueChange={(option) => {
                  let bool = false;
                  if (option === "true") bool = true;
                  setPostDraft((state) => ({ ...state, public: bool }));
                }}>
                <SelectTrigger className='w-fit'>
                  <SelectValue placeholder='Select the post visibility' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='true'>Public (visible to anyone)</SelectItem>
                  <SelectItem value='false'>Private (only visible to you)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </form>
        ) : null}
      </main>
    </Layout>
  );
}
