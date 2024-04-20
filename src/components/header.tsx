import { RootState } from "@/state/store";
import { useSelector } from "react-redux";
import { Button } from "./ui/button";
import { metadata } from "@/shared/constants";
import { Link } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";

export const Header = () => {
  const auth = useSelector((state: RootState) => state.auth);

  return (
    <header className='flex w-full items-center justify-between gap-3'>
      <span>{metadata.appName}</span>
      <nav>
        {auth.token ? (
          <Button asChild variant={"link"} size={"lg"}>
            <Link to={"/users/create-post"}>Create Post</Link>
          </Button>
        ) : (
          <Link to={"/auth/sign-in"}>Signin</Link>
        )}
        <Avatar>{auth.profile_image ? <AvatarImage /> : <AvatarFallback />}</Avatar>
      </nav>
    </header>
  );
};
