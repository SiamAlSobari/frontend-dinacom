"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/common/shadcn-ui/card";
import { Brain, AlertTriangle, Info, CheckCircle, TrendingUp } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import AiService from "@/services/AiService";

export function AiInsightsSummary() {
  const { data: insightsData, isLoading } = useQuery({
    queryKey: ['ai_insights'],
    queryFn: () => AiService.getAiInsights(),
  });

  if (isLoading) {
    return (
      <div className="mb-6">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-blue-50">
          <CardContent className="p-8">
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!insightsData) {
    return (
      <div className="mb-6">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-gray-50 to-gray-100">
          <CardContent className="p-8">
            <div className="text-center">
              <Brain className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 font-medium">No AI insights available yet</p>
              <p className="text-sm text-gray-500 mt-2">Run AI analysis to get insights</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="mb-6 space-y-4">
      {/* Main Summary Card */}
      <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-600 via-purple-700 to-blue-700 text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-5 rounded-full -ml-24 -mb-24"></div>
        
        <CardHeader className="relative z-10">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-xl font-bold">AI-Powered Business Insights</CardTitle>
              <p className="text-purple-100 text-sm mt-1">
                Last updated: {new Date(insightsData.updated_at).toLocaleDateString('id-ID', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="relative z-10 pb-6">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-5 border border-white/20">
            <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Pattern & Trend Summary
            </h3>
            <p className="text-purple-50 leading-relaxed text-sm">
              {insightsData.pattern_trend_summary}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Action Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Urgent Actions */}
        <Card className="border-2 border-red-200 bg-red-50 hover:shadow-lg transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <div className="bg-red-500 p-2 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-white" />
              </div>
              <CardTitle className="text-base font-semibold text-red-900">
                Urgent Actions
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-red-800 leading-relaxed">
              {insightsData.urgent}
            </p>
          </CardContent>
        </Card>

        {/* Medium Priority */}
        <Card className="border-2 border-yellow-200 bg-yellow-50 hover:shadow-lg transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <div className="bg-yellow-500 p-2 rounded-lg">
                <Info className="w-5 h-5 text-white" />
              </div>
              <CardTitle className="text-base font-semibold text-yellow-900">
                Medium Priority
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-yellow-800 leading-relaxed">
              {insightsData.medium}
            </p>
          </CardContent>
        </Card>

        {/* Low Priority */}
        <Card className="border-2 border-green-200 bg-green-50 hover:shadow-lg transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <div className="bg-green-500 p-2 rounded-lg">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
              <CardTitle className="text-base font-semibold text-green-900">
                Low Priority
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-green-800 leading-relaxed">
              {insightsData.low}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}