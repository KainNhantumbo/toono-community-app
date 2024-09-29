import { AlertMessage } from "@/components/alert-message";
import { Layout } from "@/components/layout";
import { Loader } from "@/components/loader";
import { Spotlight } from "@/components/spotlight-effect";
import httpClient from "@/config/http-client";
import { useThemeContext } from "@/context/theme-context";
import { errorTransformer } from "@/lib/error";
import { mutateAuth } from "@/state/slices/auth";
import { AppDispatch } from "@/state/store";
import { Auth } from "@/types";
import { useDocumentTitle } from "@uidotdev/usehooks";
import { AlertOctagonIcon } from "lucide-react";
import * as React from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";

const initialErrorState = {
  isError: false,
  message: ""
};

export default function SigninPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { theme } = useThemeContext();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [errors, setErrors] = React.useState(initialErrorState);

  // github auth flow
  const [params] = useSearchParams(window.location.search);
  const code = params.get("code");

  const onGithubAuth = async () => {
    setIsLoading(true);
    setErrors(initialErrorState);
    try {
      if (!code) throw new Error("Url malformed.");

      const scope = "read:user";
      const { data } = await httpClient<Auth>({
        method: "get",
        url: `/api/v1/auth/oauth/github/${code}/${scope}`,
        withCredentials: true
      });

      dispatch(mutateAuth({ ...data }));
      navigate(`/users/dashboard/overview`, { replace: true });
    } catch (error) {
      const { message } = errorTransformer(error);
      console.error(error);
      console.warn(message);
      setErrors((state) => ({ ...state, isError: true, message: message }));
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    onGithubAuth();
  }, [code]);

  useDocumentTitle("Sign In - Toono Community");

  return (
    <Layout>
      <main className='flex w-full flex-col gap-12 px-4'>
        <div className='mx-auto w-full max-w-md p-4 shadow-input md:p-8'>
          <Spotlight
            fill={theme === "light" ? "#FACC15AA" : "#FACC15AA"}
            className='max-h-[100%]'
          />

          {isLoading && (
            <Loader className='h-[100%] w-[100%]' message='Signing in... Please wait...' />
          )}

          {errors.isError ? (
            <AlertMessage
              icon={AlertOctagonIcon}
              message={errors.message}
              action={{ label: "Retry", handler: onGithubAuth }}
            />
          ) : null}
        </div>
      </main>
    </Layout>
  );
}
