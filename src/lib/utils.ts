import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import moment from "moment";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDate = (date: string): string => moment(date).format("LL");

export const transformChild = (child: string) => {
  return child
    .replace(/ /g, "-")
    .replace(/[/\\^$*+?.()|[\]{}<>:;"'~,=@`#!%&]/g, "")
    .toLowerCase();
};

export const clipboard = async (content: string) => {
  try {
    await navigator.clipboard.writeText(content);
  } catch (error) {
    console.log(error);
  }
};
