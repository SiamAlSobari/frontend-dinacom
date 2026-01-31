"use client"

import React from 'react';
import { AlertTriangle, Info, CheckCircle, Clock } from 'lucide-react';
import { Card } from '@/common/shadcn-ui/card';
import { Button } from '@/common/shadcn-ui/button';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import AiService from '@/services/AiService';
import { AiRecommendations } from '@/common/response/ai';
import toast from 'react-hot-toast';

interface AiRecommendation {
  id: string;
  ai_run_id: string;
  product_id: string;
  current_stock: number;
  recommended_action: 'RESTOCK' | 'WAIT' | 'REDUCE';
  quantity_min: number;
  quantity_max: number;
  risk_level: 'HIGH' | 'MEDIUM' | 'LOW';
  days_until_stockout: number;
  reason_text: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  product?: {
    name: string;
    unit: string;
  };
}

export default function RecommendationPage() {
  const [activeTab, setActiveTab] = React.useState<'all' | 'urgent' | 'medium' | 'low'>('all');
  const queryClient = useQueryClient();

  const { data: recommendationAiData, isLoading } = useQuery({
    queryKey: ['ai_recommendations'],
    queryFn: () => AiService.generateAiRecommendations(),
  });

  const { mutateAsync: applyRecommendation, isPending } = useMutation({
    mutationFn: AiService.applyRecommendation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ai_recommendations'] });
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });

  const filteredRecommendations = recommendationAiData?.filter((rec: AiRecommendations) => {
    if (activeTab === 'urgent') return rec.risk_level === 'HIGH';
    if (activeTab === 'medium') return rec.risk_level === 'MEDIUM';
    if (activeTab === 'low') return rec.risk_level === 'LOW';
    return true;
  }) || [];

  const getPriorityColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'HIGH':
        return 'bg-red-600';
      case 'MEDIUM':
        return 'bg-yellow-600';
      case 'LOW':
        return 'bg-green-600';
      default:
        return 'bg-gray-600';
    }
  };

  const getCardBorderColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'HIGH':
        return 'border-red-300 bg-red-50';
      case 'MEDIUM':
        return 'border-yellow-300 bg-yellow-50';
      case 'LOW':
        return 'border-green-300 bg-green-50';
      default:
        return 'border-gray-300 bg-gray-50';
    }
  };

  const getRecommendedQuantity = (rec: AiRecommendation) => {
    if (rec.recommended_action === 'RESTOCK') {
      return `${rec.quantity_min} - ${rec.quantity_max}`;
    }
    if (rec.recommended_action === 'REDUCE') {
      return `Reduce by ${rec.quantity_max}`;
    }
    return 'Maintain current stock';
  };

  const handleApplyRecommendation = async (recommendationId: string, productName: string) => {
    toast.promise(
      applyRecommendation(recommendationId),
      {
        loading: `Applying recommendation for ${productName}...`,
        success: () => {
          return `✅ Stock updated  units`;
        },
        // error: (err) => 
        //   err?.response?.data?.message || 'Failed to apply recommendation ❌',
      }
    );
  };

  return (
    <div className='mt-9 p-4 sm:p-6 lg:p-10 min-h-screen bg-gray-50'>
      {/* Info Banner */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl p-6 mb-6 text-white">
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
          All ({recommendationAiData?.length || 0})
        </button>
        <button
          onClick={() => setActiveTab('urgent')}
          className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
            activeTab === 'urgent'
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
          }`}
        >
          Urgent ({recommendationAiData?.filter((r: AiRecommendations) => r.risk_level === 'HIGH').length || 0})
        </button>
        <button
          onClick={() => setActiveTab('medium')}
          className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
            activeTab === 'medium'
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
          }`}
        >
          Medium ({recommendationAiData?.filter((r: AiRecommendations) => r.risk_level === 'MEDIUM').length || 0})
        </button>
        <button
          onClick={() => setActiveTab('low')}
          className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
            activeTab === 'low'
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
          }`}
        >
          Low ({recommendationAiData?.filter((r: AiRecommendations) => r.risk_level === 'LOW').length || 0})
        </button>
      </div>

      {/* Info Message */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 flex items-start gap-3">
        <Info size={18} className="text-blue-600 shrink-0 mt-0.5" />
        <p className="text-sm text-blue-800">
          Click "Apply" to automatically adjust stock based on AI recommendations. The action will update inventory and mark the recommendation as complete.
        </p>
      </div>

      {/* Loading State */}
      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : filteredRecommendations.length === 0 ? (
        <Card className="p-12 text-center">
          <p className="text-gray-500">No recommendations available at this time.</p>
        </Card>
      ) : (
        /* Recommendations List */
        <div className="space-y-4">
          {filteredRecommendations.map((rec: AiRecommendations) => (
            <Card key={rec.id} className={`${getCardBorderColor(rec.risk_level)} border-2 rounded-xl overflow-hidden`}>
              <div className="p-5">
                {/* Header */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-semibold text-gray-900">
                      {rec.product?.name || `Product ${rec.product_id.slice(0, 8)}`}
                    </h3>
                    <span className={`${getPriorityColor(rec.risk_level)} text-white text-xs font-bold px-2.5 py-1 rounded`}>
                      {rec.risk_level}
                    </span>
                    <span className={`${rec.recommended_action === 'RESTOCK' ? 'bg-red-600' : rec.recommended_action === 'WAIT' ? 'bg-green-600' : 'bg-yellow-600'} text-white text-xs font-bold px-2.5 py-1 rounded`}>
                      {rec.recommended_action}
                    </span>
                  </div>
                </div>

                {/* Stock Info */}
                <div className="text-sm text-gray-700 mb-4">
                  <span>Current: <strong className="text-gray-900">{rec.current_stock} {rec.product?.unit || 'units'}</strong></span>
                  <span className="mx-2">•</span>
                  <span>Range: <strong className="text-gray-900">{rec.quantity_min} - {rec.quantity_max} units</strong></span>
                  {rec.days_until_stockout > 0 && (
                    <>
                      <span className="mx-2">•</span>
                      <span>Stockout in: <strong className="text-red-600">{rec.days_until_stockout} days</strong></span>
                    </>
                  )}
                </div>

                {/* Recommendation Box */}
                <div className="bg-white rounded-lg p-4 mb-4 border border-gray-200">
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-sm text-gray-600">Recommended quantity:</span>
                    <span className="text-lg font-bold text-blue-600">{getRecommendedQuantity(rec)}</span>
                    <span className="text-sm text-gray-600">{rec.product?.unit || 'units'}</span>
                  </div>
                  <div className="text-xs text-gray-700">
                    <span className="font-semibold">Reason:</span> {rec.reason_text}
                  </div>
                </div>

                {/* Timestamp */}
                <div className="text-xs text-gray-500 mb-4">
                  Updated: {new Date(rec.updated_at).toLocaleString('id-ID')}
                </div>

                {/* Actions */}
                {rec.recommended_action !== 'WAIT' && (
                  <div className="flex gap-3">
                    <Button 
                      onClick={() => handleApplyRecommendation(rec.id, rec.product?.name || 'Product')}
                      disabled={isPending}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium h-10 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <CheckCircle size={16} className="mr-2" />
                      {isPending ? 'Applying...' : 'Apply Recommendation'}
                    </Button>
                  </div>
                )}

                {rec.recommended_action === 'WAIT' && (
                  <div className="bg-green-100 border border-green-300 rounded-lg p-3 text-center">
                    <p className="text-sm text-green-800 font-medium">✓ Stock is optimal - No action needed</p>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Footer Note */}
      <div className="mt-6 text-center">
        <p className="text-xs text-gray-500">
          Recommendations are updated daily based on the latest sales data.
        </p>
      </div>
    </div>
  );
}