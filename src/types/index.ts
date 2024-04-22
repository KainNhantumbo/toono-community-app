import type { AxiosError } from "axios";
import { LucideIcon } from "lucide-react";
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

export type DashboardActions = Array<{
  label: string;
  description: string;
  icon: LucideIcon;
  path: string;
}>;



export type User = {
  id: string;
  name: string;
  user_name: string;
  biography: string;
  work: string;
  education: string;
  learning: string;
  available: string;
  location: string;
  birthday: null | string;
  created_at: string;
  updated_at: string;
  network: {
    website: string;
    github: string;
    facebook: string;
    instagram: string;
    linkedin: string;
  };
  profile_image: null | { url: string };
};