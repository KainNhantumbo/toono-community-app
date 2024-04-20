import { RootState } from "@/state/store";
import { useSelector } from "react-redux";
import { Button } from "./ui/button";
import { metadata } from "@/shared/constants";
import { User } from "lucide-react";
import { Link } from "react-router-dom";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";

export const Header = () => {
  const auth = useSelector((state: RootState) => state.auth);

  return (
    <header className='flex w-full bg-muted items-center justify-between gap-3 px-3 py-1'>
      <span className='text-xl font-medium'>{metadata.appName}</span>
      <nav className=' flex items-center gap-2'>
        {!auth.token ? (
          <Button asChild variant={"default"} size={"sm"}>
            <Link to={"/auth/sign-in"}>Signin</Link>
          </Button>
        ) : (
          <Button asChild variant={"secondary"} size={"lg"}>
            <Link to={"/users/create-post"}>Create Post</Link>
          </Button>
        )}
        <Avatar>
          {auth.profile_image ? (
            <AvatarImage src={auth.profile_image} alt={`${auth.name} profile image`} />
          ) : (
            <AvatarFallback>
              <User />
              <span className='sr-only'>user icon</span>
            </AvatarFallback>
          )}
        </Avatar>
      </nav>
    </header>
  );
};
