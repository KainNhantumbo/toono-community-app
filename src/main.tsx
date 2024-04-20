import "@/styles/index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { AppRouter } from "./app-router.tsx";
import { Provider as StoreProvider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { AppContext } from "./context/app-context.tsx";
import { store } from "./state/store.ts";
import { ThemeContext } from "./context/theme-context.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <StoreProvider store={store}>
      <BrowserRouter>
        <AppContext>
          <ThemeContext>
            <AppRouter />
          </ThemeContext>
        </AppContext>
      </BrowserRouter>
    </StoreProvider>
  </React.StrictMode>
);
