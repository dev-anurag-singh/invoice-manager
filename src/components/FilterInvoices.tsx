"use client";
import { ChevronDown } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import FilterOption from "./FilterOption";

const filterOptions = ["draft", "pending", "paid"];

function FilterInvoices() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const filterParams = searchParams.getAll("filter");

  function handleFilter(append: boolean, term: string) {
    const params = new URLSearchParams(searchParams);
    if (append) {
      params.append("filter", term);
    } else {
      params.delete("filter", term);
    }
    replace(`${pathname}?${params.toString()}`);
  }

  // CHECKING IF THE TERM IS INCLUDED IN FILTER PARAMETER

  function isChecked(term: string) {
    return filterParams.includes(term);
  }

  return (
    <Popover modal>
      <PopoverTrigger asChild>
        <button className="group flex items-center text-sm">
          <span className="md:hidden">Filter</span>
          <span className="hidden md:inline">Filter by status</span>
          <span className="ml-2 transition-transform group-aria-expanded:rotate-180">
            <ChevronDown className="h-4 w-4 stroke-primary" />
          </span>
        </button>
      </PopoverTrigger>
      <PopoverContent sideOffset={22} className="max-w-48 p-6">
        <div className="flex flex-col gap-4">
          {filterOptions.map((option) => (
            <FilterOption
              key={option}
              label={option}
              checked={isChecked(option)}
              handleFilter={handleFilter}
            />
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default FilterInvoices;
