import type { CommentWithChildren } from "@/types";
import { CommentItem } from "./comment-item";
import { useCommentsSectionContext } from "./comments-section";

const commentsByParent = (comments: CommentWithChildren[]): CommentWithChildren[] => {
  const group: { [key: string]: CommentWithChildren } = {};

  const nestComments = (parentId: string): CommentWithChildren[] => {
    const children = comments.filter((comment) => comment.reply_comment === parentId);
    if (children.length === 0) return [];

    return children.map((child) => ({
      ...child,
      children: nestComments(child.id)
    }));
  };

  comments.forEach((comment) => {
    if (comment.reply_comment === null) {
      group[comment.id] = {
        ...comment,
        children: Array.from(new Set(nestComments(comment.id)))
      };
    }
  });
  return Object.values(group);
};

export const CommentsRenderer = () => {
  const { comments } = useCommentsSectionContext();

  if (comments.length < 1) return null;
  const groupedComments = Array.from(new Set(commentsByParent(comments)));

  const Render = ({ data }: { data: CommentWithChildren[] }) => (
    <section className='ml-3 flex flex-col'>
      {Array.from(new Set(data)).map((item, index) => (
        <div key={crypto.randomUUID()}>
          <CommentItem key={crypto.randomUUID()} comment={item} />
          {item.children && <Render key={item.id} data={item.children} />}
        </div>
      ))}
    </section>
  );

  return groupedComments.map((comment, index) => (
    <Render key={comment.id.concat(index.toString())} data={[comment]} />
  ));
};
