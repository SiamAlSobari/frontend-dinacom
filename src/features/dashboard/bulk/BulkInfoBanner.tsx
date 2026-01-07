import { Box } from "lucide-react"

export function BulkInfoBanner() {
    return (
        <div className="w-full px-6 py-4 bg-blue-600/5 rounded-2xl  outline-[0.5px] outline-blue-600 flex gap-4">
            <Box className="w-8 h-8 text-blue-600 shrink-0" size={32} />
            <p className="text-slate-700 text-base font-normal font-['Poppins']">
                Add transaction manually or paste CSV-style data. Stock levels will
                update immediately and trigger an AI background job to re-evaluate
                recommendations.
            </p>
        </div>
    )
}