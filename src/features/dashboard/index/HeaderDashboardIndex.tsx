import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function HeaderDashboardIndex() {
    return (
        <header className="flex p-5 px-9 border-b items-center gap-3 ">
            <Link href="/dashboard" className="flex items-start gap-3">
                <div className="inline-flex items-center justify-center w-13 h-13 bg-blue-600 rounded-md ">
                    <Image
                        src="/icons/inventa_icon_white.png"
                        alt="Logo"
                        width={32}
                        height={36}
                    />
                </div>
                <div className="flex items-start flex-col">

                    <h1 className="text-md font-normal text-stone-900">Inventa</h1>
                    <span className="text-sm font-normal text-stone-600">Dashboard </span>
                </div>
            </Link>
        </header>
    )
}
