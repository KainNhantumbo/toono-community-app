import { AppDispatch, RootState } from "@/state/store";
import { useDispatch, useSelector } from "react-redux";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import httpClient from "@/config/http-client";
import { errorTransformer } from "@/lib/error";
import { metadata } from "@/shared/constants";
import { initialAuthState, mutateAuth } from "@/state/slices/auth";
import { DashboardIcon } from "@radix-ui/react-icons";
import {
  AtSignIcon,
  LockIcon,
  LogOutIcon,
  PenBoxIcon,
  SearchIcon,
  User
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { TooltipWrapper } from "./tooltip-wrapper";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";

export const Header = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const onSignOut = async () => {
    try {
      await httpClient({
        method: "post",
        url: "/api/v1/auth/sign-out",
        withCredentials: true
      });
      dispatch(mutateAuth({ ...initialAuthState }));
      navigate("/");
    } catch (error) {
      const { message } = errorTransformer(error);
      console.error(error);
      console.warn(message);
      toast.error(message, { action: { label: "Retry", onClick: onSignOut } });
    }
  };

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
            <Link to={"/auth/sign-in"}>
              <LockIcon className='mr-2 h-4 w-4' />
              <span>Sign In</span>
            </Link>
          </Button>
        ) : (
          <Button asChild variant={"ghost"} size={"icon"}>
            <Link to={"/users/dashboard/create-post"}>
              <TooltipWrapper content='Create new post'>
                <PenBoxIcon />
              </TooltipWrapper>
              <span className='sr-only'>Create new post</span>
            </Link>
          </Button>
        )}

        {auth.token && (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar>
                  {auth.profile_image ? (
                    <AvatarImage
                      src={auth.profile_image}
                      alt={`${auth.name} profile image`}
                    />
                  ) : (
                    <TooltipWrapper content='Access your account'>
                      <AvatarFallback className='base-border'>
                        <User className='h-auto w-5' />
                        <span className='sr-only'>user icon</span>
                      </AvatarFallback>
                    </TooltipWrapper>
                  )}
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel className='flex items-center'>
                  <User className='mr-2 h-auto w-4' />
                  <span>{auth.name}</span>
                </DropdownMenuLabel>
                <DropdownMenuLabel className='flex items-center'>
                  <AtSignIcon className='mr-2 h-auto w-4' />
                  <span>{auth.email}</span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/users/dashboard/overview")}>
                  <DashboardIcon className='mr-2 h-auto w-4 ' />
                  <span>Dashboard</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onSignOut}>
                  <LogOutIcon className='mr-2 h-auto w-4 ' />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        )}
      </nav>
    </header>
  );
};
