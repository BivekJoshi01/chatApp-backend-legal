import * as React from "react"
import { Button } from "./button"
import { cn } from "../../lib/utils"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "./popover"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "./command"
import { FaCheck } from "react-icons/fa6";
import { MdOutlineKeyboardArrowDown } from "react-icons/md"
import { Label } from "./label"


type Option = {
    label?: string
    value?: string
}

type AutocompleteSelectFieldProps = {
    options?: Option[],
    placeholder?: string,
}


export function AutocompleteSelectFeild({
    // options,
    placeholder
}: AutocompleteSelectFieldProps) {
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState("")

    const options = [
        {
            value: "next.js",
            label: "Next.js",
        },
        {
            value: "sveltekit",
            label: "SvelteKit",
        },
        {
            value: "nuxt.js",
            label: "Nuxt.js",
        },
        {
            value: "remix",
            label: "Remix",
        },
        {
            value: "astro",
            label: "Astro",
        },
    ]

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="justify-between"
                >
                    {value
                        ? options?.find((framework) => framework.value === value)?.label
                        : placeholder}
                    <MdOutlineKeyboardArrowDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder={placeholder} />
                    <CommandList>
                        <CommandEmpty>No option found.</CommandEmpty>
                        <CommandGroup>
                            {options?.map((framework) => (
                                <CommandItem
                                    key={framework.value}
                                    value={framework.value}
                                    onSelect={(currentValue) => {
                                        setValue(currentValue === value ? "" : currentValue)
                                        setOpen(false)
                                    }}
                                >
                                    <FaCheck
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            value === framework.value ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                    {framework.label}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}