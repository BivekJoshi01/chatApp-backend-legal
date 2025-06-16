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
import { axiosInstance } from "../../../utils/axiosInterceptor";

type Option = {
  label?: string;
  value?: any;
};

type AutocompleteSelectGetRequestFieldProps = {
  placeholder?: string;
  apiPath?: string;
  optionLabel?: string;
  optionValue?: any;
  value?: any;
  onChange?: (value: any) => void;
};

export function AutocompleteSelectGetRequestField({
  placeholder = "Select an option",
  apiPath,
  optionLabel = "label",
  optionValue,
  value = "",
  onChange = () => {},
}: AutocompleteSelectGetRequestFieldProps) {
  const [open, setOpen] = React.useState(false);
  const [fetchedOptions, setFetchedOptions] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(false);
  const hasFetched = React.useRef(false);

  React.useEffect(() => {
    if (apiPath && !hasFetched.current) {
      hasFetched.current = true;
      setLoading(true);
      axiosInstance
        .get(apiPath)
        .then((res) => {
          setFetchedOptions(res?.data || []);
        })
        .catch((err) => {
          console.error("Error fetching options:", err);
        })
        .finally(() => setLoading(false));
    }
  }, [apiPath]);

  const normalizedOptions: Option[] = React.useMemo(() => {
    const raw = apiPath ? fetchedOptions : [];
    return raw?.map((item: any) => ({
      label: item?.[optionLabel],
      value: item?.[optionValue],
    }));
  }, [apiPath, fetchedOptions, optionLabel, optionValue]);

  const handleSelect = (selectedValue: string) => {
    onChange(selectedValue === value ? "" : selectedValue);
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
              ? normalizedOptions?.find((option) => option.value === value)
                  ?.label
              : placeholder}
          </span>
          <MdOutlineKeyboardArrowDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder={placeholder} />
          <CommandList>
            {loading ? (
              <div className="flex justify-center items-center p-4 text-sm text-muted-foreground">
                Loading...
              </div>
            ) : normalizedOptions.length === 0 ? (
              <CommandEmpty>No option found.</CommandEmpty>
            ) : (
              <CommandGroup>
                {normalizedOptions.map((option) => (
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
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
