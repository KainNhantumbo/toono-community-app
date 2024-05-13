import { useThemeContext } from "@/context/theme-context";
import { RootState } from "@/state/store";
import { LazyMotion, MotionConfig, domAnimation } from "framer-motion";
import { CheckIcon, SpeechIcon, XIcon } from "lucide-react";
import * as React from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Toaster } from "sonner";
import { Footer } from "./footer";
import { Header } from "./header";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useThemeContext();
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useSelector((state: RootState) => state.auth);

  const isHomePage = React.useMemo(() => {
    if (location.pathname === "/") return true;
    return false;
  }, [location.pathname]);

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
        <div>{children}</div>
        {!isHomePage ? <Footer /> : null}
        <Toaster
          closeButton
          duration={10000}
          pauseWhenPageIsHidden
          richColors
          theme={theme}
          icons={{
            error: <XIcon className='stroke-destructive' />,
            success: <CheckIcon />,
            info: <SpeechIcon />
          }}
        />
      </LazyMotion>
    </MotionConfig>
  );
};
