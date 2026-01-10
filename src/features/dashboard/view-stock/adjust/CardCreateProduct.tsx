"use client"

import { Card } from "@/common/shadcn-ui/card"
import React from "react"
import { CreateProductRow } from "./CreateProductRow"
import { CreateProductHeader } from "./CreateProductHeader"

// Tipe data yang sesuai dengan validasi backend
export type ProductFormData = {
  image: File | null
  name: string
  unit: "PCS" | "KG" | "LITER" | "BOX" | "PACK"
  stock: string
  price: string
}

export default function CardCreateProduct() {
  const [rows, setRows] = React.useState<ProductFormData[]>([
    { 
      image: null, 
      name: "", 
      unit: "PCS", 
      stock: "", 
      price: "" 
    },
  ])

  const handleAddRow = () => {
    setRows((prev) => [
      ...prev,
      { 
        image: null, 
        name: "", 
        unit: "PCS", 
        stock: "", 
        price: "" 
      },
    ])
  }

  const updateRow = (index: number, data: Partial<ProductFormData>) => {
    setRows((prev) =>
      prev.map((row, i) => (i === index ? { ...row, ...data } : row))
    )
  }

  const handleSubmit = () => {
    // Validasi sebelum submit
    const errors: string[] = []
    
    rows.forEach((row, index) => {
      // Validasi image
      if (!row.image) {
        errors.push(`Row ${index + 1}: Gambar harus diisi`)
      } else if (!["image/jpeg", "image/png", "image/jpg"].includes(row.image.type)) {
        errors.push(`Row ${index + 1}: File harus berupa gambar (JPEG/PNG/JPG)`)
      }
      
      // Validasi name
      if (row.name.length < 3) {
        errors.push(`Row ${index + 1}: Nama minimal 3 karakter`)
      }
      
      // Validasi stock
      const stockNum = Number(row.stock)
      if (isNaN(stockNum) || stockNum < 0) {
        errors.push(`Row ${index + 1}: Stok harus angka valid`)
      }
      
      // Validasi price
      const priceNum = Number(row.price)
      if (isNaN(priceNum) || priceNum < 0) {
        errors.push(`Row ${index + 1}: Harga harus angka dan minimal 0`)
      }
    })
    
    if (errors.length > 0) {
      alert(`Validasi gagal:\n${errors.join('\n')}`)
      return
    }
    
    // Jika validasi berhasil, konversi ke format yang sesuai
    const formattedData = rows.map(row => ({
      ...row,
      stock: Number(row.stock),
      price: Number(row.price)
    }))
    
    console.log("PRODUCT DATA:", formattedData)
    alert("Submit berhasil. Cek console 🔥")
  }

  const handleCancel = () => {
    if (!confirm("Yakin mau membatalkan dan menghapus semua input?")) return
    setRows([{ 
      image: null, 
      name: "", 
      unit: "PCS", 
      stock: "", 
      price: "" 
    }])
  }

  return (
    <Card className="w-full">
      <div className="px-6 pt-6">
        <div className="text-black text-xl font-normal font-['Poppins'] leading-8">
          Create Product
        </div>
        <div className="text-neutral-600 text-sm font-normal font-['Poppins'] leading-8">
          Add product details for each row
        </div>
      </div>
      
      <CreateProductHeader />
      
      <div className="space-y-6 py-4">
        {rows.map((row, index) => (
          <CreateProductRow
            key={index}
            row={row}
            index={index}
            updateRow={updateRow}
          />
        ))}
      </div>

      <div className="px-6 pb-6 space-y-4">
        <button
          onClick={handleAddRow}
          className="w-full md:w-auto px-4 py-2 outline-2 outline-blue-600 text-blue-600 rounded-lg transition"
        >
          + Add Row
        </button>

        <div className="flex flex-col md:flex-row gap-4">
          <button
            onClick={handleSubmit}
            className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Submit
          </button>
          <button
            onClick={handleCancel}
            className="px-8 py-3 outline-2 outline-blue-600 text-blue-600 rounded-lg transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </Card>
  )
}