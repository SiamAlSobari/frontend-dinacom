export function CreateProductHeader() {
  return (
    <div className="hidden md:grid md:grid-cols-5 outline outline-gray-200 items-center h-12 bg-gray-50 px-4">
      <div className="font-medium">Image</div>
      <div className="font-medium">Name</div>
      <div className="font-medium">Unit</div>
      <div className="font-medium">Stock</div>
      <div className="font-medium">Price</div>
    </div>
  )
}