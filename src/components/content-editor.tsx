import MarkdownEditor from "@uiw/react-markdown-editor";

export type ContentEditorProps = {
  handler: (content: string) => void;
  value: string;
};

export const ContentEditor = (_props: ContentEditorProps) => {
  return (
    <div className='h-full max-h-[580px] w-full'>
      <MarkdownEditor
        value={_props.value}
        className='max-h-[700px] bg-transparent'
        toolbarsMode={[]}
        onChange={(value) => _props.handler(value)}
        enablePreview={false}
        minHeight='300px'
        maxHeight='480px'
      />
    </div>
  );
};
