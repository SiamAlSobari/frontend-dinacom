"use client"

import { cn } from "@/common/libs/utils"
import { Button } from "@/common/shadcn-ui/button"
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
import { ProductFormData } from "./CardCreateProduct"
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react"
import React from "react"

const unitOptions = [
  { value: "PCS", label: "PCS" },
  { value: "KG", label: "KG" },
  { value: "LITER", label: "LITER" },
  { value: "BOX", label: "BOX" },
  { value: "PACK", label: "PACK" },
]

type Props = {
  row: ProductFormData
  index: number
  updateRow: (index: number, data: Partial<ProductFormData>) => void
}

export function CreateProductRow({
  row,
  index,
  updateRow,
}: Props) {
  const [openUnitIndex, setOpenUnitIndex] = React.useState<number | null>(null)

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 px-4">

        {/* IMAGE */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium md:hidden">Image</label>
          <Input
            type="file"
            accept="image/jpeg,image/png,image/jpg"
            onChange={(e) =>
              updateRow(index, { image: e.target.files?.[0] || null })
            }
          />
          <p className="text-xs text-gray-500">JPEG / PNG / JPG</p>
        </div>

        {/* NAME */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium md:hidden">Name</label>
          <Input
            placeholder="Product name"
            value={row.name}
            onChange={(e) => updateRow(index, { name: e.target.value })}
            className={cn(
              row.name.length > 0 && row.name.length < 3 && "border-red-500"
            )}
          />
          {row.name.length > 0 && row.name.length < 3 && (
            <p className="text-xs text-red-500">Minimal 3 karakter</p>
          )}
        </div>

        {/* UNIT */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium md:hidden">Unit</label>
          <Popover
            open={openUnitIndex === index}
            onOpenChange={(open) => setOpenUnitIndex(open ? index : null)}
          >
            <PopoverTrigger asChild>
              <Button variant="outline" role="combobox" className="w-full justify-between">
                {row.unit
                  ? unitOptions.find((u) => u.value === row.unit)?.label
                  : "Select unit..."}
                <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
              <Command>
                <CommandInput placeholder="Search unit..." />
                <CommandList>
                  <CommandEmpty>No unit found.</CommandEmpty>
                  <CommandGroup>
                    {unitOptions.map((unit) => (
                      <CommandItem
                        key={unit.value}
                        value={unit.value}
                        onSelect={(value) => {
                          updateRow(index, { unit: value as any })
                          setOpenUnitIndex(null)
                        }}
                      >
                        <CheckIcon
                          className={cn(
                            "mr-2 h-4 w-4",
                            row.unit === unit.value ? "opacity-100" : "opacity-0"
                          )}
                        />
                        {unit.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        {/* STOCK */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium md:hidden">Stock</label>
          <Input
            type="number"
            min="0"
            placeholder="Stock"
            value={row.stock}
            onChange={(e) => updateRow(index, { stock: e.target.value })}
            className={cn(
              row.stock && (isNaN(Number(row.stock)) || Number(row.stock) < 0) && "border-red-500"
            )}
          />
          {row.stock && (isNaN(Number(row.stock)) || Number(row.stock) < 0) && (
            <p className="text-xs text-red-500">Stock harus angka</p>
          )}
        </div>

        {/* PRICE */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium md:hidden">Price</label>
          <Input
            type="number"
            min="0"
            placeholder="Price"
            value={row.price}
            onChange={(e) => updateRow(index, { price: e.target.value })}
            className={cn(
              row.price && (isNaN(Number(row.price)) || Number(row.price) < 0) && "border-red-500"
            )}
          />
          {row.price && (isNaN(Number(row.price)) || Number(row.price) < 0) && (
            <p className="text-xs text-red-500">Harga minimal 0</p>
          )}
        </div>
      </div>

      <hr className="mt-5" />
    </div>
  )
}
