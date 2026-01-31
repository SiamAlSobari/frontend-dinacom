"use client";
import { Card, CardContent } from "@/common/shadcn-ui/card";
import { Input } from "@/common/shadcn-ui/input";
import { Dialog, DialogTrigger } from "@/common/shadcn-ui/dialog";
import { Plus, Search } from "lucide-react";
import React from "react";
import { CreateProductModal } from "@/features/dashboard/view-stock/create-product/CreateProductModal";
import { ProductList } from "@/features/dashboard/view-stock/ProductList";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ProductService from "@/services/ProductService";
import { Product } from "@/common/response/product";
import ConfirmDialog from "@/common/components/ConfirmModal";
import toast from "react-hot-toast";

export default function ViewStockPage() {
  const [search, setSearch] = React.useState("");
  const queryClient = useQueryClient();

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [selectedProductId, setSelectedProductId] = React.useState<
    string | null
  >(null);
  const [selectedProduct, setSelectedProduct] = React.useState<Product | null>(
    null,
  );
  const limit = 9;

  const { data: productData, isLoading } = useQuery({
    queryKey: ["products", currentPage, limit],
    queryFn: () => ProductService.getProductPaginated(currentPage, limit),
  });



  const { mutateAsync: deleteProduct } = useMutation({
    mutationKey: ["delete-product"],
    mutationFn: ProductService.deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  const products = productData?.data || [];
  const totalPages = productData?.meta?.maxPage || 1;

  const filteredProducts = React.useMemo(() => {
    if (!search) return products;
    return products.filter((product: Product) =>
      product.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [products, search]);

  const handleView = (product: Product) => {
    console.log("View product:", product);
    // Implement view logic
  };

  const handleEdit = (product: Product) => {
    console.log("Edit product:", product);
    // Implement edit logic
  };
  const handleDelete = async () => {
    if (!selectedProductId) return;

    toast.promise(
      deleteProduct(selectedProductId),
      {
        loading: "Menghapus produk...",
        success: "Produk berhasil dihapus ✅",
        error: (err) =>
          err?.response?.data?.message || "Gagal menghapus produk ❌",
      }
    );

    setSelectedProductId(null);
  };



  return (
    <>
      <ConfirmDialog
        cancelText="Batal"
        className="bg-red-500 text-white hover:bg-red-600"
        title="Hapus Produk"
        description="Apakah Anda yakin ingin menghapus produk ini? Tindakan ini tidak dapat dibatalkan."
        confirmText="Hapus"
        isOpen={selectedProductId !== null}
        onClose={() => setSelectedProductId(null)}
        onConfirm={handleDelete}
      />

      <div className="p-4 sm:p-6 lg:p-10 min-h-screen bg-gray-50">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Products</h1>
          <p className="text-gray-600">Manage your product inventory</p>
        </div>

        {/* Search & Create */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10 py-6 w-full"
                  placeholder="Search by product name..."
                />
              </div>

              <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogTrigger asChild>
                  <button className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium bg-blue-600 text-white hover:bg-blue-700 transition-all shadow-sm hover:shadow-md">
                    <Plus className="w-5 h-5" />
                    Create Product
                  </button>
                </DialogTrigger>
                <CreateProductModal onClose={() => setIsModalOpen(false)} />
              </Dialog>
            </div>
          </CardContent>
        </Card>

        {/* Product List */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : filteredProducts.length > 0 ? (
          <ProductList
            key={currentPage}
            setSelectedProductId={(product: string | null) =>
              setSelectedProductId(product)
            }
            products={filteredProducts}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            onView={handleView}
            setSelectedProduct={(product: Product | null) =>
              setSelectedProduct(product)
            }
          />
        ) : (
          <Card className="p-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-500 font-medium mb-1">
                No products found
              </p>
              <p className="text-sm text-gray-400">
                {search
                  ? "Try adjusting your search"
                  : "Create your first product to get started"}
              </p>
            </div>
          </Card>
        )}
      </div>
    </>
  );
}
