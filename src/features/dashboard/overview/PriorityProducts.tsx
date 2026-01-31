"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/common/shadcn-ui/card";
import { AlertTriangle, TrendingUp, Package } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import AiService from "@/services/AiService";
import { PriorityAction } from "@/common/response/ai";
import { useRouter } from "next/navigation";

export function PriorityProducts() {
    const router = useRouter();
  const { data: priorityData, isLoading } = useQuery({
    queryKey: ['priority_actions'],
    queryFn: () => AiService.getPriorityActions(),
  });

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'HIGH':
        return 'text-red-600 bg-red-50';
      case 'MEDIUM':
        return 'text-yellow-600 bg-yellow-50';
      case 'LOW':
        return 'text-green-600 bg-green-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getRiskIcon = (riskLevel: string) => {
    switch (riskLevel) {
      case 'HIGH':
        return <AlertTriangle className="w-4 h-4" />;
      case 'MEDIUM':
        return <TrendingUp className="w-4 h-4" />;
      case 'LOW':
        return <Package className="w-4 h-4" />;
      default:
        return <Package className="w-4 h-4" />;
    }
  };

  const getPriorityBarColor = (score: number) => {
    if (score >= 30) return 'bg-red-500';
    if (score >= 20) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  if (isLoading) {
    return (
      <Card className="border-0 shadow-sm">
        <CardHeader className="border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
          <CardTitle className="text-base font-semibold text-gray-900 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-orange-500" />
            Priority Actions
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const priorities = priorityData || [];

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
        <CardTitle className="text-base font-semibold text-gray-900 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-orange-500" />
          Priority Actions
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          {priorities.length === 0 ? (
            <div className="text-center py-8">
              <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-sm text-gray-500">No priority actions at this time</p>
            </div>
          ) : (
            priorities.map((item: PriorityAction, index: number) => (
              <div
                key={index}
                className="group p-4 rounded-lg border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all duration-200 bg-white"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-gray-900 text-sm">
                        {item.product_name}
                      </h4>
                      <span className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${getRiskColor(item.risk_level)}`}>
                        {getRiskIcon(item.risk_level)}
                        {item.risk_level}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">
                      Recommended: <span className="font-semibold text-gray-700">{item.recommended_qty}</span>
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-gray-900">
                      {item.priority_score}
                    </div>
                    <div className="text-xs text-gray-500">Priority</div>
                  </div>
                </div>

                {/* Priority Score Bar */}
                <div className="mb-2">
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${getPriorityBarColor(item.priority_score)} transition-all duration-300`}
                      style={{ width: `${Math.min(item.priority_score, 100)}%` }}
                    ></div>
                  </div>
                </div>

                {/* Days Left Info */}
                {item.days_left !== null && item.days_left > 0 && (
                  <div className="flex items-center gap-1.5 text-xs">
                    <AlertTriangle className="w-3.5 h-3.5 text-red-500" />
                    <span className="text-red-600 font-medium">
                      Stock out in {item.days_left} {item.days_left === 1 ? 'day' : 'days'}
                    </span>
                  </div>
                )}

                {(item.days_left === null || item.days_left === 0) && item.risk_level === 'LOW' && (
                  <div className="flex items-center gap-1.5 text-xs">
                    <Package className="w-3.5 h-3.5 text-green-500" />
                    <span className="text-green-600 font-medium">
                      Stock level optimal
                    </span>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {priorities.length > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <button onClick={()=> router.push('/dashboard/stock/recommendation')} className="w-full text-center text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors">
              View All Priority Actions →
            </button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}