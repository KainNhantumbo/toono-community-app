import * as React from "react";
import { FOOTER_URLS } from "@/shared/constants";
import { metadata } from "@/shared/constants";
import { Link } from "react-router-dom";

export const Footer = (): React.JSX.Element => {
  return (
    <footer className='flex w-full flex-col items-center gap-3'>
      <h4>{metadata.appName} - A inclusive the open source community for developers.</h4>
      <nav className=' flex items-center justify-center gap-3'>
        {FOOTER_URLS.map((group, i) => (
          <div className='flex flex-col gap-3' key={i}>
            {group.map((element, i) => (
              <div key={i}>
                <Link to={element.path}>{element.label}</Link>{" "}
              </div>
            ))}
          </div>
        ))}
      </nav>
      <div className='flex w-full flex-col'>
        <p>
          Made Made with love and React.JS + Typescript. {metadata.appName} ©{" "}
          {new Date().getFullYear()}{" "}
        </p>
      </div>
    </footer>
  );
};
