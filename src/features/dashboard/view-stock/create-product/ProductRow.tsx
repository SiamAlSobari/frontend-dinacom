import { X } from "lucide-react"
import { ProductFormData } from "./types"
import { ImageUpload } from "./ImageUpload"
import { ProductFormFields } from "./ProductFormFields"

type ProductRowProps = {
  row: ProductFormData
  index: number
  preview: string | null
  showDelete: boolean
  onUpdate: (data: Partial<ProductFormData>) => void
  onDelete: () => void
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function ProductRow({
  row,
  index,
  preview,
  showDelete,
  onUpdate,
  onDelete,
  onImageChange
}: ProductRowProps) {
  return (
    <div className="border rounded-lg p-4 bg-gray-50">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-gray-700">
          Product #{index + 1}
        </span>
        {showDelete && (
          <button
            onClick={onDelete}
            className="text-red-600 hover:text-red-800 transition"
          >
            <X size={20} />
          </button>
        )}
      </div>

      <div className="space-y-4">
        <ImageUpload preview={preview} onImageChange={onImageChange} />
        <ProductFormFields row={row} onUpdate={onUpdate} />
      </div>
    </div>
  )
}