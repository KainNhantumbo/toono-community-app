import { useLocalStorage } from "@uidotdev/usehooks";
import * as React from "react";

export type ThemeVariants = "light" | "dark";
type Context = {
  theme: ThemeVariants;
  handleChangeTheme: (variant: ThemeVariants) => void;
};

const context = React.createContext<Context>({
  theme: "light",
  handleChangeTheme: () => {}
});

export const ThemeContext = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useLocalStorage<ThemeVariants>("TOONO-UI-THEME", "light");

  const handleChangeTheme = (variant: ThemeVariants) => {
    const html = document.querySelector("html");
    if (html) {
      html.setAttribute("class", variant);
      setTheme(variant);
    }
  };

  const handleSync = React.useCallback(() => {
    const html = document.querySelector("html");
    if (html) {
      html.setAttribute("class", theme);
    }
  }, [theme]);

  React.useEffect(() => {
    handleSync();
  }, []);

  return (
    <context.Provider value={{ theme,  handleChangeTheme }}>{children}</context.Provider>
  );
};

export const useThemeContext = () => React.useContext(context);
