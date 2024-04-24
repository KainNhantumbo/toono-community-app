import "@/styles/index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider as StoreProvider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { router } from "./app-router.tsx";
import { AppContext } from "./context/app-context.tsx";
import { ThemeContext } from "./context/theme-context.tsx";
import { store } from "./state/store.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <StoreProvider store={store}>
      <AppContext>
        <ThemeContext>
          <RouterProvider router={router} />
        </ThemeContext>
      </AppContext>
    </StoreProvider>
  </React.StrictMode>
);
