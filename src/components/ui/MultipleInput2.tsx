"use client";

import * as React from "react";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface FourFieldInput {
  PujaTypeMasterID: number | string;
  PersonalPrice: number | string;
  CommercialPrice: number | string;
  DurationHours: number | string;
}

interface MultipleInput2Props {
  value: FourFieldInput[];
  onChange: (newValue: FourFieldInput[]) => void;
  services: { value: string; label: string }[];
  label1?: string;
  label2?: string;
  label3?: string;
  label4?: string;
}

const MultipleInput2: React.FC<MultipleInput2Props> = ({
  value,
  onChange,
  services,
  label1 = "Service",
  label2 = "Field 2",
  label3 = "Field 3",
  label4 = "Field 4 (Number)",
}) => {
  const [open, setOpen] = React.useState(false);
  const [selectedService, setSelectedService] = React.useState("");
  const [input2, setInput2] = React.useState("");
  const [input3, setInput3] = React.useState("");
  const [input4, setInput4] = React.useState<number | "">("");

  const handleAdd = () => {
    if (!selectedService || !input2.trim() || !input3.trim() || input4 === "") return;

    const selectedLabel =
      services.find((s) => s.value === selectedService)?.value || selectedService;

    onChange([
      ...value,
      {
        PujaTypeMasterID: selectedLabel,
        PersonalPrice: input2.trim(),
        CommercialPrice: input3.trim(),
        DurationHours: Number(input4),
      },
    ]);

    // reset inputs
    setSelectedService("");
    setInput2("");
    setInput3("");
    setInput4("");
  };

  const handleRemove = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  console.log("services:", services);
  return (
    <div className="flex flex-col gap-4">
      {/* Fields */}
      {/* Fields */}
      <div className="grid grid-cols-12 gap-4">
        {/* Combobox */}
        <div className="flex flex-col col-span-5">
          <label className="text-sm font-medium mb-1">{label1}</label>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-full justify-between"
              >
                {selectedService
                  ? services.find((s) => s.value === selectedService)?.label
                  : `Select ${label1}...`}
                <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput placeholder={`Search ${label1}...`} />
                <CommandList>
                  <CommandEmpty>No {label1} found.</CommandEmpty>
                  <CommandGroup>
                    {services.map((service) => (
                      <CommandItem
                        key={service.value}
                        value={service.label}
                        onSelect={() => {
                          setSelectedService(service.value);
                          setOpen(false);
                        }}
                      >
                        <CheckIcon
                          className={cn(
                            "mr-2 h-4 w-4",
                            selectedService === service.value
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        {service.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        {/* Second input */}
        <div className="flex flex-col col-span-2">
          <label className="text-sm font-medium mb-1">{label2}</label>
          <input
            className="border border-gray-300 rounded-md p-2"
            type="text"
            placeholder={label2}
            value={input2}
            onChange={(e) => setInput2(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAdd();
              }
            }}
          />
        </div>

        {/* Third input */}
        <div className="flex flex-col col-span-2">
          <label className="text-sm font-medium mb-1">{label3}</label>
          <input
            className="border border-gray-300 rounded-md p-2"
            type="text"
            placeholder={label3}
            value={input3}
            onChange={(e) => setInput3(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAdd();
              }
            }}
          />
        </div>

        {/* Fourth input */}
        <div className="flex flex-col col-span-2">
          <label className="text-sm font-medium mb-1">{label4}</label>
          <input
            className="border border-gray-300 rounded-md p-2"
            type="number"
            placeholder={label4}
            value={input4}
            onChange={(e) =>
              setInput4(e.target.value === "" ? "" : Number(e.target.value))
            }
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAdd();
              }
            }}
          />
        </div>

        {/* Add Button */}
        <div className="flex flex-col justify-end col-span-1">
          <button
            type="button"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            onClick={handleAdd}
          >
            +
          </button>
        </div>
      </div>


      {/* Chips */}
      <div className="flex flex-wrap gap-2">
        {value.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-2 bg-gray-200 px-3 py-1 rounded-full text-sm"
          >
            <span className="font-medium">{services.find(p => p.value === item.PujaTypeMasterID)?.label}</span> -{" "}
            {item.PersonalPrice}/{item.CommercialPrice} ({item.DurationHours}H)
            <button
              type="button"
              className="text-red-500 hover:text-red-700"
              onClick={() => handleRemove(index)}
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MultipleInput2;
