import { RootState } from "@/state/store";
import { useSelector } from "react-redux";
import { Button } from "./ui/button";
import { metadata } from "@/shared/constants";
import { LockIcon, SearchIcon, User } from "lucide-react";
import { Link } from "react-router-dom";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { TooltipWrapper } from "./tooltip-wrapper";

export const Header = () => {
  const auth = useSelector((state: RootState) => state.auth);

  return (
    <header className='base-border fixed left-0 top-0 z-50 mb-8 flex h-[52px] w-full items-center justify-between gap-3 bg-background/45 px-3 py-1 font-sans text-sm backdrop-blur'>
      <span className='text-md font-semibold'>{metadata.appName} Community</span>
      <nav className=' flex items-center gap-2'>
        <TooltipWrapper content='Search and filters'>
          <Button className='rounded-full bg-transparent p-2' variant={"ghost"}>
            <SearchIcon />
            <span className='sr-only'>Search</span>
          </Button>
        </TooltipWrapper>
        {!auth.token ? (
          <Button asChild variant={"secondary"} className='base-border' size={"default"}>
            <div>
              <LockIcon className='mr-2 h-4 w-4' />
              <Link to={"/auth/sign-in"}>Signin</Link>
            </div>
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
            <TooltipWrapper content='Sign-in to access your account'>
              <AvatarFallback className='base-border'>
                <User className='h-auto w-5' />
                <span className='sr-only'>user icon</span>
              </AvatarFallback>
            </TooltipWrapper>
          )}
        </Avatar>
      </nav>
    </header>
  );
};
