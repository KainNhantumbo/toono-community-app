import type { ChangeEvent, FormEvent } from 'react';
import * as React from 'react'

export type RouteType = { path: string; element: React.JSX.ElementType };

export type InputEvent =
  | ChangeEvent<HTMLInputElement>
  | ChangeEvent<HTMLSelectElement>
  | ChangeEvent<HTMLTextAreaElement>;

  export type SubmitEvent = FormEvent<HTMLFormElement>;
