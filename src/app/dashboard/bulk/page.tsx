// export default function TransactionPage() {
//   return (
//     <div className="w-[1280px] h-[1917px] relative bg-gray-50 overflow-hidden">

import { ArrowLeft, Box } from "lucide-react";

//       {/* ================= HEADER ================= */}
//       <div className="w-[1208px] left-[36px] top-[50px] absolute inline-flex justify-center items-center gap-40">
//         <div className="w-80 h-14 relative flex items-center gap-2.5">

//           {/* Icon */}
//           <div className="w-8 h-7 p-2.5 rounded-lg flex items-center justify-center">
//             <img
//               className="w-8 h-7 origin-top-left rotate-180"
//               src="https://placehold.co/32x30"
//               alt=""
//             />
//           </div>

//           {/* Title */}
//           <div className="flex flex-col">
//             <div className="text-black text-xl font-normal font-['Poppins'] leading-6">
//               Record Daily Activity
//             </div>
//             <div className="text-neutral-600 text-sm font-normal font-['Poppins'] leading-6">
//               Bulk input of sales and purchases
//             </div>
//           </div>

//         </div>
//       </div>

//       {/* ================= INFO BANNER ================= */}
//       <div className="w-[1208px] px-6 left-[36px] top-[159px] absolute bg-blue-600/5 rounded-2xl outline outline-[0.50px] outline-blue-600 flex flex-col gap-2.5">
//         <div className="h-20 pl-3.5 pr-5 py-4 flex items-center gap-4">

//           {/* Icon */}
//           <img
//             className="w-8 h-8"
//             src="https://placehold.co/34x34"
//             alt=""
//           />

//           {/* Description */}
//           <p className="text-slate-700 text-base font-normal font-['Poppins']">
//             Add transaction manually or paste CSV-style data. Stock levels will
//             update immediately and triger an AI background job to re-evaluate
//             recomendations.
//           </p>

//         </div>
//       </div>

//       {/* ================= MAIN CARD ================= */}
//       <div className="w-[1208px] h-96 left-[36px] top-[285px] absolute bg-white rounded-2xl shadow overflow-hidden">

//         {/* Title */}
//         <div className="left-[24px] top-[24px] absolute">
//           <div className="text-black text-xl font-normal font-['Poppins'] leading-8">
//             Transaction Entry
//           </div>
//           <div className="text-neutral-600 text-sm font-normal font-['Poppins'] leading-8">
//             Add rows for each transaction
//           </div>
//         </div>

//         {/* Table Header */}
//         <div className="w-full h-12 left-0 top-[108px] absolute bg-gray-50 outline outline-[0.5px] outline-zinc-500/50">
//           <div className="absolute left-[23px] top-[10px] font-medium">Date</div>
//           <div className="absolute left-[282px] top-[10px] font-medium">Product</div>
//           <div className="absolute left-[656px] top-[10px] font-medium">Quantity</div>
//           <div className="absolute left-[975px] top-[10px] font-medium">Type</div>
//         </div>

//         {/* Divider */}
//         <div className="w-full h-px left-0 top-[244px] absolute bg-stone-300" />

//         {/* Date Input */}
//         <div className="w-48 h-12 left-[24px] top-[178px] absolute bg-white rounded-xl outline outline-neutral-400">
//           <div className="px-4 py-2 text-black text-base font-['Poppins'] tracking-wide">
//             6/7/2067
//           </div>
//         </div>

//         {/* Product Select */}
//         <div className="w-80 h-12 left-[282px] top-[178px] absolute bg-white rounded-xl outline outline-neutral-400 flex items-center justify-between px-4">
//           <span className="text-black text-base">Select product...</span>
//           <img className="w-4 h-4" src="https://placehold.co/16x16" alt="" />
//         </div>

//         {/* Quantity */}
//         <div className="w-64 h-12 left-[656px] top-[178px] absolute bg-white rounded-xl outline outline-neutral-400 flex items-center px-4 text-neutral-400">
//           0
//         </div>

//         {/* Type */}
//         <div className="w-32 h-12 left-[975px] top-[178px] absolute bg-white rounded-xl outline outline-neutral-400 flex items-center justify-between px-4">
//           <span>Sale</span>
//           <img className="w-4 h-4" src="https://placehold.co/16x16" alt="" />
//         </div>

//         {/* Add Row */}
//         <div className="w-32 h-10 left-[24px] top-[268px] absolute bg-white rounded-2xl outline outline-blue-700 flex items-center gap-2 px-3">
//           <img className="w-5 h-5" src="https://placehold.co/19x19" alt="" />
//           <span className="text-blue-700">Add Row</span>
//         </div>

//         {/* Submit */}
//         <div className="w-[1020px] h-14 left-[24px] top-[328px] absolute bg-blue-600 rounded-2xl flex items-center justify-center text-white">
//           Submit and Update Stock
//         </div>

//         {/* Cancel */}
//         <div className="w-32 h-14 left-[1058px] top-[328px] absolute bg-white rounded-2xl outline outline-blue-700/40 flex items-center justify-center text-blue-700">
//           Cancel
//         </div>

//       </div>
//     </div>
//   )
// }
export default function BulkTransactionPage() {
    return (
        <div className="p-10">
            <div className="flex items-center gap-4 mb-8">
                <button>
                    <ArrowLeft className="text-gray-600" size={24} />
                </button>

                <div className="flex flex-col">
                    <div className="text-black text-xl font-normal font-['Poppins'] leading-6">
                        Record Daily Activity
                    </div>
                    <div className="text-neutral-600 text-sm font-normal font-['Poppins'] leading-6">
                        Bulk input of sales and purchases
                    </div>
                </div>
            </div>

            {/* INFO BANNER */}
            <div className="w-full px-6 bg-blue-600/5 rounded-2xl  outline-[0.50px] outline-blue-600 flex flex-col gap-2.5">
                <div className="h-20 pl-3.5 pr-5 py-4 flex items-center gap-4">
                    <Box className="w-8 h-8 text-blue-600" size={32} />
                    <p className="text-slate-700 text-base font-normal font-['Poppins']">
                        Add transaction manually or paste CSV-style data. Stock levels will
                        update immediately and triger an AI background job to re-evaluate
                        recomendations.
                    </p>
                </div>
            </div>
        </div>
    )
}
