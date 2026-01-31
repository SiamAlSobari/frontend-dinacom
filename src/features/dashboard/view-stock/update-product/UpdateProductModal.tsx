import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/common/shadcn-ui/dialog";
import { Input } from "@/common/shadcn-ui/input";
import { Label } from "@/common/shadcn-ui/label";
import { Product } from "@/common/response/product";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Upload, X } from "lucide-react";
import React from "react";
import toast from "react-hot-toast";
import ProductService from "@/services/ProductService";
import Image from "next/image";

type UpdateProductModalProps = {
  product: Product;
  onClose: () => void;
};

export function UpdateProductModal({ product, onClose }: UpdateProductModalProps) {
  const queryClient = useQueryClient();
  const [imagePreview, setImagePreview] = React.useState<string | null>(product.image_url || null);
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const { mutateAsync: updateProduct, isPending } = useMutation({
    mutationKey: ["update-product"],
    mutationFn: ({ id, formData }: { id: string; formData: FormData }) =>
      ProductService.updateProduct(id, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!["image/jpeg", "image/png", "image/jpg"].includes(file.type)) {
        toast.error("File harus berupa gambar (JPEG, PNG, JPG)");
        return;
      }
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    // Remove image from formData if no new image selected
    if (!selectedFile) {
      formData.delete("image");
    }

    toast.promise(
      updateProduct({ id: product.id, formData }),
      {
        loading: "Memperbarui produk...",
        success: () => {
          onClose();
          return "Produk berhasil diperbarui ✅";
        },
        error: (err) =>
          err?.response?.data?.message || "Gagal memperbarui produk ❌",
      }
    );
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-125 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Update Product</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {/* Image Upload */}
          <div className="space-y-2">
            <Label>Product Image</Label>
            <div className="flex items-center gap-4">
              {imagePreview ? (
                <div className="relative w-24 h-24 rounded-lg border-2 border-gray-200 overflow-hidden">
                  <Image
                    src={imagePreview}
                    alt="Preview"
                    fill
                    className="object-cover"
                  />
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                  >
                    <X size={14} />
                  </button>
                </div>
              ) : (
                <div className="w-24 h-24 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
                  <Upload className="w-8 h-8 text-gray-400" />
                </div>
              )}
              <div className="flex-1">
                <Input
                  ref={fileInputRef}
                  type="file"
                  name="image"
                  accept="image/jpeg,image/png,image/jpg"
                  onChange={handleImageChange}
                  className="cursor-pointer"
                />
                <p className="text-xs text-gray-500 mt-1">
                  PNG, JPG, JPEG (Max 5MB)
                </p>
              </div>
            </div>
          </div>

          {/* Product Name */}
          <div className="space-y-2">
            <Label htmlFor="name">
              Product Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              name="name"
              defaultValue={product.name}
              required
              minLength={3}
              placeholder="Enter product name"
            />
          </div>

          {/* Unit */}
          <div className="space-y-2">
            <Label htmlFor="unit">
              Unit <span className="text-red-500">*</span>
            </Label>
            <select
              id="unit"
              name="unit"
              defaultValue={product.unit}
              required
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <option value="PCS">PCS</option>
              <option value="KG">KG</option>
              <option value="LITER">LITER</option>
              <option value="BOX">BOX</option>
              <option value="PACK">PACK</option>
            </select>
          </div>

          {/* Stock */}
          <div className="space-y-2">
            <Label htmlFor="stock">Stock</Label>
            <Input
              id="stock"
              name="stock"
              type="number"
              defaultValue={(product as any).stocks?.[0]?.stock_on_hand || (product as any).stock || 0}
              min={0}
              placeholder="Enter stock quantity"
            />
          </div>

          {/* Price */}
          <div className="space-y-2">
            <Label htmlFor="price">Price (Rp)</Label>
            <Input
              id="price"
              name="price"
              type="number"
              defaultValue={product.price}
              min={0}
              placeholder="Enter price"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isPending}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? "Updating..." : "Update Product"}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}