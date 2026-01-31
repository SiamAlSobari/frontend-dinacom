import React from 'react'
import { Lock, Check, X } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface CardSubscriptionInfoProps {
  onClose: () => void
}

export default function CardSubscribetionInfo({ onClose }: CardSubscriptionInfoProps) {
  const router = useRouter()
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl relative overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5  transition-colors z-10"
        >
          <X className="w-5 h-5 text-white" />
        </button>

        {/* Dark Top Section */}
        <div className="bg-slate-800 pt-10 pb-8 px-6 relative">
          {/* Icon */}
          <div className="flex  mb-6">
            <div className="w-14 h-14 bg-slate-700/80 rounded-2xl flex items-center justify-center">
              <Lock className="w-7 h-7 text-slate-300" />
            </div>
          </div>

          {/* Title & Description */}
          <h2 className="text-xl ] text-white mb-3 leading-tight">
            POS integration is available for subscribers
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed ">
            Connect your point of sale system and get real-time sales insights, automated stock sync, and enhanced recommendations.
          </p>
        </div>

        {/* White Bottom Section */}
        <div className="bg-white px-6 py-6">
          {/* Features List */}
          <div className="space-y-4 mb-6">
            <div className="flex items-start gap-3">
              <div className="mt-0.5">
                <div className="w-5 h-5 rounded-full border-2 border-blue-500 flex items-center justify-center bg-blue-50">
                  <Check className="w-3 h-3 text-blue-600 stroke-3" />
                </div>
              </div>
              <div>
                <h3 className="text-sm  text-gray-900">POS insight dashboard</h3>
                <p className="text-xs text-gray-500 mt-0.5">Revenue tracking and smart analytics</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="mt-0.5">
                <div className="w-5 h-5 rounded-full border-2 border-blue-500 flex items-center justify-center bg-blue-50">
                  <Check className="w-3 h-3 text-blue-600 stroke-3" />
                </div>
              </div>
              <div>
                <h3 className="text-sm  text-gray-900">Real-time POS data sync</h3>
                <p className="text-xs text-gray-500 mt-0.5">Automatic transaction imports every hour</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="mt-0.5">
                <div className="w-5 h-5 rounded-full border-2 border-blue-500 flex items-center justify-center bg-blue-50">
                  <Check className="w-3 h-3 text-blue-600 stroke-3" />
                </div>
              </div>
              <div>
                <h3 className="text-sm  text-gray-900">Enhanced AI recommendations</h3>
                <p className="text-xs text-gray-500 mt-0.5">A better prediction with sales data</p>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="space-y-3" onClick={
            () => router.push('/billing')
          }>
            <button className="w-full bg-blue-600 hover:bg-blue-700 font-[Poppins] text-white  py-3.5 rounded-xl transition-colors shadow-lg shadow-blue-500/30">
              Upgrade to unlock POS and Card recommendations
            </button>
            <button
              onClick={onClose}
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3.5 rounded-xl transition-colors"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
