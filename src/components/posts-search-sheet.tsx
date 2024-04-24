import { mutateFilters } from "@/state/slices/filters";
import { AppDispatch, RootState } from "@/state/store";
import { SearchIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "./ui/sheet";
import { TooltipWrapper } from "./tooltip-wrapper";

export const PostsSearchSheet = () => {
  const filters = useSelector((state: RootState) => state.filters);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size={"icon"} variant={"ghost"}>
          <TooltipWrapper content='Search posts'>
            <SearchIcon />
          </TooltipWrapper>
          <span className='sr-only'>Search</span>
        </Button>
      </SheetTrigger>

      <SheetContent>
        <SheetHeader>
          <SheetTitle>Search Posts</SheetTitle>
          <SheetDescription>Search and query post across all platform.</SheetDescription>
        </SheetHeader>

        <form className='space-y-3 py-3' onSubmit={(e) => e.preventDefault()}>
          <Input
            type='text'
            placeholder='Search...'
            value={filters.search}
            onChange={(e) => {
              dispatch(mutateFilters({ ...filters, search: e.target.value }));
            }}
          />
        </form>
      </SheetContent>
    </Sheet>
  );
};
