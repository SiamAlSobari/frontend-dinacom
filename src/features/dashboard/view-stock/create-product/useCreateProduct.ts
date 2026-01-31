import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import ProductService from "@/services/ProductService"
import { ProductFormData } from "./types"
import toast from "react-hot-toast"

export function useCreateProduct() {
    const queryClient = useQueryClient()
  const [rows, setRows] = useState<ProductFormData[]>([
    {
      image: null,
      name: "",
      unit: "PCS",
      stock: "",
      price: ""
    },
  ])
  const [imagePreviews, setImagePreviews] = useState<(string | null)[]>([null])

  const { mutateAsync: createProduct, isPending } = useMutation({
    mutationFn: ProductService.createProduct,
    mutationKey: ["create-product"],
    onSuccess: () => {
      resetForm()
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  })

  const resetForm = () => {
    setRows([{
      image: null,
      name: "",
      unit: "PCS",
      stock: "",
      price: ""
    }])
    setImagePreviews([null])
  }

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
    setImagePreviews((prev) => [...prev, null])
  }

  const handleDeleteRow = (index: number) => {
    if (rows.length === 1) {
      alert("Minimal harus ada 1 row")
      return
    }
    setRows((prev) => prev.filter((_, i) => i !== index))
    setImagePreviews((prev) => prev.filter((_, i) => i !== index))
  }

  const updateRow = (index: number, data: Partial<ProductFormData>) => {
    setRows((prev) =>
      prev.map((row, i) => (i === index ? { ...row, ...data } : row))
    )
  }

  const handleImageChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      updateRow(index, { image: file })
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreviews((prev) => {
          const newPreviews = [...prev]
          newPreviews[index] = reader.result as string
          return newPreviews
        })
      }
      reader.readAsDataURL(file)
    }
  }

  const validateAndSubmit = () => {
    const errors: string[] = []

    rows.forEach((row, index) => {
      if (!row.image) {
        errors.push(`Row ${index + 1}: Gambar harus diisi`)
      }
      if (row.name.length < 3) {
        errors.push(`Row ${index + 1}: Nama minimal 3 karakter`)
      }
      const stockNum = Number(row.stock)
      if (isNaN(stockNum) || stockNum < 0) {
        errors.push(`Row ${index + 1}: Stok harus angka valid`)
      }
      const priceNum = Number(row.price)
      if (isNaN(priceNum) || priceNum < 0) {
        errors.push(`Row ${index + 1}: Harga harus angka dan minimal 0`)
      }
    })

    if (errors.length > 0) {
      alert(`Validasi gagal:\n${errors.join('\n')}`)
      return
    }

    const formattedData = rows.map(row => ({
      ...row,
      stock: Number(row.stock),
      price: Number(row.price)
    }))

    toast.promise(
      createProduct(formattedData),
      {
        loading: 'Membuat produk...',
        success: 'Produk berhasil dibuat!',
        error: 'Gagal membuat produk.'
      }
    )
  }

  return {
    rows,
    imagePreviews,
    isPending,
    handleAddRow,
    handleDeleteRow,
    updateRow,
    handleImageChange,
    validateAndSubmit,
    resetForm
  }
}