import { useLocalStorage } from "@uidotdev/usehooks";
import * as React from "react";

// TODO: ADD TOAST TO THIS
// import { toast } from "sonner";

type ThemeVariants = "light" | "dark";

type Context = { theme: ThemeVariants; setTheme: () => void };

const context = React.createContext<Context>({ theme: "light", setTheme: () => {} });

export const ThemeContext = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useLocalStorage<ThemeVariants>("TOONO-UI-THEME", "light");

  const toggleTheme = () => {
    const html = document.querySelector("html");
    // TODO: FIX THIS
    // if (!html) return toast.error("Failed to change theme");
    const currentTheme = theme === "light" ? "dark" : "light";
    html?.setAttribute("class", currentTheme);
    setTheme(currentTheme);
  };

  const handleSync = React.useCallback(() => {
    const html = document.querySelector("html");
    // TODO: FIX THIS
    // if (!html) return toast.error("Failed to change theme");
    html?.setAttribute("class", theme);
  }, [theme]);

  React.useEffect(() => {
    handleSync();
  }, []);

  return (
    <context.Provider value={{ theme, setTheme: toggleTheme }}>{children}</context.Provider>
  );
};

export const useThemeContext = () => React.useContext(context);
