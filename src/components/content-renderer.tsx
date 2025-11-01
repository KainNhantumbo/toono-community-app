import { clipboard, transformChild } from "@/lib/utils";
import "@/styles/post-content.css";
import clsx from "clsx";
import { ClipboardCopy } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGFM from "remark-gfm";
import { toast } from "sonner";
import { Button } from "./ui/button";

export const ContentRenderer = ({ children }: { children: string }) => {
  const handleCopy = (data: unknown) => {
    const content = String(data).replace(/\n$/, "");
    clipboard(content);
    toast.success("Code copied successfully!");
  };

  return (
    <ReactMarkdown
      className='post-content'
      remarkPlugins={[remarkGFM]}
      components={{
        code({ children, className, ...rest }) {
          const match = /language-(\w+)/.exec(className || "");
          return match ? (
            <div className='my-3 flex flex-col rounded-lg border-4 font-mono text-white'>
              <div className='flex w-full items-center justify-between gap-2 rounded-t-[8px] bg-[#2B2B2B] px-3 py-2 pb-0'>
                <i className='font-sans text-xs font-bold uppercase text-primary'>
                  {match[1].toString()}
                </i>
                <Button
                  onClick={() => handleCopy(children)}
                  variant={"ghost"}
                  className='hover:bg-input/20 hover:dark:bg-secondary-foreground/10'
                  size={"icon"}>
                  <ClipboardCopy className='h-auto w-4 stroke-primary' />
                  <span className='sr-only'>Copy</span>
                </Button>
              </div>
              <SyntaxHighlighter
                {...rest}
                ref={undefined}
                style={{ ...a11yDark }}
                language={match[1]}
                showLineNumbers={true}
                customStyle={{
                  margin: 0,
                  borderRadius: "0 0 8px 8px"
                }}>
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
            </div>
          ) : (
            <code
              {...rest}
              className={clsx(
                className,
                "mx-1 rounded-sm border bg-input px-[5px] py-[2px] font-mono"
              )}>
              {children}
            </code>
          );
        },
        h2: ({ children, ...rest }) => (
          <h2 {...rest} id={transformChild(String(children))}>
            {children}
          </h2>
        ),
        h3: ({ children, ...rest }) => (
          <h2 {...rest} id={transformChild(String(children))}>
            {children}
          </h2>
        ),
        h4: ({ children, ...rest }) => (
          <h4 {...rest} id={transformChild(String(children))}>
            {children}
          </h4>
        ),
        h5: ({ children, ...rest }) => (
          <h5 {...rest} id={transformChild(String(children))}>
            {children}
          </h5>
        ),
        h6: ({ children, ...rest }) => (
          <h6 {...rest} id={transformChild(String(children))}>
            {children}
          </h6>
        )
      }}>
      {children}
    </ReactMarkdown>
  );
};
