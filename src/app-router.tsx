import * as React from "react";
import { createBrowserRouter } from "react-router-dom";
import { Loader } from "./components/loader";
import { RouteErrorBoundary } from "./components/route-error";

const NotFoundPage = React.lazy(() => import("@/router/404"));
const HomePage = React.lazy(() => import("./router/public/home"));
const SignupPage = React.lazy(() => import("./router/public/auth/sign-up"));
const SignupSuccessPage = React.lazy(() => import("./router/public/auth/sign-up-success"));
const SigninPage = React.lazy(() => import("./router/public/auth/sign-in"));
const Overview = React.lazy(() => import("./router/private/dashboard/overview"));
const Posts = React.lazy(() => import("./router/private/dashboard/posts"));
const PostsEditor = React.lazy(() => import("./router/private/dashboard/posts-editor"));
const Account = React.lazy(() => import("./router/private/dashboard/account"));
const Configurations = React.lazy(
  () => import("./router/private/dashboard/configurations")
);

const routes: Array<{ path: string; element: React.JSX.ElementType }> = [
  { element: HomePage, path: "/" },
  { element: SigninPage, path: "/auth/sign-in" },
  { element: SignupPage, path: "/auth/sign-up" },
  { element: Overview, path: "/users/dashboard/overview" },
  { element: Posts, path: "/users/dashboard/posts" },
  { element: PostsEditor, path: "/users/dashboard/posts/post-editor/:id" },
  { element: Configurations, path: "/users/dashboard/configurations" },
  { element: Account, path: "/users/dashboard/account" },
  { element: SignupSuccessPage, path: "/auth/sign-up-success" },
  { element: NotFoundPage, path: "*" }
];

export const router = createBrowserRouter(
  routes.map((route, index) => ({
    key: index,
    path: route.path,
    element: (
      <React.Suspense fallback={<Loader />}>
        <route.element />
      </React.Suspense>
    ),
    errorElement: <RouteErrorBoundary />
  }))
);
