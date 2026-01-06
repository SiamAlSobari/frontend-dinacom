"use client";

import { cn } from "@/common/libs/utils";
import { Button } from "@/common/shadcn-ui/button";
import { Calendar } from "@/common/shadcn-ui/calendar";
import { Card } from "@/common/shadcn-ui/card";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/common/shadcn-ui/command";
import { Input } from "@/common/shadcn-ui/input";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/common/shadcn-ui/popover";
import { format } from "date-fns";
import {
    ArrowLeft,
    Box,
    CalendarIcon,
    CheckIcon,
    ChevronsUpDownIcon,
} from "lucide-react";
import React from "react";

const frameworks = [
    { value: "next.js", label: "Next.js" },
    { value: "sveltekit", label: "SvelteKit" },
    { value: "nuxt.js", label: "Nuxt.js" },
    { value: "remix", label: "Remix" },
    { value: "astro", label: "Astro" },
];

const typess = [
    { value: "SALE", label: "Sale" },
    { value: "PURCHASE", label: "Purchase" },
    { value: "RETURN", label: "Return" },
];

type Row = {
    date?: Date;
    product: string;
    quantity: string;
    type: string;
};

export default function BulkTransactionPage() {
    const [rows, setRows] = React.useState<Row[]>([
        { date: undefined, product: "", quantity: "", type: "" },
    ]);

    const [openProductIndex, setOpenProductIndex] = React.useState<number | null>(null);
    const [openTypeIndex, setOpenTypeIndex] = React.useState<number | null>(null);

    const handleAddRow = () => {
        setRows((prev) => [
            ...prev,
            { date: undefined, product: "", quantity: "", type: "" },
        ]);
    };

    const updateRow = (index: number, data: Partial<Row>) => {
        setRows((prev) =>
            prev.map((row, i) => (i === index ? { ...row, ...data } : row))
        );
    };

    const handleSubmit = () => {
        console.log("BULK DATA:", rows);
        alert("Submit berhasil. Cek console 🔥");
    };

    const handleCancel = () => {
        if (!confirm("Yakin mau membatalkan dan menghapus semua input?")) return;

        setRows([{ date: undefined, product: "", quantity: "", type: "" }]);
    };


    return (
        <div className="p-10">
            <div className="flex items-center gap-4 mb-8">
                <button>
                    <ArrowLeft className="text-gray-600" size={24} />
                </button>

                <div className="flex flex-col">
                    <div className="text-black text-xl font-normal font-['Poppins'] leading-6">
                        Record Daily Activity
                    </div>
                    <div className="text-neutral-600 text-sm font-normal font-['Poppins'] leading-6">
                        Bulk input of sales and purchases
                    </div>
                </div>
            </div>

            {/* INFO BANNER */}
            <div className="w-full px-6 bg-blue-600/5 rounded-2xl outline-[0.50px] outline-blue-600 flex flex-col gap-2.5">
                <div className="h-20 pl-3.5 pr-5 py-4 flex items-center gap-4">
                    <Box className="w-8 h-8 text-blue-600" size={32} />
                    <p className="text-slate-700 text-base font-normal font-['Poppins']">
                        Add transaction manually or paste CSV-style data. Stock levels will
                        update immediately and trigger an AI background job to re-evaluate
                        recommendations.
                    </p>
                </div>
            </div>

            <Card className="mt-8 w-full">
                <div className="px-6">
                    <div className="text-black text-xl font-normal font-['Poppins'] leading-8">
                        Transaction Entry
                    </div>
                    <div className="text-neutral-600 text-sm font-normal font-['Poppins'] leading-8">
                        Add rows for each transaction
                    </div>
                </div>

                <div className="w-full grid grid-cols-4 outline outline-gray-200 items-center h-12 bg-gray-50 px-4">
                    <div className="font-medium">Date</div>
                    <div className="font-medium">Product</div>
                    <div className="font-medium">Quantity</div>
                    <div className="font-medium">Type</div>
                </div>

                <div className="space-y-4 py-4">
                    {rows.map((row, index) => (
                        <div key={index} className="w-full grid grid-cols-4 items-center gap-2 px-4">
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
                                    <Button
                                        variant="outline"
                                        role="combobox"
                                        className="w-full justify-between"
                                    >
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
                                                            updateRow(index, { product: value });
                                                            setOpenProductIndex(null);
                                                        }}
                                                    >
                                                        <CheckIcon
                                                            className={cn(
                                                                "mr-2 h-4 w-4",
                                                                row.product === framework.value
                                                                    ? "opacity-100"
                                                                    : "opacity-0"
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
                                    <Button
                                        variant="outline"
                                        role="combobox"
                                        className="w-full justify-between"
                                    >
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
                                                            updateRow(index, { type: value });
                                                            setOpenTypeIndex(null);
                                                        }}
                                                    >
                                                        <CheckIcon
                                                            className={cn(
                                                                "mr-2 h-4 w-4",
                                                                row.type === typ.value
                                                                    ? "opacity-100"
                                                                    : "opacity-0"
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
                    ))}
                </div>

                <div className="px-6 pb-6">
                    <button
                        onClick={handleAddRow}
                        className="mb-6 px-4 py-2  outline-2 outline-blue-600 text-blue-600 rounded-lg transition w-32"
                    >
                        + Add Row
                    </button>

                    <div className="flex items-center gap-4 w-full">
                        <button
                            onClick={handleSubmit}
                            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                        >
                            Submit
                        </button>

                        <button onClick={handleCancel} className="w-32 py-2  outline-2 outline-blue-600 text-blue-600 rounded-lg transition">
                            Cancel
                        </button>
                    </div>
                </div>
            </Card>
            <pre className="mt-6 bg-gray-900 text-green-400 text-xs p-4 rounded-lg overflow-auto max-h-80">
                {JSON.stringify(rows, null, 2)}
            </pre>
        </div>
    );
}
