"use client"

import React from 'react';
import { ArrowLeft, AlertTriangle, Info, CheckCircle, Clock } from 'lucide-react';
import { Card } from '@/common/shadcn-ui/card';
import { Button } from '@/common/shadcn-ui/button';

export default function RecommendationPage() {
  const [activeTab, setActiveTab] = React.useState<'all' | 'urgent' | 'moderate'>('all');

  const recommendations = [
    {
      id: 1,
      product: "Dark Chocolate Bar 100g",
      priority: "HIGH RISK",
      priorityColor: "bg-red-600",
      isNew: true,
      currentStock: 2,
      baseStock: 50,
      action: "Restock",
      recommendedQuantity: 80,
      reason: "Recent sales trend + low incoming purchase orders. Average daily sales: 6 units.",
      confidence: 94,
      confidenceColor: "bg-green-600"
    },
    {
      id: 2,
      product: "Greek Yogurt 500g",
      priority: "HIGH RISK",
      priorityColor: "bg-red-600",
      isNew: false,
      currentStock: 23,
      baseStock: 100,
      action: "Restock",
      recommendedQuantity: 50,
      reason: "Inventory expected to be depleted soon. Average daily sales: 5.5 units.",
      confidence: 89,
      confidenceColor: "bg-green-600"
    },
    {
      id: 3,
      product: "Avocado (Large)",
      priority: "MODERATE",
      priorityColor: "bg-amber-500",
      isNew: false,
      currentStock: 56,
      baseStock: 120,
      action: "Monitor",
      recommendedQuantity: 40,
      reason: "Stock level declining steadily. Average daily sales: 7.8 units.",
      confidence: 76,
      confidenceColor: "bg-green-600"
    },
    {
      id: 4,
      product: "Olive Oil 750ml",
      priority: "LOW",
      priorityColor: "bg-blue-600",
      isNew: false,
      currentStock: 89,
      baseStock: 100,
      action: "Monitor",
      recommendedQuantity: 30,
      reason: "Stock level is sufficient. Average daily sales: 3.2 units.",
      confidence: 82,
      confidenceColor: "bg-green-600"
    }
  ];

  const filteredRecommendations = recommendations.filter(rec => {
    if (activeTab === 'urgent') return rec.priority === 'HIGH RISK';
    if (activeTab === 'moderate') return rec.priority === 'MODERATE';
    return true;
  });


  return (
    <div className="p-4 sm:p-6 lg:p-10 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button>
          <ArrowLeft className="text-gray-600" size={24} />
        </button>
        <div className="flex flex-col">
          <h1 className="text-xl font-semibold text-gray-900">Restock Alerts</h1>
        </div>
      </div>

      {/* Info Banner */}
      <div className="bg-linear-to-r from-purple-600 to-purple-700 rounded-xl p-6 mb-6 text-white">
        <div className="flex items-start gap-3">
          <AlertTriangle size={24} className="shrink-0 mt-0.5" />
          <div>
            <h2 className="font-semibold text-lg mb-2">AI-based Insights</h2>
            <p className="text-sm text-purple-100 leading-relaxed">
              These recommendations are generated using machine learning models that analyze your sales patterns, 
              seasonal trends, and current inventory levels. Each suggestion is tailored to help you maintain 
              optimal stock and minimize waste.
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
            activeTab === 'all'
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
          }`}
        >
          All
        </button>
        <button
          onClick={() => setActiveTab('urgent')}
          className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
            activeTab === 'urgent'
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
          }`}
        >
          Urgent
        </button>
        <button
          onClick={() => setActiveTab('moderate')}
          className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
            activeTab === 'moderate'
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
          }`}
        >
          Moderate
        </button>
      </div>

      {/* Info Message */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 flex items-start gap-3">
        <Info size={18} className="text-blue-600 shrink-0 mt-0.5" />
        <p className="text-sm text-blue-800">
          If you need to adjust suggested quantities, you can do so in the stock management section.
        </p>
      </div>

      {/* Recommendations List */}
      <div className="space-y-4">
        {filteredRecommendations.map((rec) => (
          <Card key={rec.id} className="bg-red-50 border-2 border-red-300 rounded-xl overflow-hidden">
            <div className="p-5">
              {/* Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-semibold text-gray-900">{rec.product}</h3>
                  <span className={`${rec.priorityColor} text-white text-xs font-bold px-2.5 py-1 rounded`}>
                    {rec.priority}
                  </span>
                  {rec.isNew && (
                    <span className="bg-blue-600 text-white text-xs font-bold px-2.5 py-1 rounded">
                      New
                    </span>
                  )}
                </div>
              </div>

              {/* Stock Info */}
              <div className="text-sm text-gray-700 mb-4">
                <span>Current: <strong className="text-gray-900">{rec.currentStock} units</strong></span>
                <span className="mx-2">•</span>
                <span>Base: <strong className="text-gray-900">{rec.baseStock} units</strong></span>
                <span className="mx-2">•</span>
                <span>Action: <strong className="text-red-600">{rec.action}</strong></span>
              </div>

              {/* Recommendation Box */}
              <div className="bg-gray-50 rounded-lg p-4 mb-4 border border-gray-200">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-sm text-gray-600">Recommended quantity:</span>
                  <span className="text-lg font-bold text-blue-600">{rec.recommendedQuantity}</span>
                  <span className="text-sm text-gray-600">units</span>
                </div>
                <div className="text-xs text-gray-700">
                  <span className="font-semibold">Reason:</span> {rec.reason} <span className="font-semibold">Confidence: {rec.confidence}%</span>
                </div>
              </div>

              {/* Confidence Bar */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium text-gray-700">Confidence Score</span>
                  <span className="text-xs font-bold text-gray-900">{rec.confidence}%</span>
                </div>
                <div className="w-full bg-gray-300 rounded-full h-2 overflow-hidden">
                  <div 
                    className={`h-2 ${rec.confidenceColor} transition-all duration-300`}
                    style={{ width: `${rec.confidence}%` }}
                  ></div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <Button className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium h-10 rounded-lg">
                  <CheckCircle size={16} className="mr-2" />
                  Done
                </Button>
                <Button className="flex-1 bg-gray-700 hover:bg-gray-800 text-white font-medium h-10 rounded-lg">
                  <Clock size={16} className="mr-2" />
                  Postpone
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Footer Note */}
      <div className="mt-6 text-center">
        <p className="text-xs text-gray-500">
          Recommendations are updated daily based on the latest sales data.
        </p>
      </div>
    </div>
  );
}