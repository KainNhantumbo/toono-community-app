import { useWindowSize } from "@uidotdev/usehooks";
import MarkdownEditor from "@uiw/react-markdown-editor";

// this styles must always be in the end of imports
import "@/styles/editor.css";

export type ContentEditorProps = {
  handler: (content: string) => void;
  value: string;
};

export const ContentEditor = (_props: ContentEditorProps) => {
  const { width: windowWidth } = useWindowSize();

  return (
    <div className='relative h-full max-h-[580px] w-full border-b'>
      <MarkdownEditor
        maxHeight={windowWidth && windowWidth < 400 ? "300px" : "440px"}
        minHeight='300px'
        toolbarsMode={[]}
        value={_props.value}
        enablePreview={false}
        onChange={(value) => _props.handler(value)}
        basicSetup={{
          syntaxHighlighting: false,
          lineNumbers: false,
          foldGutter: false,
          highlightActiveLine: false
        }}
        className='max-h-[700px] overflow-y-auto'
      />
    </div>
  );
};
