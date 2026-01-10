"use client"

import { Activity, Lightbulb } from "lucide-react"
import { useRouter } from "next/navigation"
import React, { useState } from "react"

export default function RecommendationBar() {
    const router = useRouter()
  const [active, setActive] = useState<"insight" | "rekomendasi">("insight")
  React.useEffect(() => {
    if (active === "insight") {
        router.push("/dashboard/keputusan")
    }else{
        router.push("/dashboard/keputusan/rekomendasi")
    }
  }, [active])
  return (
    <div className="w-full flex flex-col lg:flex-row gap-3 lg:items-center lg:justify-between">

      {/* LEFT INFO */}
      <div className="flex items-center gap-3 border border-blue-300 bg-blue-100 rounded-xl px-4 py-3 w-full">
        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-50">
          <Activity className="w-4 h-4 text-blue-600" />
        </div>
        <p className="text-sm text-blue-900">
          Mark as completed after restock. Actions are retained and new recommendations
        </p>
      </div>

      {/* RIGHT TOGGLE */}
      <div className="flex items-center gap-3 border border-blue-300 rounded-xl py-3 px-4 bg-blue-50 w-fit">
        <button
          onClick={() => setActive("insight")}
          className={`px-4 py-1.5 text-sm rounded-lg transition ${
            active === "insight"
              ? "bg-blue-600 text-white shadow"
              : "text-gray-600 border "
          }`}
        >
          Insight
        </button>

        <button
          onClick={() => setActive("rekomendasi")}
          className={`px-4 py-1.5 text-sm rounded-lg transition ${
            active === "rekomendasi"
              ? "bg-blue-600 text-white shadow"
              : "text-gray-600 border "
          }`}
        >
          Recommendations
        </button>
      </div>
    </div>
  )
}
