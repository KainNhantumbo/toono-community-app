import { transformChild } from "@/lib/utils";
import { marked } from "marked";
import { Link } from "react-router-dom";
import { Separator } from "./ui/separator";

export type PostHeadingsList = Array<{
  raw: string;
  depth: number;
  text: string;
}>;

export const TableOfContents = ({ content }: { content: string }) => {
  const headings = marked
    .lexer(content)
    .filter((token) => token.type === "heading") as PostHeadingsList;

  if (headings.length < 1) return null;

  return (
    <>
      <Separator decorative className='my-3' />
      <aside className='toc-container base-border my-2 rounded-xl bg-foreground p-3 px-4'>
        <nav className='flex flex-col gap-2'>
          <h2 className='font-sans-body text-xl'>Table of Contents</h2>
          <ul>
            {headings.map((heading, index) => (
              <li
                key={index}
                className='list-inside pl-3'
                style={{ paddingLeft: `calc(${heading.depth}px * 8px)` }}>
                <a
                  href={`#${transformChild(heading.text)}`}
                  className='group font-medium underline underline-offset-4 transition-colors'>
                  {String(heading.text)}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      <Separator decorative className='my-3' />
    </>
  );
};
