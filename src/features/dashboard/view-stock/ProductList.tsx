import { Card } from "@/common/shadcn-ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/common/shadcn-ui/dropdown-menu"
import { Product } from "@/common/response/product"
import { MoreVertical, Eye, Edit, Trash2, ChevronLeft, ChevronRight, Package } from "lucide-react"
import Image from "next/image"

type ProductListProps = {
  products: Product[]
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  onView: (product: Product) => void
  setSelectedProductId: (product: string | null) => void
  setSelectedProduct: (product: Product | null) => void
}

export function ProductList({
  products,
  currentPage,
  totalPages,
  setSelectedProduct,
  onPageChange,
  setSelectedProductId,
}: ProductListProps) {
  const getStockStatus = (stock: number) => {
    if (stock === 0) return { label: "Out of Stock", color: "bg-gray-100 text-gray-700" }
    if (stock < 10) return { label: "Low Stock", color: "bg-gray-100 text-gray-700" }
    if (stock < 30) return { label: "Medium", color: "bg-gray-100 text-gray-700" }
    return { label: "In Stock", color: "bg-gray-100 text-gray-700" }
  }


  return (
    <div className="space-y-4">
      {/* Table */}
      <Card className="border-0 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left p-4 font-medium text-gray-600 text-sm bg-gray-50/50">Product</th>
                <th className="text-left p-4 font-medium text-gray-600 text-sm bg-gray-50/50">Stock</th>
                {/* <th className="text-left p-4 font-medium text-gray-600 text-sm bg-gray-50/50">Status</th> */}
                <th className="text-left p-4 font-medium text-gray-600 text-sm bg-gray-50/50">Price</th>
                <th className="text-left p-4 font-medium text-gray-600 text-sm bg-gray-50/50">Unit</th>
                <th className="text-center p-4 font-medium text-gray-600 text-sm bg-gray-50/50">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {products.map((product, index) => {
                const stock = (product as any).stocks?.[0]?.stock_on_hand || (product as any).stock || 0
                const status = getStockStatus(stock)

                return (
                  <tr 
                    key={product.id} 
                    className="group hover:bg-blue-50/30 transition-colors"
                    style={{ 
                      animationDelay: `${index * 50}ms`,
                      animation: 'fadeIn 0.3s ease-in-out forwards',
                      opacity: 0
                    }}
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-linear-to-br from-gray-100 to-gray-50 rounded-xl flex items-center justify-center shrink-0 overflow-hidden border border-gray-200 group-hover:border-blue-300 transition-colors">
                          {product.image_url ? (
                            <Image
                              src={product.image_url}
                              alt={product.name}
                              width={48}
                              height={48}
                              className="object-cover w-full h-full"
                            />
                          ) : (
                            <Package size={22} className="text-gray-400" />
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                            {product.name}
                          </p>
                          <p className="text-xs text-gray-500 mt-0.5">
                            {new Date(product.created_at).toLocaleDateString('id-ID', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric'
                            })}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <span className=" text-gray-900">
                          {stock}
                        </span>
                      </div>
                    </td>
                    {/* <td className="p-4">
                      <span className={`inline-flex px-3 py-1.5 rounded-lg text-xs font-medium ${status.color}`}>
                        {status.label}
                      </span>
                    </td> */}
                    <td className="p-4">
                      <div>
                        <span className="font-semibold text-gray-900">
                          Rp {product.price.toLocaleString('id-ID')}
                        </span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gray-50 border border-gray-200 rounded-md text-sm text-gray-700">
                        {product.unit}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-center">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <button className="p-2 hover:bg-gray-100 rounded-lg transition-all hover:shadow-sm">
                              <MoreVertical size={18} className="text-gray-600" />
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-44">
                            <DropdownMenuItem onClick={() => setSelectedProductId(product.id)} className="cursor-pointer">
                              <Eye size={16} />
                              <span>View Details</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setSelectedProduct(product)} className="cursor-pointer">
                              <Edit size={16} />
                              <span>Edit Product</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              variant="destructive"
                              onClick={() => setSelectedProductId(product.id)}
                              className="cursor-pointer"
                            >
                              <Trash2 size={16} />
                              <span>Delete</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Pagination */}
      {totalPages > 1 && (
        <Card className="border-0 shadow-sm">
          <div className="flex items-center justify-between p-4">
            <p className="text-sm text-gray-600 font-medium">
              Showing page <span className="text-gray-900 font-semibold">{currentPage}</span> of <span className="text-gray-900 font-semibold">{totalPages}</span>
            </p>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all text-sm font-medium flex items-center gap-1"
              >
                <ChevronLeft size={16} />
                Previous
              </button>

              <div className="flex items-center gap-1 px-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                  if (
                    page === 1 ||
                    page === totalPages ||
                    (page >= currentPage - 1 && page <= currentPage + 1)
                  ) {
                    return (
                      <button
                        key={page}
                        onClick={() => onPageChange(page)}
                        className={`min-w-9 h-9 rounded-lg transition-all text-sm font-medium ${
                          page === currentPage
                            ? "bg-blue-600 text-white shadow-sm"
                            : "hover:bg-gray-100 text-gray-700"
                        }`}
                      >
                        {page}
                      </button>
                    )
                  } else if (
                    page === currentPage - 2 ||
                    page === currentPage + 2
                  ) {
                    return <span key={page} className="px-1 text-gray-400">•••</span>
                  }
                  return null
                })}
              </div>

              <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all text-sm font-medium flex items-center gap-1"
              >
                Next
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </Card>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}