import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import * as Dropdown from "@/components/ui/dropdown-menu";
import { cn, clipboard } from "@/lib/utils";
import { RootState } from "@/state/store";
import { Comment } from "@/types";
import * as Lucide from "lucide-react";
import moment from "moment";
import * as React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { DeleteCommentAlert } from "./comment-delete-alert";
import { ReplyComment } from "./comment-reply-form";
import { ContentRenderer } from "./content-renderer";
import { LoginRequest } from "./login-request";
import { Button } from "./ui/button";
import { toast } from "sonner";

export type CommentItemProps = {
  comment: Comment;
  handleReloadComments: () => void;
};

export const CommentItem = (_props: CommentItemProps) => {
  const auth = useSelector((state: RootState) => state.auth);
  const [isReply, setIsReply] = React.useState<boolean>(false);
  const [isEditing, setIsEditing] = React.useState<boolean>(false);
  const [isRequestLoginOpen, setIsRequestLoginOpen] = React.useState<boolean>(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = React.useState<boolean>(false);

  const handleCopyContent = (content: string) => {
    clipboard(content);
    toast.success("Comment text copied.");
  };

  return (
    <div
      className={
        "w-full border-l bg-background p-3 mobile:mt-3 mobile:rounded-lg mobile:border"
      }>
      <div className={cn("flex flex-col", { "mb-3": isEditing })}>
        <div className='flex flex-nowrap items-center justify-between'>
          <div className='flex w-full flex-nowrap items-center gap-2'>
            <Link to={`/community/users/${_props.comment.user.id}`}>
              <Avatar className='max-h-8 w-full max-w-8'>
                {_props.comment.user.profile_image ? (
                  <AvatarImage
                    src={_props.comment.user.profile_image.url}
                    alt={`${_props.comment.user.name} profile image`}
                  />
                ) : (
                  <AvatarFallback className='base-none cursor-pointer rounded-lg bg-transparent hover:bg-muted'>
                    <Lucide.User className='h-auto w-5' />
                    <span className='sr-only'>User icon</span>
                  </AvatarFallback>
                )}
              </Avatar>
            </Link>
            <div className='text-sm'>
              <span className='font-medium'>{_props.comment.user.name}</span>
              {" - "}
              <span>
                {moment(_props.comment.created_at).format("LL")}{" "}
                {_props.comment.created_at !== _props.comment.updated_at
                  ? `: Edited at ${moment(_props.comment.updated_at).format("LL")}`
                  : null}
              </span>
            </div>
          </div>

          <Dropdown.DropdownMenu>
            <Dropdown.DropdownMenuTrigger asChild>
              <Button variant={"ghost"} size={"icon"} className='self-end'>
                <Lucide.MoreHorizontalIcon className='h-full w-4' />
              </Button>
            </Dropdown.DropdownMenuTrigger>

            <Dropdown.DropdownMenuContent>
              <Dropdown.DropdownMenuLabel>
                <span>Actions</span>
              </Dropdown.DropdownMenuLabel>
              <Dropdown.DropdownMenuSeparator />
              {auth.id === _props.comment.user_id ? (
                <Dropdown.DropdownMenuItem
                  onClick={() => {
                    if (!auth.id) return setIsRequestLoginOpen(true);
                    setIsEditing(true);
                  }}
                  className='flex cursor-pointer items-center'>
                  <Lucide.Edit className='mr-2 h-auto w-4' />
                  <span>Edit</span>
                </Dropdown.DropdownMenuItem>
              ) : null}
              <Dropdown.DropdownMenuItem
                onClick={() => {
                  if (!auth.id) return setIsRequestLoginOpen(true);
                  setIsReply(true);
                }}
                className='flex cursor-pointer items-center'>
                <Lucide.Reply className='mr-2 h-auto w-4' />
                <span>Reply</span>
              </Dropdown.DropdownMenuItem>

              {auth.id === _props.comment.user_id ? (
                <Dropdown.DropdownMenuItem
                  onClick={() => {
                    if (!auth.id) return setIsRequestLoginOpen(true);
                    setIsDeleteAlertOpen(true);
                  }}
                  className='flex cursor-pointer items-center'>
                  <Lucide.Trash2 className='mr-2 h-auto w-4' />
                  <span>Delete</span>
                </Dropdown.DropdownMenuItem>
              ) : null}

              <Dropdown.DropdownMenuItem
                onClick={() => handleCopyContent(_props.comment.content)}
                className='flex cursor-pointer items-center'>
                <Lucide.Copy className='mr-2 h-auto w-4' />
                <span>Copy content</span>
              </Dropdown.DropdownMenuItem>
            </Dropdown.DropdownMenuContent>
          </Dropdown.DropdownMenu>
        </div>

        {!isEditing ? (
          <div className='mx-auto w-full text-sm mobile:max-w-[calc(100%-75px)] mobile:text-base'>
            <ContentRenderer>{_props.comment.content}</ContentRenderer>
          </div>
        ) : null}
      </div>

      <LoginRequest isOpen={isRequestLoginOpen} setIsOpen={setIsRequestLoginOpen} />

      <DeleteCommentAlert
        handleReloadComments={_props.handleReloadComments}
        isOpen={isDeleteAlertOpen}
        setIsOpen={setIsDeleteAlertOpen}
        commentId={_props.comment.id}
      />

      {isReply || isEditing ? (
        <ReplyComment
          key={_props.comment.id}
          postId={_props.comment.post_id}
          commentId={_props.comment.id}
          user={_props.comment.user}
          initialValue={isEditing ? _props.comment.content : ""}
          close={() => {
            setIsReply(false);
            setIsEditing(false);
          }}
          handleReloadComments={_props.handleReloadComments}
        />
      ) : null}
    </div>
  );
};
