import httpClient from "@/config/http-client";
import { errorTransformer } from "@/lib/error";
import { updateAuth } from "@/state/slices/auth";
import { RootState } from "@/state/store";
import { Auth, HttpError } from "@/types";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

type Context = {
  client: <T>(config: AxiosRequestConfig<T>) => Promise<AxiosResponse<T>>;
};

const context = React.createContext<Context>({
  client: ({ ...config }) => httpClient(config)
});

const queryClient = new QueryClient({
  defaultOptions: { queries: { networkMode: "always" } }
});

export const AppContext = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);

  const authenticate = async () => {
    try {
      const { data } = await httpClient<Auth>({
        method: "get",
        url: "/api/v1/auth/refresh",
        withCredentials: true
      });
      dispatch(updateAuth({ ...data }));
    } catch (error) {
      const { message } = errorTransformer(error as HttpError);
      console.error(message || error);
    }
  };

  const client = <T = unknown, S = AxiosRequestConfig>(config: S) => {
    httpClient.interceptors.response.use(undefined, (error): Promise<never> => {
      const status = (error as AxiosError).response?.status as number;
      let retryCount = 0;
      if (status && status > 400 && status < 404 && retryCount < 6) {
        authenticate().catch((error) => {
          const { message } = errorTransformer(error as HttpError);
          console.error(message || error);
          retryCount += 1;
        });
      }
      navigate("/auth/sign-in");
      return Promise.reject(error);
    });
    return httpClient<T>({
      ...config,
      headers: { authorization: `Bearer ${auth.token}` },
      withCredentials: true
    });
  };


  // sends a handshake to the server
  const onHandShake = async () => {
    try {
      const { data } = await httpClient<{ statusCode: number; message: string }>({
        method: "get",
        url: "/api/v1/health"
      });
      console.info(`Service response status code: ${data.statusCode}. ${data.message}`);
    } catch (error) {
      const { message } = errorTransformer(error as HttpError);
      console.error(message || error);
    }
  };

  React.useEffect((): (() => void) => {
    const instance = setTimeout(() => authenticate(), 1000 * 60 * 4);
    return (): void => clearTimeout(instance);
  }, [auth]);

  React.useEffect(() => {
    onHandShake();
    authenticate();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <context.Provider value={{ client }}>{children}</context.Provider>
    </QueryClientProvider>
  );
};

export const useAppContext = () => React.useContext(context);
