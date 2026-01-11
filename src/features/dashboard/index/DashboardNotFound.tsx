import React from "react"
import { PackageOpen, BellOff, Activity } from "lucide-react"

type Variant = "stock" | "product" | "activity"

interface Props {
  variant: Variant
  title?: string
  description?: string
}

const config = {
  stock: {
    icon: BellOff,
    title: "Tidak Ada Peringatan Stok",
    description: "Semua produk berada pada tingkat stok yang aman."
  },
  product: {
    icon: PackageOpen,
    title: "Belum Ada Produk Terlaris",
    description: "Belum ada data penjualan yang tersedia."
  },
  activity: {
    icon: Activity,
    title: "Belum Ada Aktivitas Terbaru",
    description: "Belum ada aktivitas yang tercatat."
  }
}


export default function DashboardNotFound({ variant, title, description }: Props) {
  const Icon = config[variant].icon

  return (
    <div className="flex flex-col items-center justify-center text-center py-10 px-4 border border-dashed rounded-xl bg-gray-50">
      <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
        <Icon className="text-gray-500" size={22} />
      </div>

      <p className="text-sm font-semibold text-gray-800">
        {title || config[variant].title}
      </p>

      <p className="text-xs text-gray-500 mt-1 max-w-xs">
        {description || config[variant].description}
      </p>
    </div>
  )
}
