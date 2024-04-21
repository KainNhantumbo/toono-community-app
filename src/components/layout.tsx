import { RootState } from "@/state/store";
import { LazyMotion, MotionConfig, domAnimation } from "framer-motion";
import * as React from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Footer } from "./footer";
import { Header } from "./header";
import { Toaster } from "sonner";
import { SpeechIcon, SunDimIcon, XIcon } from "lucide-react";
import { useThemeContext } from "@/context/theme-context";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useThemeContext();
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
        <Toaster
          closeButton
          duration={10000}
          pauseWhenPageIsHidden
          richColors
          theme={theme}
          icons={{
            error: <XIcon className='stroke-destructive' />,
            success: <SunDimIcon />,
            info: <SpeechIcon />
          }}
        />
      </LazyMotion>
    </MotionConfig>
  );
};
