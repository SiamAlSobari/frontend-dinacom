import { Input } from "@/common/shadcn-ui/input"
import { ProductFormData, unitOptions } from "./types"

type ProductFormFieldsProps = {
  row: ProductFormData
  onUpdate: (data: Partial<ProductFormData>) => void
}

export function ProductFormFields({ row, onUpdate }: ProductFormFieldsProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {/* Product Name */}
      <div className="col-span-2">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Product Name
        </label>
        <Input
          placeholder="Enter product name"
          value={row.name}
          onChange={(e) => onUpdate({ name: e.target.value })}
        />
      </div>

      {/* Unit */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Unit
        </label>
        <select
          value={row.unit}
          onChange={(e) => onUpdate({ unit: e.target.value as any })}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {unitOptions.map((unit) => (
            <option key={unit.value} value={unit.value}>
              {unit.label}
            </option>
          ))}
        </select>
      </div>

      {/* Stock */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Stock
        </label>
        <Input
          type="number"
          min="0"
          placeholder="0"
          value={row.stock}
          onChange={(e) => onUpdate({ stock: e.target.value })}
        />
      </div>

      {/* Price */}
      <div className="col-span-2">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Price
        </label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
            Rp
          </span>
          <Input
            type="number"
            min="0"
            placeholder="0"
            value={row.price}
            onChange={(e) => onUpdate({ price: e.target.value })}
            className="pl-10"
          />
        </div>
      </div>
    </div>
  )
}