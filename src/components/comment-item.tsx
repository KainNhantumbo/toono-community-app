import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Comment } from "@/types";
import * as Lucide from "lucide-react";
import moment from "moment";
import * as React from "react";
import { Link } from "react-router-dom";
import { ReplyComment } from "./comment-reply-form";
import { ContentRenderer } from "./content-renderer";

export type CommentItemProps = { comment: Comment; handleReloadComments: () => void };
export const CommentItem = (_props: CommentItemProps) => {
  const [isReply, setIsReply] = React.useState<boolean>(false);

  return (
    <div className={"mt-3 w-full rounded-lg border bg-background p-3"}>
      <div className='flex flex-col'>
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

        <div className='w-full pl-10'>
          <ContentRenderer>{_props.comment.content}</ContentRenderer>
        </div>
      </div>

      {isReply ? (
        <ReplyComment
          commentId={_props.comment.id}
          user={_props.comment.user}
          handleReloadComments={_props.handleReloadComments}
        />
      ) : null}
    </div>
  );
};
