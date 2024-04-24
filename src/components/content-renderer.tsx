import { clipboard, transformChild } from "@/lib/utils";
import clsx from "clsx";
import { ClipboardCopyIcon } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import remarkGFM from "remark-gfm";

export const ContentRenderer = ({ children }: { children: string }) => (
  <ReactMarkdown
    className='blog-post-content'
    remarkPlugins={[remarkGFM]}
    components={{
      code({ children, className, ...rest }) {
        const match = /language-(\w+)/.exec(className || "");
        return match ? (
          <div className='font-monospace my-3 flex flex-col gap-0 text-white'>
            <div className='flex w-full items-center justify-between gap-2 rounded-t-xl border-b-2 border-b-font/10 bg-[#2F2F2F] px-3 py-2'>
              <i className='font-sans text-xs font-bold uppercase'>{match[1].toString()}</i>
              <button
                onClick={() => clipboard(String(children).replace(/\n$/, ""))}
                className='base-border group flex flex-row flex-nowrap items-center gap-2 rounded-lg p-1 px-2 hover:bg-primary/30 active:animate-ping'>
                <ClipboardCopyIcon className='h-auto w-4' />
                <span className='font-sans text-xs font-bold uppercase'>Copy</span>
              </button>
            </div>
            <SyntaxHighlighter
              {...rest}
              style={{ ...materialDark }}
              language={match[1]}
              showLineNumbers
              customStyle={{ margin: 0 }}
              ref={undefined}>
              {String(children).replace(/\n$/, "")}
            </SyntaxHighlighter>
          </div>
        ) : (
          <code
            {...rest}
            className={clsx(
              className,
              "font-monospace mx-1 rounded-[5px] bg-font/10 px-[5px] py-[2px]"
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
