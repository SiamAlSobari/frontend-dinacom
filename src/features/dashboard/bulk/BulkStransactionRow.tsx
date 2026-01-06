"use client"

import { cn } from "@/common/libs/utils"
import { Button } from "@/common/shadcn-ui/button"
import { Calendar } from "@/common/shadcn-ui/calendar"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/common/shadcn-ui/command"
import { Input } from "@/common/shadcn-ui/input"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/common/shadcn-ui/popover"
import { BulkRow } from "@/common/types/bulk"
import { format } from "date-fns"
import {
    CalendarIcon,
    CheckIcon,
    ChevronsUpDownIcon,
} from "lucide-react"

const frameworks = [
    { value: "next.js", label: "Next.js" },
    { value: "sveltekit", label: "SvelteKit" },
    { value: "nuxt.js", label: "Nuxt.js" },
    { value: "remix", label: "Remix" },
    { value: "astro", label: "Astro" },
]

const typess = [
    { value: "SALE", label: "Sale" },
    { value: "PURCHASE", label: "Purchase" },
    { value: "RETURN", label: "Return" },
]

type Props = {
    row: BulkRow
    index: number
    updateRow: (index: number, data: Partial<BulkRow>) => void
    openProductIndex: number | null
    setOpenProductIndex: (v: number | null) => void
    openTypeIndex: number | null
    setOpenTypeIndex: (v: number | null) => void
}

export function BulkTransactionRow({
    row,
    index,
    updateRow,
    openProductIndex,
    setOpenProductIndex,
    openTypeIndex,
    setOpenTypeIndex,
}: Props) {
    return (
        <div className="w-full grid grid-cols-4 items-center gap-2 px-4">
            {/* Date */}
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        data-empty={!row.date}
                        className="data-[empty=true]:text-muted-foreground justify-start text-left font-normal"
                    >
                        <CalendarIcon />
                        {row.date ? format(row.date, "PPP") : <span>Pick a date</span>}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                    <Calendar
                        mode="single"
                        selected={row.date}
                        onSelect={(d) => updateRow(index, { date: d })}
                    />
                </PopoverContent>
            </Popover>

            {/* Product */}
            <Popover
                open={openProductIndex === index}
                onOpenChange={(open) =>
                    setOpenProductIndex(open ? index : null)
                }
            >
                <PopoverTrigger asChild>
                    <Button variant="outline" role="combobox" className="w-full justify-between">
                        {row.product
                            ? frameworks.find((f) => f.value === row.product)?.label
                            : "Select framework..."}
                        <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-50 p-0">
                    <Command>
                        <CommandInput placeholder="Search framework..." />
                        <CommandList>
                            <CommandEmpty>No framework found.</CommandEmpty>
                            <CommandGroup>
                                {frameworks.map((framework) => (
                                    <CommandItem
                                        key={framework.value}
                                        value={framework.value}
                                        onSelect={(value) => {
                                            updateRow(index, { product: value })
                                            setOpenProductIndex(null)
                                        }}
                                    >
                                        <CheckIcon
                                            className={cn(
                                                "mr-2 h-4 w-4",
                                                row.product === framework.value ? "opacity-100" : "opacity-0"
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

            {/* Quantity */}
            <Input
                placeholder="Quantity"
                value={row.quantity}
                onChange={(e) =>
                    updateRow(index, { quantity: e.target.value })
                }
            />

            {/* Type */}
            <Popover
                open={openTypeIndex === index}
                onOpenChange={(open) =>
                    setOpenTypeIndex(open ? index : null)
                }
            >
                <PopoverTrigger asChild>
                    <Button variant="outline" role="combobox" className="w-full justify-between">
                        {row.type
                            ? typess.find((t) => t.value === row.type)?.label
                            : "Select type..."}
                        <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-50 p-0">
                    <Command>
                        <CommandInput placeholder="Search type..." />
                        <CommandList>
                            <CommandEmpty>No type found.</CommandEmpty>
                            <CommandGroup>
                                {typess.map((typ) => (
                                    <CommandItem
                                        key={typ.value}
                                        value={typ.value}
                                        onSelect={(value) => {
                                            updateRow(index, { type: value })
                                            setOpenTypeIndex(null)
                                        }}
                                    >
                                        <CheckIcon
                                            className={cn(
                                                "mr-2 h-4 w-4",
                                                row.type === typ.value ? "opacity-100" : "opacity-0"
                                            )}
                                        />
                                        {typ.label}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    )
}
