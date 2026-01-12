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
import ProductService from "@/services/ProductService"
import { useQuery } from "@tanstack/react-query"
import { format } from "date-fns"
import {
    CalendarIcon,
    CheckIcon,
    ChevronsUpDownIcon,
} from "lucide-react"

// const products = [
//     {
//         id: "prod_1",
//         name: "Product A",
//         price: 10.0,

//     },
//     {
//         id: "prod_2",
//         name: "Product B",
//         price: 20.0,

//     },
// ]

const methods = [
    { value: "CASH", label: "Cash" },
    { value: "QRIS", label: "QRIS" },
    { value: "DEBIT", label: "Debit" },
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
    openMethodIndex: number | null
    setOpenMethodIndex: (v: number | null) => void
}

export function BulkTransactionRow({
    row,
    index,
    updateRow,
    openProductIndex,
    setOpenProductIndex,
    openTypeIndex,
    setOpenTypeIndex,
    openMethodIndex,
    setOpenMethodIndex
}: Props) {
    const { data: products } = useQuery({
        queryKey: ["products-commands"],
        queryFn: () => ProductService.getProduct(),
    })



    return (
        <div className="w-full">

            <div className="grid grid-cols-1 md:grid-cols-6 gap-4 px-4">
                {/* Date */}
                <div className="space-y-1.5">
                    <label className="text-sm font-medium md:hidden">Date</label>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                data-empty={!row.date}
                                className="w-full justify-start text-left font-normal data-[empty=true]:text-muted-foreground"
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
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
                </div>

                {/* Product */}
                <div className="space-y-1.5">
                    <label className="text-sm font-medium md:hidden">Product</label>
                    <Popover
                        open={openProductIndex === index}
                        onOpenChange={(open) => setOpenProductIndex(open ? index : null)}
                    >
                        <PopoverTrigger asChild>
                            <Button variant="outline" role="combobox" className="w-full justify-between">
                                {row.product
                                    ? products?.find((f) => f.name === row.product.name)?.name
                                    : "Select product..."}
                                <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0">
                            <Command>
                                <CommandInput placeholder="Search product..." />
                                <CommandList>
                                    <CommandEmpty>No product found.</CommandEmpty>
                                    <CommandGroup>
                                        {products?.map((product) => (
                                            <CommandItem
                                                key={product.id}
                                                value={product.name}
                                                onSelect={(value) => {
                                                    updateRow(index, { product: { id: product.id, name: product.name, price: product.price } })
                                                    setOpenProductIndex(null)
                                                }}
                                            >
                                                <CheckIcon
                                                    className={cn(
                                                        "mr-2 h-4 w-4",
                                                        row.product?.id === product.id ? "opacity-100" : "opacity-0"
                                                    )}
                                                />
                                                {product.name}
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
                </div>

                {/* Quantity */}
                <div className="space-y-1.5">
                    <label className="text-sm font-medium md:hidden">Quantity</label>
                    <Input
                        placeholder="Quantity"
                        value={row.quantity}
                        onChange={(e) => updateRow(index, { quantity: e.target.value })}
                    />
                </div>

                {/* price */}
                <div className="space-y-1.5">
                    <label className="text-sm font-medium md:hidden">Price</label>
                    <Input
                        placeholder="Price"
                        value={row.product?.price}
                        disabled
                    />
                </div>

                {/* Total Price */}
                <div className="space-y-1.5">
                    <label className="text-sm font-medium md:hidden">Total Price</label>
                    <Input
                        placeholder="Total Price"
                        value={row.product?.price * Number(row.quantity) || 0}
                        disabled
                    />
                </div>

                {/* Method */}
                <div className="space-y-1.5">
                    <label className="text-sm font-medium md:hidden">Method</label>
                    <Popover
                        open={openMethodIndex === index}
                        onOpenChange={(open) => setOpenMethodIndex(open ? index : null)}
                    >
                        <PopoverTrigger asChild>
                            <Button variant="outline" role="combobox" className="w-full justify-between">
                                {row.method
                                    ? methods.find((m) => m.value === row.method)?.label
                                    : "Select method..."}
                                <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0">
                            <Command>
                                <CommandInput placeholder="Search method..." />
                                <CommandList>
                                    <CommandEmpty>No method found.</CommandEmpty>
                                    <CommandGroup>
                                        {methods.map((method) => (
                                            <CommandItem
                                                key={method.value}
                                                value={method.value}
                                                onSelect={(value) => {
                                                    updateRow(index, { method: value })
                                                    setOpenMethodIndex(null)
                                                }}
                                            >
                                                <CheckIcon
                                                    className={cn(
                                                        "mr-2 h-4 w-4",
                                                        row.method === method.value ? "opacity-100" : "opacity-0"
                                                    )}
                                                />
                                                {method.label}
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
                </div>

            </div>
            <hr className="mt-5" />
        </div>
    )
} 