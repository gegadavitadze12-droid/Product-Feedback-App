"use client";

import React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  // SelectLabel,
  SelectTrigger,
  SelectValue,
  SelectSeparator,
} from "@/components/ui/select";

interface DropdownProps {
  items: Array<string>;
  placeholder?: string;
  defaultValue?: string;
}

export function Dropdown(props: DropdownProps) {
  const { items, placeholder, defaultValue } = props;
  return (
    <Select defaultValue={defaultValue}>
      <SelectTrigger className="w-[180px] text-dark-1 rounded-[0.3125rem] ">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {/* <SelectLabel>Fruits</SelectLabel> */}
          {items.map((item: string, index: number, arr) => {
            return (
              <React.Fragment key={item}>
                <SelectItem value={item}>{item}</SelectItem>
                {arr.length > index + 1 && <SelectSeparator />}
              </React.Fragment>
            );
          })}
          {/* <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="blueberry">Blueberry</SelectItem>
          <SelectItem value="grapes">Grapes</SelectItem>
          <SelectItem value="pineapple">Pineapple</SelectItem> */}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
