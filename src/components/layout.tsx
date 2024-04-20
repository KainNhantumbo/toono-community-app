import * as React from "react";
import { LazyMotion, MotionConfig, domAnimation } from "framer-motion";
import { Header } from "./header";
import { Footer } from "./footer";
// import { Toaster } from "sonner";

//TODO: complete this instead
export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <MotionConfig reducedMotion='user'>
      <LazyMotion strict={true} features={domAnimation}>
        <Header />
        {children}
        <Footer />
        {/* <Toaster closeButton loadingIcon duration={3000} /> */}
      </LazyMotion>
    </MotionConfig>
  );
};
