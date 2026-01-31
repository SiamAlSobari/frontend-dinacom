"use client"
import React from 'react';
import { ArrowLeft, TrendingUp, Package, BarChart3, Activity } from 'lucide-react';
import { StableDemandChart } from '@/features/dashboard/insight/StableDemandChart';
import { RevenueChart } from '@/features/dashboard/insight/RevenueChart';
import { useQuery } from '@tanstack/react-query';
import AnalyticService from '@/services/AnalyticService';
import { PriorityProducts } from '@/features/dashboard/overview/PriorityProducts';
import { AiInsightsSummary } from '@/features/dashboard/insight/AiInsightsSummary';

export default function InsightsPage() {
  const { data: revenueTrends } = useQuery({
    queryKey: ['revenue-trends'],
    queryFn: AnalyticService.getRevenueTrends,
  })

  const { data: stableAndUnstable } = useQuery({
    queryKey: ['stable-and-unstable'],
    queryFn: AnalyticService.getStableAndUnstable,
  })

  return (
    <div className='mt-9 p-4 sm:p-6 lg:p-10 min-h-screen bg-gray-50'>
      {/* AI Insights Summary */}
      <AiInsightsSummary />

      {/* Priorities This Week */}

      {/* Charts Section */}
      <div className="grid grid-cols-1 mt-10 lg:grid-cols-2 gap-6 mb-6">
        {/* Demand Stability Trend */}
        <div className="bg-white rounded-xl p-6 border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Demand Stability Trend</h2>
          <p className="text-sm text-gray-500 mb-4">Track how many products have stable vs volatile demand over time</p>
          <div className="h-100">
            <StableDemandChart data={stableAndUnstable?.data || []} />
          </div>
        </div>

        {/* Revenue Trend */}
        <div className="bg-white rounded-xl p-6 border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Revenue Trend (30 Days)</h2>
          <p className="text-sm text-gray-500 mb-4">Daily revenue performance over the last month</p>
          <div className="h-100">
            <RevenueChart data={revenueTrends?.data || []} />
          </div>
        </div>
      </div>
    </div>
  );
}