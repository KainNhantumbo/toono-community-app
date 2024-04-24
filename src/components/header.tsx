import * as Dropdown from "@/components/ui/dropdown-menu";
import { metadata } from "@/shared/constants";
import { RootState } from "@/state/store";
import { DashboardIcon } from "@radix-ui/react-icons";
import * as Lucide from "lucide-react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { TooltipWrapper } from "./tooltip-wrapper";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { UserLogoutAlert } from "./user-logout-alert";
import { PostsSearchSheet } from "./posts-search-sheet";

export const Header = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  return (
    <header className='base-border fixed left-0 top-0 z-50 mb-8 flex h-[52px] w-full items-center justify-between gap-3 bg-background/45 px-3 py-1 font-sans text-sm backdrop-blur'>
      <span className='base-border select-none rounded-lg bg-foreground p-1 px-2 text-lg font-semibold'>
        {metadata.appName}
      </span>
      <nav className=' flex items-center gap-2'>
        <PostsSearchSheet />

        {!auth.token ? (
          <Button asChild variant={"secondary"} className='base-border' size={"default"}>
            <Link to={"/auth/sign-in"}>
              <Lucide.LockIcon className='mr-2 h-4 w-4' />
              <span>Sign In</span>
            </Link>
          </Button>
        ) : (
          <TooltipWrapper content='Create new post'>
            <Button asChild variant={"ghost"} size={"icon"}>
              <Link to={"/users/dashboard/posts/post-editor/create"}>
                <Lucide.PenBoxIcon />
                <span className='sr-only'>Create new post</span>
              </Link>
            </Button>
          </TooltipWrapper>
        )}

        {auth.token && (
          <>
            <Dropdown.DropdownMenu>
              <Dropdown.DropdownMenuTrigger asChild>
                <Avatar>
                  {auth.profile_image ? (
                    <AvatarImage
                      src={auth.profile_image}
                      alt={`${auth.name} profile image`}
                    />
                  ) : (
                    <AvatarFallback className='base-border'>
                      <Lucide.User className='h-auto w-5' />
                      <span className='sr-only'>user icon</span>
                    </AvatarFallback>
                  )}
                </Avatar>
              </Dropdown.DropdownMenuTrigger>
              <Dropdown.DropdownMenuContent>
                <Dropdown.DropdownMenuLabel className='flex items-center'>
                  <Lucide.User className='mr-2 h-auto w-4' />
                  <span>{auth.name}</span>
                </Dropdown.DropdownMenuLabel>
                <Dropdown.DropdownMenuLabel className='flex items-center'>
                  <Lucide.AtSignIcon className='mr-2 h-auto w-4' />
                  <span>{auth.email}</span>
                </Dropdown.DropdownMenuLabel>
                <Dropdown.DropdownMenuSeparator />
                <Dropdown.DropdownMenuItem
                  onClick={() => navigate("/users/dashboard/overview")}>
                  <DashboardIcon className='mr-2 h-auto w-4 ' />
                  <span>Dashboard</span>
                </Dropdown.DropdownMenuItem>
                <Dropdown.DropdownMenuItem asChild>
                  <UserLogoutAlert />
                </Dropdown.DropdownMenuItem>
              </Dropdown.DropdownMenuContent>
            </Dropdown.DropdownMenu>
          </>
        )}
      </nav>
    </header>
  );
};
