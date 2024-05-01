import { mutateFilters } from "@/state/slices/filters";
import { AppDispatch, RootState } from "@/state/store";
import { SubmitEvent } from "@/types";
import { SearchIcon } from "lucide-react";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { TooltipWrapper } from "./tooltip-wrapper";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import * as SheetRoot from "./ui/sheet";

export const PostsSearchSheet = () => {
  const filters = useSelector((state: RootState) => state.filters);
  const dispatch = useDispatch<AppDispatch>();
  const [value, setValue] = React.useState<string>(filters.search);
  const location = useLocation();
  const navigate = useNavigate();

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();
    dispatch(mutateFilters({ ...filters, search: value }));
    if (location.pathname !== "/") {
      setValue("");
      navigate("/");
    }
  };

  return (
    <SheetRoot.Sheet>
      <SheetRoot.SheetTrigger asChild>
        <Button size={"icon"} variant={"ghost"}>
          <TooltipWrapper content='Search posts'>
            <SearchIcon />
          </TooltipWrapper>
          <span className='sr-only'>Search</span>
        </Button>
      </SheetRoot.SheetTrigger>

      <SheetRoot.SheetContent>
        <SheetRoot.SheetHeader>
          <SheetRoot.SheetTitle>Search Posts</SheetRoot.SheetTitle>
          <SheetRoot.SheetDescription>
            Search and query post across all platform.
          </SheetRoot.SheetDescription>
        </SheetRoot.SheetHeader>

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
      </SheetRoot.SheetContent>
    </SheetRoot.Sheet>
  );
};
