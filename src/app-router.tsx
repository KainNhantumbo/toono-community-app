import * as React from "react";
import { Route, Routes } from "react-router-dom";
import { Loader } from "./components/loader";

const NotFoundPage = React.lazy(() => import("@/router/404"));
const HomePage = React.lazy(() => import("./router/public/home"));
const SignupPage = React.lazy(() => import("./router/public/auth/sign-up"));
const SigninPage = React.lazy(() => import("./router/public/auth/sign-in"));

const routes: Array<{ path: string; element: React.JSX.ElementType }> = [
  { element: HomePage, path: "/" },
  { element: SigninPage, path: "/auth/sign-in" },
  { element: SignupPage, path: "/auth/sign-up" },
  { element: NotFoundPage, path: "*" }
];

export const AppRouter = () => {
  return (
    <React.Suspense fallback={<Loader />}>
      <Routes>
        {routes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={
              <React.Suspense fallback={<Loader />}>
                <route.element />
              </React.Suspense>
            }
          />
        ))}
      </Routes>
    </React.Suspense>
  );
};
