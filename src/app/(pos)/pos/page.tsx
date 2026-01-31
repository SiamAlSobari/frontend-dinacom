"use client"
import { Card } from "@/common/shadcn-ui/card"
import { Input } from "@/common/shadcn-ui/input"
import { Search, ShoppingCart, Plus, Minus, X, DollarSign, Keyboard } from "lucide-react"
import React from "react"
import Image from "next/image"
import { useQuery } from "@tanstack/react-query"
import ProductService from "@/services/ProductService"
import { Product } from "@/common/response/product"
import { PaymentModal } from "./components/PaymentModal"

type CartItem = {
  product: Product
  quantity: number
  subtotal: number
}

export default function POSPage() {
  const [search, setSearch] = React.useState("")
  const [cart, setCart] = React.useState<CartItem[]>([])
  const [selectedCategory, setSelectedCategory] = React.useState<string>("ALL")
  const [editingItemId, setEditingItemId] = React.useState<string | null>(null)
  const [tempQuantity, setTempQuantity] = React.useState("")
  const [isPaymentModalOpen, setIsPaymentModalOpen] = React.useState(false)

  const { data: productData } = useQuery({
    queryKey: ['products-pos'],
    queryFn: () => ProductService.getProduct(),
  })

  const products = productData || []

  const categories = React.useMemo(() => {
    const cats = new Set(products.map((p: Product) => p.unit))
    return ["ALL", ...Array.from(cats)]
  }, [products])

  const filteredProducts = React.useMemo(() => {
    let filtered = products

    if (selectedCategory !== "ALL") {
      filtered = filtered.filter((p: Product) => p.unit === selectedCategory)
    }

    if (search) {
      filtered = filtered.filter((p: Product) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      )
    }

    return filtered
  }, [products, selectedCategory, search])

  const addToCart = (product: Product) => {
    const stock = (product as any).stocks?.[0]?.stock_on_hand || 0
    
    const existingItem = cart.find(item => item.product.id === product.id)
    
    if (existingItem) {
      if (existingItem.quantity >= stock) {
        alert("Stock tidak mencukupi!")
        return
      }
      updateQuantity(product.id, existingItem.quantity + 1)
    } else {
      if (stock === 0) {
        alert("Stock habis!")
        return
      }
      setCart([...cart, {
        product,
        quantity: 1,
        subtotal: product.price
      }])
    }
  }

  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity === 0) {
      removeFromCart(productId)
      return
    }

    setCart(cart.map(item => {
      if (item.product.id === productId) {
        const stock = (item.product as any).stocks?.[0]?.stock_on_hand || 0
        if (newQuantity > stock) {
          alert("Stock tidak mencukupi!")
          return item
        }
        return {
          ...item,
          quantity: newQuantity,
          subtotal: item.product.price * newQuantity
        }
      }
      return item
    }))
  }

  const startEditQuantity = (itemId: string, currentQuantity: number) => {
    setEditingItemId(itemId)
    setTempQuantity(currentQuantity.toString())
  }

  const saveQuantity = (productId: string) => {
    const newQty = parseInt(tempQuantity)
    if (isNaN(newQty) || newQty < 1) {
      alert("Quantity harus lebih dari 0!")
      setEditingItemId(null)
      return
    }
    updateQuantity(productId, newQty)
    setEditingItemId(null)
  }

  const handleQuantityKeyPress = (e: React.KeyboardEvent, productId: string) => {
    if (e.key === 'Enter') {
      saveQuantity(productId)
    } else if (e.key === 'Escape') {
      setEditingItemId(null)
    }
  }

  const removeFromCart = (productId: string) => {
    setCart(cart.filter(item => item.product.id !== productId))
  }

  const clearCart = () => {
    if (confirm("Yakin ingin mengosongkan keranjang?")) {
      setCart([])
    }
  }

  const total = cart.reduce((sum, item) => sum + item.subtotal, 0)
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert("Keranjang masih kosong!")
      return
    }
    setIsPaymentModalOpen(true)
  }

  const handlePaymentSuccess = () => {
    alert("Pembayaran berhasil! Terima kasih.")
    setCart([])
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-6">
      <div className="max-w-screen-2xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Point of Sale</h1>
          <p className="text-gray-600">Kelola transaksi penjualan Anda</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Products Section */}
          <div className="lg:col-span-2 space-y-4">
            {/* Search & Categories */}
            <Card className="p-4 shadow-sm">
              <div className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-10"
                    placeholder="Cari produk..."
                  />
                </div>

                <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                        selectedCategory === category
                          ? "bg-blue-600 text-white shadow-md"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </Card>

            {/* Product Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredProducts.map((product: Product) => {
                const stock = (product as any).stocks?.[0]?.stock_on_hand || 0
                const inCart = cart.find(item => item.product.id === product.id)

                return (
                  <Card
                    key={product.id}
                    className="overflow-hidden cursor-pointer p-0 hover:shadow-xl hover:scale-105 transition-all group"
                    onClick={() => addToCart(product)}
                  >
                    <div className="relative h-36 bg-gradient-to-br from-gray-100 to-gray-50">
                      {product.image_url ? (
                        <Image
                          src={product.image_url}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          No Image
                        </div>
                      )}
                      {stock === 0 && (
                        <div className="absolute inset-0 bg-black/70 flex items-center justify-center backdrop-blur-sm">
                          <span className="text-white font-bold text-lg">HABIS</span>
                        </div>
                      )}
                      {inCart && (
                        <div className="absolute top-2 right-2 w-7 h-7 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold shadow-lg">
                          {inCart.quantity}
                        </div>
                      )}
                    </div>
                    <div className="p-3 bg-white">
                      <h3 className="font-semibold text-sm text-gray-900 mb-2 truncate group-hover:text-blue-600 transition">
                        {product.name}
                      </h3>
                      <div className="flex items-center justify-between">
                        <span className="text-blue-600 font-bold">
                          Rp {product.price.toLocaleString('id-ID')}
                        </span>
                        <span className={`text-xs px-2 py-0.5 rounded ${
                          stock === 0 ? 'bg-red-100 text-red-700' :
                          stock < 10 ? 'bg-orange-100 text-orange-700' :
                          'bg-green-100 text-green-700'
                        }`}>
                          {stock}
                        </span>
                      </div>
                    </div>
                  </Card>
                )
              })}
            </div>

            {filteredProducts.length === 0 && (
              <Card className="p-12">
                <div className="text-center text-gray-500">
                  <Search className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                  <p>Produk tidak ditemukan</p>
                </div>
              </Card>
            )}
          </div>

          {/* Cart Section - Same as before, keeping it unchanged */}
          <div className="lg:col-span-1">
            <Card className="sticky top-6 shadow-lg">
              <div className="p-4 border-b bg-gradient-to-r from-blue-600 to-blue-700">
                <div className="flex items-center justify-between text-white">
                  <div className="flex items-center gap-2">
                    <ShoppingCart size={20} />
                    <h2 className="font-semibold">Keranjang</h2>
                    {cart.length > 0 && (
                      <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs">
                        {cart.length}
                      </span>
                    )}
                  </div>
                  {cart.length > 0 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        clearCart()
                      }}
                      className="text-xs hover:bg-white/20 px-3 py-1.5 rounded-lg transition"
                    >
                      Kosongkan
                    </button>
                  )}
                </div>
              </div>

              <div className="p-4">
                {cart.length === 0 ? (
                  <div className="text-center py-16 text-gray-500">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <ShoppingCart className="w-10 h-10 text-gray-400" />
                    </div>
                    <p className="font-medium mb-1">Keranjang Kosong</p>
                    <p className="text-xs text-gray-400">Pilih produk untuk memulai transaksi</p>
                  </div>
                ) : (
                  <div className="space-y-3 max-h-[450px] overflow-y-auto pr-2 custom-scrollbar">
                    {cart.map((item) => (
                      <div key={item.product.id} className="border-2 border-gray-100 rounded-xl p-3 bg-gradient-to-br from-white to-gray-50 hover:border-blue-200 transition-all">
                        <div className="flex items-start gap-3 mb-3">
                          <div className="w-14 h-14 bg-gray-200 rounded-lg flex-shrink-0 overflow-hidden">
                            {item.product.image_url && (
                              <Image
                                src={item.product.image_url}
                                alt={item.product.name}
                                width={56}
                                height={56}
                                className="object-cover w-full h-full"
                              />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-sm text-gray-900 mb-1 line-clamp-2">
                              {item.product.name}
                            </h4>
                            <p className="text-xs text-gray-500">
                              Rp {item.product.price.toLocaleString('id-ID')} / item
                            </p>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              removeFromCart(item.product.id)
                            }}
                            className="text-red-500 hover:bg-red-50 p-1.5 rounded-lg transition"
                          >
                            <X size={16} />
                          </button>
                        </div>

                        <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                          <div className="flex items-center gap-1">
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                updateQuantity(item.product.id, item.quantity - 1)
                              }}
                              className="w-8 h-8 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 flex items-center justify-center transition-all"
                            >
                              <Minus size={14} className="text-gray-700" />
                            </button>

                            {editingItemId === item.product.id ? (
                              <input
                                type="number"
                                value={tempQuantity}
                                onChange={(e) => setTempQuantity(e.target.value)}
                                onKeyDown={(e) => handleQuantityKeyPress(e, item.product.id)}
                                onBlur={() => saveQuantity(item.product.id)}
                                className="w-16 h-8 text-center font-bold border-2 border-blue-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                                autoFocus
                              />
                            ) : (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  startEditQuantity(item.product.id, item.quantity)
                                }}
                                className="w-16 h-8 text-center font-bold bg-blue-50 border-2 border-blue-200 rounded-lg hover:bg-blue-100 transition-all group/qty"
                              >
                                <span className="text-gray-900">{item.quantity}</span>
                                <Keyboard size={10} className="inline ml-1 text-gray-400 opacity-0 group-hover/qty:opacity-100 transition" />
                              </button>
                            )}

                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                updateQuantity(item.product.id, item.quantity + 1)
                              }}
                              className="w-8 h-8 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 flex items-center justify-center transition-all"
                            >
                              <Plus size={14} className="text-gray-700" />
                            </button>
                          </div>

                          <div className="text-right">
                            <span className="font-bold text-blue-600">
                              Rp {item.subtotal.toLocaleString('id-ID')}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {cart.length > 0 && (
                  <>
                    <div className="border-t-2 border-gray-200 mt-4 pt-4 space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Total Item</span>
                        <span className="font-semibold text-gray-900">{totalItems} pcs</span>
                      </div>
                      <div className="flex justify-between items-center bg-blue-50 p-3 rounded-lg">
                        <span className="font-semibold text-gray-700">Total Bayar</span>
                        <span className="text-xl font-bold text-blue-600">
                          Rp {total.toLocaleString('id-ID')}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={handleCheckout}
                      className="w-full mt-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3.5 rounded-xl font-bold hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 text-lg"
                    >
                      <DollarSign size={22} />
                      Checkout Sekarang
                    </button>
                  </>
                )}
              </div>
            </Card>
          </div>
        </div>

        <style jsx global>{`
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .hide-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: #f1f1f1;
            border-radius: 10px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #cbd5e1;
            border-radius: 10px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: #94a3b8;
          }
        `}</style>
      </div>

      {/* Payment Modal */}
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        total={total}
        onPaymentSuccess={handlePaymentSuccess}
      />
    </div>
  )
}