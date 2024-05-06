import { DEFAULT_ERROR_MESSAGE } from "@/shared/constants";
import type { HttpError } from "@/types";

export const errorTransformer = (_props: unknown) => {
  const { status, response } = _props as HttpError;
  let message: string = DEFAULT_ERROR_MESSAGE;

  if (response?.data && response.data.message) {
    if (Array.isArray(response.data.message)) {
      message = response.data.message.reduce(
        (value, current) => value.concat(current.toUpperCase(), ". "),
        ""
      );
    } else {
      message = response?.data?.message;
    }
  }

  return {
    message: message || DEFAULT_ERROR_MESSAGE,
    statusCode: response?.data.status || status
  };
};
