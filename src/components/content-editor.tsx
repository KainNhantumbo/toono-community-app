// import "@/styles/editor.css";
import MarkdownEditor from "@uiw/react-markdown-editor";

export type ContentEditorProps = {
  handler: (content: string) => void;
  value: string;
};

export const ContentEditor = (_props: ContentEditorProps) => {
  return (
    <div className='h-full max-h-[780px] w-full'>
      <MarkdownEditor
        value={_props.value}
        className='max-h-[700px]'
        onChange={(value, viewUpdate) => _props.handler(value)}
        // preview={"live"}
        // highlightEnable={true}
        // value={_props.value}
        // onChange={(value, event, state) => {
        // console.log(value);
        // if (typeof value === "string") return _props.handler(value);
        // }}
      />
    </div>
  );
};
