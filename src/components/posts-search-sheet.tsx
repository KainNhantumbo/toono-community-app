import { mutateFilters } from "@/state/slices/filters";
import { AppDispatch, RootState } from "@/state/store";
import { SubmitEvent } from "@/types";
import { SearchIcon } from "lucide-react";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { TooltipWrapper } from "./tooltip-wrapper";
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

export const PostsSearchSheet = () => {
  const filters = useSelector((state: RootState) => state.filters);
  const dispatch = useDispatch<AppDispatch>();
  const [value, setValue] = React.useState<string>(filters.search);

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();
    dispatch(mutateFilters({ ...filters, search: value }));
  };

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

        <form className='space-y-3 py-3' onSubmit={handleSubmit}>
          <Input
            type='text'
            placeholder='Search'
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <div className='space-x-2'>
            <Button type='submit'>
              <span>Submit</span>
            </Button>
            <Button variant={"ghost"} onClick={() => setValue("")} type='reset'>
              <span>Clear form</span>
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
};
