import { Box } from "lucide-react"

export function BulkInfoBanner() {
    return (
        <div className="w-full px-6 bg-blue-600/5 rounded-2xl outline-[0.50px] outline-blue-600 flex flex-col gap-2.5">
            <div className="h-20 pl-3.5 pr-5 py-4 flex items-center gap-4">
                <Box className="w-8 h-8 text-blue-600" size={32} />
                <p className="text-slate-700 text-base font-normal font-['Poppins']">
                    Add transaction manually or paste CSV-style data. Stock levels will
                    update immediately and trigger an AI background job to re-evaluate
                    recommendations.
                </p>
            </div>
        </div>
    )
}
