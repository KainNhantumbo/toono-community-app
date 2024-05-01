import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Comment } from "@/types";
import * as Lucide from "lucide-react";
import moment from "moment";
import * as React from "react";
import { Link } from "react-router-dom";
import { ReplyComment } from "./comment-reply-form";
import * as Dropdown from "@/components/ui/dropdown-menu";
import { ContentRenderer } from "./content-renderer";
import { Button } from "./ui/button";
import { DeleteCommentAlert } from "./comment-delete-alert";

export type CommentItemProps = { comment: Comment; handleReloadComments: () => void };
export const CommentItem = (_props: CommentItemProps) => {
  const [isReply, setIsReply] = React.useState<boolean>(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = React.useState<boolean>(false);

  return (
    <div className={"mt-3 w-full rounded-lg border bg-background p-3"}>
      <div className='flex flex-col'>
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
              <Dropdown.DropdownMenuItem
                onClick={() => setIsReply(true)}
                className='flex cursor-pointer items-center'>
                <Lucide.Reply className='mr-2 h-auto w-4' />
                <span>Reply</span>
              </Dropdown.DropdownMenuItem>
              <Dropdown.DropdownMenuItem
                onClick={() => setIsDeleteAlertOpen(true)}
                className='flex cursor-pointer items-center'>
                <Lucide.Trash2 className='mr-2 h-auto w-4' />
                <span>Delete</span>
              </Dropdown.DropdownMenuItem>
            </Dropdown.DropdownMenuContent>
          </Dropdown.DropdownMenu>
        </div>

        <div className='w-full pl-10'>
          <ContentRenderer>{_props.comment.content}</ContentRenderer>
        </div>
      </div>

      <DeleteCommentAlert
      handleReloadComments={_props.handleReloadComments}
        isOpen={isDeleteAlertOpen}
        setIsOpen={setIsDeleteAlertOpen}
        commentId={_props.comment.id}
      />

      {isReply ? (
        <ReplyComment
          key={_props.comment.id}
          commentId={_props.comment.id}
          user={_props.comment.user}
          handleCancel={() => setIsReply(false)}
          handleReloadComments={_props.handleReloadComments}
        />
      ) : null}
    </div>
  );
};
