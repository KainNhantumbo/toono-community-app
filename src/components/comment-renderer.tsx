import type { CommentWithChildren, CommentsRendererProps } from "@/types";
import { CommentItem } from "./comment-item";

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
      group[comment.id] = { ...comment, children: nestComments(comment.id) };
    }
  });
  return Object.values(group);
};

export const CommentsRenderer = (_props: CommentsRendererProps) => {
  const groupedComments = commentsByParent(_props.comments);

  const Render = ({ data }: { data: CommentWithChildren[] }) => (
    <section className='flex flex-col' style={{ marginLeft: `${2 * 9}px` }}>
      {data.map((item, index) => (
        <div key={index.toString().concat(crypto.randomUUID())}>
          <CommentItem
            key={item.id}
            handleReloadComments={_props.handleReloadComments}
            comment={item}
          />
          {item.children && (
            <div style={{ marginLeft: `${index * 18}px` }}>
              <Render
                key={index.toString().concat(crypto.randomUUID())}
                data={item.children}
              />
            </div>
          )}
        </div>
      ))}
    </section>
  );

  return groupedComments.map((comment, index) => (
    <div>
      <Render key={index.toString().concat(crypto.randomUUID())} data={[comment]} />
    </div>
  ));
};
