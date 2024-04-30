import { useAppContext } from "@/context/app-context";
import { errorTransformer } from "@/lib/error";
import * as React from "react";
import { toast } from "sonner";

export interface ClapsQueryProps {
  reloadFn: () => void | Promise<unknown>;
}

export function useClapsQuery({ reloadFn }: ClapsQueryProps) {
  const { client } = useAppContext();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const handleRemoveClap = async (postId: string) => {
    setIsLoading(true);
    try {
      await client({ method: "delete", url: `/api/v1/claps/${postId}` });
      await reloadFn();
    } catch (error) {
      const { message } = errorTransformer(error);
      console.error(error);
      console.warn(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddClap = async (postId: string) => {
    setIsLoading(true);
    try {
      await client({ method: "post", url: `/api/v1/claps/${postId}` });
      await reloadFn();
    } catch (error) {
      const { message } = errorTransformer(error);
      console.error(error);
      console.warn(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return { isClapsQueryLoading: isLoading, handleRemoveClap, handleAddClap };
}
