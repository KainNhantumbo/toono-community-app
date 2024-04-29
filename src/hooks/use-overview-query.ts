import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { useAppContext } from "@/context/app-context";
import { errorTransformer } from "@/lib/error";
import { toast } from "sonner";

export type ResultData = { _count: number }[][];

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
      throw error;
    }
  };

  const { data, isError, isLoading } = useQuery({
    queryKey: ["overview-user-stats"],
    queryFn: getStats
  });

  const stats = React.useMemo(() => {
    if (data) return data;
  }, [data]);

  return { data: stats, isError, isLoading };
};
