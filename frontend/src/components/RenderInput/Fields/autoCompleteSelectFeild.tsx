import * as React from "react";
import { cn } from "../../../lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../../ui/command";
import { FaCheck } from "react-icons/fa6";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

type Option = {
  label?: string;
  value?: string;
};

type AutocompleteSelectFieldProps = {
  options?: Option[];
  placeholder?: string;
  value?: string; // controlled value from form
  onChange?: (value: string) => void; // form's onChange handler
};

export function AutocompleteSelectField({
  options,
  placeholder,
  value = "",
  onChange = () => {},
}: AutocompleteSelectFieldProps) {
  const [open, setOpen] = React.useState(false);

  const handleSelect = (selectedValue: string) => {
    onChange(selectedValue === value ? "" : selectedValue); // toggle selection
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "flex h-9 w-full min-w-0 items-center justify-between rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none",
            "text-left file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground",
            "border-input focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[1px]",
            "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
            !value ? "text-muted-foreground" : "text-foreground"
          )}
        >
          <span className="block max-w-[150px] truncate">
            {value
              ? options?.find((option) => option.value === value)?.label
              : placeholder}
          </span>
          <MdOutlineKeyboardArrowDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder={placeholder} />
          <CommandList>
            <CommandEmpty>No option found.</CommandEmpty>
            <CommandGroup>
              {options?.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={() => handleSelect(option.value!)}
                >
                  <FaCheck
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === option.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
