"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type Option = {
  id: number;
  name: string;
};

interface MultiSelectChipProps {
  options: Option[];
  label: string;
  defaultSelected?: number[];
  onChange?: (selectedIds: number[]) => void;
}

export const MultiSelectChip: React.FC<MultiSelectChipProps> = ({
  options,
  label,
  defaultSelected = [],
  onChange,
}) => {
  const [open, setOpen] = React.useState(false);
  const [selectedIds, setSelectedIds] = React.useState<number[]>(defaultSelected);

  // toggle option
  const toggleOption = (id: number) => {
    setSelectedIds((prev) => {
      const updated = prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id];
      onChange?.(updated);
      return updated;
    });
  };

  // selected options
  const selectedOptions = options.filter((option) =>
    selectedIds.includes(option.id)
  );

  return (
    <div className="w-[300px]">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {selectedOptions.length > 0 ? (
              <div className="flex flex-wrap gap-1 max-w-[240px]">
                {selectedOptions.map((option) => (
                  <Badge
                    key={option.id}
                    className="bg-blue-500 text-white"
                    variant="secondary"
                  >
                    {option.name}
                  </Badge>
                ))}
              </div>
            ) : (
              <span className="text-muted-foreground">{label}</span>
            )}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-[300px] p-0">
          <Command>
            <CommandList>
              <CommandGroup>
                {options.map((option) => (
                  <CommandItem
                    key={option.id}
                    onSelect={() => toggleOption(option.id)}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedIds.includes(option.id)
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    {option.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};
