"use client";

import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "./command";
import { Popover, PopoverTrigger, PopoverContent } from "./popover";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "./button";

export function Combobox({ initialSelectedValue, defaultLabel, searchPlaceholder, noItemPlaceholder, items, onSelect, isDisabled }: ComboboxProps) {
  const [open, setOpen] = useState(false);
  const initialSelectedItem = items.find((item) => item.value === initialSelectedValue);
  const [selectedItem, setSelectedItem] = useState(initialSelectedItem);
  const handleSelect = (item: { value: string; label: string | React.ReactNode }) => {
    setOpen(false);    
    setSelectedItem(item);
    onSelect(item.value);
  };

  useEffect(() => {
    setSelectedItem(initialSelectedItem);
  }, [initialSelectedItem]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild disabled={isDisabled}>
        <Button variant="outline" role="combobox" className={cn("w-full justify-between rounded-[0.5rem]", !selectedItem && "text-muted-foreground")}>
          {selectedItem?.label || defaultLabel || "Select an item"}
          <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
        <Command>
          <CommandInput placeholder={searchPlaceholder || "Search items..."} />
          <CommandList>
            <CommandEmpty>{noItemPlaceholder || "No item found."}</CommandEmpty>
            <CommandGroup>
              {items.map((item) => (
                <CommandItem key={item.value} onSelect={() => handleSelect(item)}>
                  <CheckIcon className={cn("mr-2 h-4 w-4", item.value === selectedItem?.value ? "opacity-100" : "opacity-0")} />
                  {item.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

interface ComboboxProps {
  onSelect: (value: string) => void;
  isDisabled?: boolean;
  defaultLabel?: string;
  searchPlaceholder?: string;
  noItemPlaceholder?: string;
  initialSelectedValue?: string | null | undefined;
  items: {
    value: string;
    label: string | React.ReactNode;
  }[];
}
