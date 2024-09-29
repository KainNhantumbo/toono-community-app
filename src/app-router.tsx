import * as React from "react";
import { createBrowserRouter } from "react-router-dom";
import { Loader } from "./components/loader";
import { RouteErrorBoundary } from "./components/route-error";

const NotFoundPage = React.lazy(() => import("@/router/404"));
const HomePage = React.lazy(() => import("./router/public/home"));
const SignupPage = React.lazy(() => import("./router/public/auth/sign-up"));
const UpdateCredentialsPage = React.lazy(
  () => import("./router/public/auth/update-credentials")
);
const PasswordRecoveryRequestPage = React.lazy(
  () => import("./router/public/auth/password-recovery-request")
);
const SignInOauthLoadingPage = React.lazy(
  () => import("./router/public/auth/sign-in-oauth")
);
const SignupSuccessPage = React.lazy(() => import("./router/public/auth/sign-up-success"));
const AboutPage = React.lazy(() => import("./router/public/docs/about"));
const SigninPage = React.lazy(() => import("./router/public/auth/sign-in"));
const ForgotPasswordPage = React.lazy(() => import("./router/public/auth/forgot-password"));
const PrivacyPolicyPage = React.lazy(() => import("./router/public/docs/privacy-policy"));
const TermsOfUsePage = React.lazy(() => import("./router/public/docs/terms-of-use"));
const ContactUsPage = React.lazy(() => import("./router/public/contact"));
const CodeOfConductPage = React.lazy(() => import("./router/public/docs/code-of-conduct"));
const Overview = React.lazy(() => import("./router/private/dashboard/overview"));
const Posts = React.lazy(() => import("./router/private/dashboard/posts"));
const PostsEditor = React.lazy(() => import("./router/private/dashboard/posts-editor"));
const Account = React.lazy(() => import("./router/private/dashboard/account"));
const Configurations = React.lazy(
  () => import("./router/private/dashboard/configurations")
);
const UserPage = React.lazy(() => import("@/router/public/user"));
const PostPage = React.lazy(() => import("@/router/public/post"));

const routes: Array<{ path: string; element: React.JSX.ElementType }> = [
  { element: HomePage, path: "/" },
  { element: SigninPage, path: "/auth/sign-in" },
  { element: SignInOauthLoadingPage, path: "/auth/sign-in-oauth" },
  { element: SignupPage, path: "/auth/sign-up" },
  { element: UpdateCredentialsPage, path: "/auth/update-credentials" },
  { element: ForgotPasswordPage, path: "/auth/forgot-password" },
  { element: PasswordRecoveryRequestPage, path: "/auth/password-recovery-request" },
  { element: ContactUsPage, path: "/contact" },
  { element: PrivacyPolicyPage, path: "/privacy-policy" },
  { element: TermsOfUsePage, path: "/terms-of-use" },
  { element: CodeOfConductPage, path: "/code-of-conduct" },
  { element: PostPage, path: "/community/posts/:slug" },
  { element: UserPage, path: "/community/users/:userId" },
  { element: Overview, path: "/users/dashboard/overview" },
  { element: Posts, path: "/users/dashboard/posts" },
  { element: PostsEditor, path: "/users/dashboard/posts/post-editor/:id" },
  { element: Configurations, path: "/users/dashboard/configurations" },
  { element: Account, path: "/users/dashboard/account" },
  { element: AboutPage, path: "/about" },
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
