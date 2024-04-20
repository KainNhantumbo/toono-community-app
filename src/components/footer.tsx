import * as React from "react";
import { FOOTER_URLS } from "@/shared/constants";
import { metadata } from "@/shared/constants";
import { Link } from "react-router-dom";

export const Footer = (): React.JSX.Element => {
  return (
    <footer className='flex w-full flex-col items-center gap-3 bg-muted px-3 py-2'>
        <h4>{metadata.appName} - A inclusive the open source community for developers.</h4>
      <nav className=' flex items-center justify-center gap-3'>
        {FOOTER_URLS.map((group, i) => (
          <div className='flex flex-col flex-wrap gap-3' key={i}>
            {group.map((element, i) => (
              <div key={i} className='space-x-10 text-center text-sm font-medium'>
                <Link
                  to={element.path}
                  className='text-md hover:text-primary hover:underline'>
                  {element.label}
                </Link>{" "}
              </div>
            ))}
          </div>
        ))}
      </nav>
      <p className='font-medium'>
        Made Made with love and React.JS + Typescript. {metadata.appName} ©{" "}
        {new Date().getFullYear()}{" "}
      </p>
    </footer>
  );
};
