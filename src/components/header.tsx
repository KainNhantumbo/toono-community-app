import { RootState } from "@/state/store";
import { useSelector } from "react-redux";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { metadata } from "@/shared/constants";
import { LockIcon, PenBoxIcon, SearchIcon, User } from "lucide-react";
import { Link } from "react-router-dom";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { TooltipWrapper } from "./tooltip-wrapper";

export const Header = () => {
  const auth = useSelector((state: RootState) => state.auth);

  return (
    <header className='base-border fixed left-0 top-0 z-50 mb-8 flex h-[52px] w-full items-center justify-between gap-3 bg-background/45 px-3 py-1 font-sans text-sm backdrop-blur'>
      <span className='base-border select-none rounded-lg bg-foreground p-1 px-2 text-lg font-semibold'>
        {metadata.appName}
      </span>
      <nav className=' flex items-center gap-2'>
        <TooltipWrapper content='Search and filters'>
          <Button size={"icon"} variant={"ghost"}>
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
          <Button asChild variant={"ghost"} size={"icon"}>
            <Link to={"/users/dashboard/create-post"}>
              <TooltipWrapper content='Create new post'>
                <PenBoxIcon />
              </TooltipWrapper>
              <span className='sr-only'> Create new post</span>
            </Link>
          </Button>
        )}

        {auth.token && (
          <Avatar>
            {auth.profile_image ? (
              <AvatarImage src={auth.profile_image} alt={`${auth.name} profile image`} />
            ) : (
              <TooltipWrapper content='Access your account'>
                <AvatarFallback className='base-border'>
                  <User className='h-auto w-5' />
                  <span className='sr-only'>user icon</span>
                </AvatarFallback>
              </TooltipWrapper>
            )}
          </Avatar>
        )}
      </nav>
    </header>
  );
};
