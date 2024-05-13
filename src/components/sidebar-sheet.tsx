import { metadata } from "@/shared/constants";
import { RiAccountCircleLine } from "@remixicon/react";
import { useWindowSize } from "@uidotdev/usehooks";
import * as Lucide from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "./ui/sheet";

export const sidebarPaths = [
  { label: "Home", path: "/", icon: Lucide.Home },
  { label: "About", path: "/about", icon: Lucide.BookMarked },
  { label: "Contact", path: "/contact", icon: Lucide.Contact },
  { label: "Terms of Use", path: "/terms-of-use", icon: Lucide.LucideHammer },
  { label: "Privacy  Policy", path: "/privacy-policy", icon: Lucide.FileKey },
  { label: "Code of Conduct", path: "/code-of-conduct", icon: Lucide.UserCheck },
  { label: "Sign In", path: "/auth/sign-in", icon: Lucide.LogInIcon },
  { label: "Sign Up", path: "/auth/sign-up", icon: RiAccountCircleLine }
];

export const SidebarSheet = () => {
  const { width: innerWindowWidth } = useWindowSize();
  if (typeof innerWindowWidth === "number" && innerWindowWidth > 640) return null;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={"ghost"} size={"icon"}>
          <Lucide.MenuIcon className='h-auto w-4' />
        </Button>
      </SheetTrigger>
      <SheetContent side={"left"} className='w-full max-w-[240px] overflow-y-auto px-4'>
        <SheetHeader>
          <SheetTitle>
            <Link
              className='cursor-pointer select-none rounded-lg bg-foreground p-1 px-2 text-lg font-semibold'
              to={"/"}
              replace={false}>
              <span>{metadata.appName}</span>
            </Link>
          </SheetTitle>
          <SheetDescription className='text-muted-foreground'>
            A inclusive the open source community for developers.
          </SheetDescription>
        </SheetHeader>
        <Separator decorative className='my-3' />
        <div className='flex w-fit flex-col gap-3'>
          {sidebarPaths.map((_path, i) => (
            <Button
              key={i}
              asChild
              className=' group w-full  justify-start'
              variant={"ghost"}
              size={"lg"}>
              <Link to={_path.path} className='items-start justify-start'>
                <_path.icon className='mr-2 h-auto w-4' />
                <span className='group-hover:underline group-hover:underline-offset-2'>
                  {_path.label}
                </span>
              </Link>
            </Button>
          ))}
        </div>
        <Separator decorative className='my-3' />
      </SheetContent>
    </Sheet>
  );
};
