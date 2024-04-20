import { RootState } from "@/state/store";
import { LazyMotion, MotionConfig, domAnimation } from "framer-motion";
import * as React from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Footer } from "./footer";
import { Header } from "./header";
// import { Toaster } from "sonner";

//TODO: instantiate the toaster
export const Layout = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useSelector((state: RootState) => state.auth);

  React.useEffect(() => {
    const instance = setTimeout(() => {
      if (location.pathname.includes("dashboard") && !auth.id) {
        navigate("/auth/sign-in", { replace: true });
      }
    }, 500);
    return () => clearTimeout(instance);
  }, [auth, location.pathname]);

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
