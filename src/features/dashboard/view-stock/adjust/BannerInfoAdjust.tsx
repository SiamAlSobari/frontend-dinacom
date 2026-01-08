import {  Pencil } from 'lucide-react'

export default function BannerInfoAdjust() {
  return (
    <div className="w-full px-6 py-4 bg-blue-600/5 rounded-2xl outline-[0.5px] outline-blue-600 flex items-center gap-4">
      <Pencil className="w-8 h-8 text-blue-600 shrink-0" size={32} />
      <p className="text-slate-700 text-base font-normal font-['Poppins']">
        Manual Adjust stock level here. Change or save immediately
      </p>
    </div>
  )
}
