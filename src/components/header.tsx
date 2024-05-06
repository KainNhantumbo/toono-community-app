import { SidebarSheet } from "./sidebar-sheet";
import * as Dropdown from "@/components/ui/dropdown-menu";
import { metadata } from "@/shared/constants";
import { RootState } from "@/state/store";
import { DashboardIcon } from "@radix-ui/react-icons";
import * as Lucide from "lucide-react";
import * as React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { PostsSearchSheet } from "./posts-search-sheet";
import { TooltipWrapper } from "./tooltip-wrapper";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { UserLogoutAlert } from "./user-logout-alert";
import { useWindowSize } from "@uidotdev/usehooks";

export const Header = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const { width: innerWindowWidth } = useWindowSize();
  const [isLogoutAlertOpen, setIsLogoutAlertOpen] = React.useState<boolean>(false);
  const navigate = useNavigate();

  return (
    <header className='fixed  left-0 top-0 z-50 mb-8 flex h-[52px] w-full border-b bg-background/45 px-3 py-1 font-sans text-sm backdrop-blur'>
      <UserLogoutAlert isOpen={isLogoutAlertOpen} setOpen={setIsLogoutAlertOpen} />
      <nav className='mx-auto flex w-full max-w-4xl items-center justify-between gap-2'>
        <div>
          {Number(innerWindowWidth) < 400 ? <SidebarSheet /> : null}
          <Link
            className='cursor-pointer select-none rounded-lg bg-foreground p-1 px-2 text-lg font-semibold'
            to={"/"}
            replace={false}>
            <span>{metadata.appName}</span>
          </Link>
        </div>
        <div className='flex items-center gap-2'>
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
                  <Avatar className='max-h-8 w-full max-w-8'>
                    {auth.profile_image ? (
                      <AvatarImage
                        src={auth.profile_image}
                        alt={`${auth.name} profile image`}
                      />
                    ) : (
                      <AvatarFallback className='base-none cursor-pointer rounded-lg bg-transparent hover:bg-muted'>
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
                    className='cursor-pointer'
                    onClick={() => navigate("/users/dashboard/overview")}>
                    <DashboardIcon className='mr-2 h-auto w-4 ' />
                    <span>Dashboard</span>
                  </Dropdown.DropdownMenuItem>
                  <Dropdown.DropdownMenuItem
                    className='cursor-pointer'
                    onClick={() => navigate(`/community/users/${auth.id}`)}>
                    <Lucide.UserCircle className='mr-2 h-auto w-4 ' />
                    <span>My Profile</span>
                  </Dropdown.DropdownMenuItem>
                  <Dropdown.DropdownMenuItem
                    className='cursor-pointer'
                    onClick={() => setIsLogoutAlertOpen(true)}>
                    <Lucide.LogOutIcon className='mr-2 h-auto w-4' />
                    <span>Log out</span>
                  </Dropdown.DropdownMenuItem>
                </Dropdown.DropdownMenuContent>
              </Dropdown.DropdownMenu>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};
