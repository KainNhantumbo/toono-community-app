import { ContentRenderer } from "./content-renderer";
import MdEditor from "react-markdown-editor-lite";

export type ContentEditorProps = {
  handler: (content: { text: string; html: string }) => void;
  value: string;
};

export const ContentEditor = (_props: ContentEditorProps) => {
  return (
    <div>
      <MdEditor
        style={{ height: "500px", background: "#000" }}
        value={_props.value}
        renderHTML={(text) => <ContentRenderer>{text}</ContentRenderer>}
        onChange={_props.handler}
        view={{ html: false }}
      />
    </div>
  );
};
