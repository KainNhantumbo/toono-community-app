import { Comment } from "@/types";
import { CommentItem } from "./comment-item";

export type CommentsRendererProps = {
  comments: Comment[];
  handleReloadComments: () => void | Promise<unknown>;
};

export const CommentsRenderer = (_props: CommentsRendererProps) => {
  return (
    <section className='flex flex-col'>
      {_props.comments.map((comment) => (
        <CommentItem
          key={comment.id}
          handleReloadComments={_props.handleReloadComments}
          comment={comment}
        />
      ))}
    </section>
  );
};
