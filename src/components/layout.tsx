import * as React from 'react';
import { LazyMotion, MotionConfig, domAnimation } from 'framer-motion';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <MotionConfig reducedMotion='user'>
      <LazyMotion strict={true} features={domAnimation}>
        {children}
      </LazyMotion>
    </MotionConfig>
  );
};
