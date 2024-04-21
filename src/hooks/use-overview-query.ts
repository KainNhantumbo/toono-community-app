import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { useAppContext } from "@/context/app-context";
import { errorTransformer } from "@/lib/error";
import { toast } from "sonner";

const initialState = [{ posts: {} }];

export const useOverviewQuery = () => {
  const { client } = useAppContext();

  const getStats = async () => {
    try {
      const { data } = await client({ method: "get", url: "/api/v1/users/stats" });
      return data;
    } catch (error) {
      const { message } = errorTransformer(error);
      console.error(message);
      toast.error(message, { action: { label: "Retry", onClick: getStats } });
      return initialState;
    }
  };

  const { data, isError, isLoading } = useQuery({
    queryKey: ["overview-user-stats"],
    queryFn: getStats
  });

  const stats = React.useMemo(() => {
    if (data) return data;
    return initialState;
  }, [data]);

  return { data: stats, isError, isLoading };
};
