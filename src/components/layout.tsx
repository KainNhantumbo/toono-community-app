import * as React from "react";
import { LazyMotion, MotionConfig, domAnimation } from "framer-motion";
import { Header } from "./header";
import { Footer } from "./footer";

// complete this instead
export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <MotionConfig reducedMotion='user'>
      <LazyMotion strict={true} features={domAnimation}>
        <Header />
        {children}
        <Footer />
      </LazyMotion>
    </MotionConfig>
  );
};
