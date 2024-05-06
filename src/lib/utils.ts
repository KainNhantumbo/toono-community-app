import { GitHubLogoIcon, InstagramLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";
import { RiFacebookCircleFill } from "@remixicon/react";
import { clsx, type ClassValue } from "clsx";
import { GlobeIcon } from "lucide-react";
import moment from "moment";
import { twMerge } from "tailwind-merge";

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

export const createUserConnection = (type: string) => {
  switch (type) {
    case "github":
      return { icon: GitHubLogoIcon, name: "Github" };
    case "linkedin":
      return { icon: LinkedInLogoIcon, name: "LinkedIn" };
    case "website":
      return { icon: GlobeIcon, name: "Website" };
    case "instagram":
      return { icon: InstagramLogoIcon, name: "Instagram" };
    case "facebook":
      return { icon: RiFacebookCircleFill, name: "Facebook" };
    default:
      return { icon: GlobeIcon, name: "Internet" };
  }
};
