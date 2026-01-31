"use client"
import React from 'react';
import { ArrowLeft, TrendingUp, Package, BarChart3, Activity } from 'lucide-react';
import { StableDemandChart } from '@/features/dashboard/insight/StableDemandChart';
import { RevenueChart } from '@/features/dashboard/insight/RevenueChart';
import { useQuery } from '@tanstack/react-query';
import AnalyticService from '@/services/AnalyticService';
import { PriorityProducts } from '@/features/dashboard/overview/PriorityProducts';

export default function InsightsPage() {
  const priorityProducts = [
    {
      id: 1,
      name: "Dark Chocolate Bar 100g",
      description: "Critical stock level, high demand",
      status: "URGENT",
      bgColor: "bg-red-50",
      borderColor: "border-l-4 border-l-red-500",
      badgeBg: "bg-red-100",
      badgeText: "text-red-600",
      numberBg: "bg-red-500",
      numberText: "text-white"
    },
    {
      id: 2,
      name: "Greek Yogurt 500g",
      description: "Running low, popular item",
      status: "HIGH",
      bgColor: "bg-orange-50",
      borderColor: "border-l-4 border-l-orange-500",
      badgeBg: "bg-orange-100",
      badgeText: "text-orange-600",
      numberBg: "bg-orange-500",
      numberText: "text-white"
    },
    {
      id: 3,
      name: "Almond Milk 1L",
      description: "Best seller, restock recommended",
      status: "MEDIUM",
      bgColor: "bg-blue-50",
      borderColor: "border-l-4 border-l-blue-500",
      badgeBg: "bg-blue-100",
      badgeText: "text-blue-600",
      numberBg: "bg-blue-500",
      numberText: "text-white"
    }
  ];

  const stableDemandProducts = [
    { name: "Organic Coffee Beans 500g", status: "Avg: 5 units/day" },
    { name: "Organic Coffee Beans 500g", status: "Avg: 5 units/day" },
    { name: "Organic Coffee Beans 500g", status: "Avg: 5 units/day" },
    { name: "Organic Coffee Beans 500g", status: "Avg: 5 units/day" },
    { name: "Organic Coffee Beans 500g", status: "Avg: 5 units/day" }
  ];

  const stableDemandProductsRed = [
    { name: "Almond Milk 1L", status: "High variation in daily sales" },
    { name: "Almond Milk 1L", status: "High variation in daily sales" },
    { name: "Almond Milk 1L", status: "High variation in daily sales" }
  ];

  const { data: revenueTrends } = useQuery({
    queryKey: ['revenue-trends'],
    queryFn: AnalyticService.getRevenueTrends,
  })

  const { data: stableAndUnstable } = useQuery({
    queryKey: ['stable-and-unstable'],
    queryFn: AnalyticService.getStableAndUnstable,
  })

  return (
    <div className='mt-9 p-4 sm:p-6  lg:p-10 min-h-screen bg-gray-50'>
      {/* Header */}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Avg Daily Sales */}
        <div className="bg-white rounded-xl p-5 border border-gray-100">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp size={18} className="text-green-500" />
            <p className="text-sm text-gray-600">Avg Daily Sales</p>
          </div>
          <p className="text-3xl font-bold text-gray-900">123</p>
          <p className="text-xs text-green-600 mt-1">+5% from last week</p>
        </div>

        {/* Stable Product */}
        <div className="bg-white rounded-xl p-5 border border-gray-100">
          <div className="flex items-center gap-2 mb-2">
            <Package size={18} className="text-blue-500" />
            <p className="text-sm text-gray-600">Stable Product</p>
          </div>
          <p className="text-3xl font-bold text-gray-900">15</p>
          <p className="text-xs text-gray-500 mt-1">Low variability items</p>
        </div>

        {/* Avg Daily Sales (duplicate) */}
        <div className="bg-white rounded-xl p-5 border border-gray-100">
          <div className="flex items-center gap-2 mb-2">
            <BarChart3 size={18} className="text-purple-500" />
            <p className="text-sm text-gray-600">Avg Daily Sales</p>
          </div>
          <p className="text-3xl font-bold text-gray-900">3</p>
          <p className="text-xs text-gray-500 mt-1">Items requiring review</p>
        </div>

        {/* Stock Accuracy */}
        <div className="bg-white rounded-xl p-5 border border-gray-100">
          <div className="flex items-center gap-2 mb-2">
            <Activity size={18} className="text-indigo-500" />
            <p className="text-sm text-gray-600">Stock Accuracy</p>
          </div>
          <p className="text-3xl font-bold text-gray-900">94%</p>
          <p className="text-xs text-gray-500 mt-1">Based on predictions</p>
        </div>
      </div>

      {/* Priorities This Week */}
      <PriorityProducts />

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
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