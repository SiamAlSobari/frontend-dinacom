export function BulkTableHeader() {
    return (
        <div className="w-full grid grid-cols-4 outline outline-gray-200 items-center h-12 bg-gray-50 px-4">
            <div className="font-medium">Date</div>
            <div className="font-medium">Product</div>
            <div className="font-medium">Quantity</div>
            <div className="font-medium">Type</div>
        </div>
    )
}
