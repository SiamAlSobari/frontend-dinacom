export function BulkTableHeader() {
    return (
        <div className="hidden md:grid md:grid-cols-6 outline outline-gray-200 items-center h-12 bg-gray-50 px-4">
            <div className="font-medium">Date</div>
            <div className="font-medium">Product</div>
            <div className="font-medium">Quantity</div>
            <div className="font-medium">Price</div>
            <div className="font-medium">Total Price</div>
            <div className="font-medium">Method</div>
        </div>
    )
}