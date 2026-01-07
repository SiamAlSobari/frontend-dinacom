"use client"

import { Card, CardContent, CardHeader } from '@/common/shadcn-ui/card'
import { Input } from '@/common/shadcn-ui/input'
import ProductBackgroundColor from '@/features/dashboard/view/ProductBackgroundColor'
import StatusBadgeColor from '@/features/dashboard/view/StatusBadgeColor'
import UnitStockViewColor from '@/features/dashboard/view/UnitStockViewColor'
import { ArrowLeft } from 'lucide-react'
import React from 'react'


export default function ViewStockPage() {
    const [search, setSearch] = React.useState('')
    const stockItems = [
        {
            name: "Product A",
            stock_in: 5,
            stock_out: 3,
            status: "Critical",
            day_left: 10,
            caregory: "Category 1",
            image: "saas.png"
        },
        {
            name: "Product A",
            stock_in: 15,
            stock_out: 3,
            status: "Low",
            day_left: 10,
            caregory: "Category 1",
            image: "saas.png"
        },
        {
            name: "Product A",
            stock_in: 26,
            stock_out: 3,
            status: "Good",
            day_left: 10,
            caregory: "Category 1",
            image: "saas.png"
        },
        {
            name: "Product A",
            stock_in: 60,
            stock_out: 3,
            status: "High",
            day_left: 10,
            caregory: "Category 1",
            image: "saas.png"
        },
    ]

    const filteredStock = stockItems.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.caregory.toLowerCase().includes(search.toLowerCase()) ||
        item.status.toLowerCase().includes(search.toLowerCase())
    )


    return (
        <div className="p-10">
            <div className="flex items-center gap-4 mb-8">
                <button>
                    <ArrowLeft className="text-gray-600" size={24} />
                </button>

                <div className="flex flex-col">
                    <div className="text-black text-xl font-normal font-['Poppins'] leading-6">
                        Stock Management
                    </div>
                    <div className="text-neutral-600 text-sm font-normal font-['Poppins'] leading-6">
                        100+ products in stock
                    </div>
                </div>
            </div>

            <Card>
                <CardContent>
                    <div className='flex'>
                        <Input onChange={(e) => setSearch(e.target.value)} className='p-5 flex-1' placeholder="Search stock items..." />
                        <button className='ml-4 px-6 bg-blue-600 text-white rounded-lg font-medium'>Search</button>
                        <button className='ml-4 px-6 bg-gray-400/15 text-gray-500 rounded-lg font-medium' >Quick Adjust</button>
                    </div>
                </CardContent>
            </Card>
            <Card className='mt-10 pt-0'>
                <CardHeader className="py-4 border-b-2 border-gray-500/10 rounded-tl-xl rounded-tr-xl bg-gray-300/15">
                    <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr] items-center px-2">
                        <div className="font-semibold text-xl">Product</div>
                        <div className="font-semibold text-xl text-center">Current Stock</div>
                        <div className="font-semibold text-xl text-center">Sold (7d)</div>
                        <div className="font-semibold text-xl text-center">Status</div>
                        <div className="font-semibold text-xl text-center">Day Left</div>
                        <div className="font-semibold text-xl text-center">Category</div>
                    </div>
                </CardHeader>

                <CardContent>
                    {filteredStock.map((item, index) => (
                        <div
                            key={index}
                            className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr] items-center py-4  px-2"
                        >
                            {/* Product */}
                            <ProductBackgroundColor name={item.name} status={item.status} />

                            {/* Stock in */}
                            <div className={`font-medium text-lg text-center px-2 py-1 rounded-lg ${UnitStockViewColor(item.stock_in)}`}>
                                {item.stock_in} Units
                            </div>

                            {/* Stock out */}
                            <div className="font-medium text-lg text-center">
                                {item.stock_out}
                            </div>

                            {/* Status */}
                            <div className="font-medium text-lg text-center">
                                {StatusBadgeColor(item.status)}
                            </div>

                            {/* Day left */}
                            <div className="font-medium text-lg text-center">
                                ~ {item.day_left} days
                            </div>

                            {/* Category */}
                            <div className="font-medium text-lg text-center">
                                {item.caregory}
                            </div>
                        </div>
                    ))}
                </CardContent>

            </Card>
        </div>
    )
}
