import { useAppContext } from "@/context/app-context";
import { errorTransformer } from "@/lib/error";
import { RootState } from "@/state/store";
import { User } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";

export const initialUserState: User = {
  id: "",
  name: "",
  user_name: "",
  biography: "",
  birthday: "",
  work: "",
  available: "",
  education: "",
  learning: "",
  location: "",
  network: { facebook: "", github: "", instagram: "", linkedin: "", website: "" },
  profile_image: null,
  updated_at: "",
  created_at: ""
};

export const useUserDataQuery = () => {
  const { client } = useAppContext();
  const auth = useSelector((state: RootState) => state.auth);

  const getUserData = async () => {
    try {
      const { data } = await client<User>({
        method: "get",
        url: `/api/v1/users/${auth.id}`
      });
      return { ...data };
    } catch (error) {
      const { message } = errorTransformer(error);
      console.error(error);
      console.warn(message);
      return initialUserState;
    }
  };

  const { data, error, refetch, isError, isLoading } = useQuery({
    queryKey: ["user-data-query"],
    queryFn: getUserData
  });

  return { data: data || initialUserState, isError, error, isLoading, refetch };
};
