import * as React from "react";
import { Route, Routes } from "react-router-dom";
import { Loader } from "./components/loader";

const NotFoundPage = React.lazy(() => import("@/router/404"));
const HomePage = React.lazy(() => import("./router/public/home"));
const SignupPage = React.lazy(() => import("./router/public/auth/sign-up"));
const SignupSuccessPage = React.lazy(() => import("./router/public/auth/sign-up-success"));
const SigninPage = React.lazy(() => import("./router/public/auth/sign-in"));
const Overview = React.lazy(() => import("./router/private/dashboard/overview"));
const Configurations = React.lazy(() => import("./router/private/dashboard/configurations"));
const Account = React.lazy(() => import("./router/private/dashboard/account"));

const routes: Array<{ path: string; element: React.JSX.ElementType }> = [
  { element: HomePage, path: "/" },
  { element: SigninPage, path: "/auth/sign-in" },
  { element: SignupPage, path: "/auth/sign-up" },
  { element: Overview, path: "/users/dashboard/overview" },
  { element: Configurations, path: "/users/dashboard/configurations" },
  { element: Account, path: "/users/dashboard/account" },
  { element: SignupSuccessPage, path: "/auth/sign-up-success" },
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
