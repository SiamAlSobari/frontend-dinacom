export type ProductFormData = {
  image: File | null
  name: string
  unit: "PCS" | "KG" | "LITER" | "BOX" | "PACK"
  stock: string
  price: string
}

export type UnitOption = {
  value: "PCS" | "KG" | "LITER" | "BOX" | "PACK"
  label: string
}

export const unitOptions: UnitOption[] = [
  { value: "PCS", label: "PCS" },
  { value: "KG", label: "KG" },
  { value: "LITER", label: "LITER" },
  { value: "BOX", label: "BOX" },
  { value: "PACK", label: "PACK" },
]