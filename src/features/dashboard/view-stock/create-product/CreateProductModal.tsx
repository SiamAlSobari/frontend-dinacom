import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/common/shadcn-ui/dialog"
import { Plus } from "lucide-react"
import { ProductRow } from "./ProductRow"
import { useCreateProduct } from "./useCreateProduct"

type CreateProductModalProps = {
  onClose: () => void
}

export function CreateProductModal({ onClose }: CreateProductModalProps) {
  const {
    rows,
    imagePreviews,
    isPending,
    handleAddRow,
    handleDeleteRow,
    updateRow,
    handleImageChange,
    validateAndSubmit,
    resetForm
  } = useCreateProduct()

  const handleCancel = () => {
    resetForm()
    onClose()
  }

  const handleSubmit = () => {
    validateAndSubmit()
    onClose()
  }

  return (
    <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden p-0">
      <div className="px-6 pt-6 pb-4 border-b">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Create New Product
          </DialogTitle>
          <DialogDescription>
            Fill in the product details below
          </DialogDescription>
        </DialogHeader>
      </div>

      <div className="overflow-y-auto max-h-[calc(90vh-200px)] px-6 py-4">
        <div className="space-y-4">
          {rows.map((row, index) => (
            <ProductRow
              key={index}
              row={row}
              index={index}
              preview={imagePreviews[index]}
              showDelete={rows.length > 1}
              onUpdate={(data) => updateRow(index, data)}
              onDelete={() => handleDeleteRow(index)}
              onImageChange={(e) => handleImageChange(index, e)}
            />
          ))}
        </div>

        <button
          onClick={handleAddRow}
          className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
        >
          <Plus size={18} />
          Add Another Product
        </button>
      </div>

      <div className="px-6 py-4 border-t flex gap-3">
        <button
          onClick={handleCancel}
          disabled={isPending}
          className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50 transition"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          disabled={isPending}
          className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
        >
          {isPending ? "Creating..." : "Create Products"}
        </button>
      </div>
    </DialogContent>
  )
}