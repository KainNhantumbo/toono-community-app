import { Comment } from "@/types";
import { CommentItem } from "./comment-item";
import { cn } from "@/lib/utils";

export type CommentsRendererProps = {
  comments: Comment[];
  handleReloadComments: () => void | Promise<unknown>;
};

export type CommentWithChildren = Comment & {
  children?: Comment[];
};

function commentsByParent(comments: CommentWithChildren[]): CommentWithChildren[] {
  const group: { [key: string]: CommentWithChildren } = {};

  comments.forEach((comment) => {
    if (comment.reply_comment !== null) {
      if (!group[comment.reply_comment]) {
        group[comment.reply_comment] = { ...comment, children: [] };
      } else {
        group[comment.reply_comment].children = Array.from(
          new Set([...(group[comment.reply_comment].children || []), comment])
        );
      }
    } else {
      group[comment.id] = comment;
    }
  });

  return Object.values(group)
}

export const CommentsRenderer = (_props: CommentsRendererProps) => {
  const groupedComments = commentsByParent(_props.comments);
  console.log(groupedComments);

  function Render({ data, className }: { className: string; data: CommentWithChildren[] }) {
    return (
      <section className='flex flex-col'>
        {data.map((item, index) => (
          <div
            key={index.toString().concat(crypto.randomUUID())}
            className={cn({ [`ml-[${index * 10}px]`]: true })}>
            <CommentItem
              key={item.id}
              handleReloadComments={_props.handleReloadComments}
              comment={item}
            />
            {item.children && (
              <Render
                key={index.toString().concat(crypto.randomUUID())}
                className={cn({ [`ml-[${index * 10}px]`]: true })}
                data={item.children}
              />
            )}
          </div>
        ))}
      </section>
    );
  }



  return (
    <div className='mr-8'>
      {groupedComments.map((comment, index) => (
        <Render
          className={cn({ [`ml-[${index * 10}px]`]: true })}
          key={index.toString().concat(crypto.randomUUID())}
          data={[comment]}
        />
      ))}
    </div>
  );
};
