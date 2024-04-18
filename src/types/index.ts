import type { AxiosError } from "axios";
import type { ChangeEvent, FormEvent } from "react";
import * as React from "react";

export type RouteType = { path: string; element: React.JSX.ElementType };

export type InputEvent =
  | ChangeEvent<HTMLInputElement>
  | ChangeEvent<HTMLSelectElement>
  | ChangeEvent<HTMLTextAreaElement>;

export type SubmitEvent = FormEvent<HTMLFormElement>;

export type Filters = { search: string; offset: string; limit: string; sort: string };

export type Auth = {
  id: string;
  token: string;
  name: string;
  email: string;
  profile_image: string;
};

export type HttpError = AxiosError<{ message: string; code?: string; status: number }>;
