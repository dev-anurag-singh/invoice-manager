"use client";

import { useId } from "react";
import { Checkbox } from "./ui/checkbox";

interface FilterOptionProps {
  label: string;
  checked: boolean;
  handleFilter: (append: boolean, term: string) => void;
}

function FilterOption({ label, checked, handleFilter }: FilterOptionProps) {
  const id = useId();

  return (
    <div className="flex items-center space-x-3">
      <Checkbox
        defaultChecked={checked}
        onCheckedChange={(state) => {
          if (state === true) handleFilter(true, label);
          if (state === false) handleFilter(false, label);
        }}
        id={id}
      />
      <label
        htmlFor={id}
        className="cursor-pointer text-sm capitalize peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {label}
      </label>
    </div>
  );
}

export default FilterOption;
