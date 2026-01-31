"use client"

import { Card } from "@/common/shadcn-ui/card"
import { Input } from "@/common/shadcn-ui/input"
import { Activity } from "@/common/response/activity"
import ActivityService from "@/services/ActivityService"
import { useQuery } from "@tanstack/react-query"
import { Search, Calendar, TrendingUp, TrendingDown, Package, Edit, PlusCircle } from "lucide-react"
import React from "react"

const activityConfig = {
  TRANSACTION_SALE: {
    icon: TrendingUp,
    color: "text-green-600",
    bgColor: "bg-green-100",
    label: "Sale Transaction"
  },
  TRANSACTION_PURCHASE: {
    icon: TrendingDown,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
    label: "Purchase Transaction"
  },
  STOCK_ADJUSTMENT: {
    icon: Package,
    color: "text-orange-600",
    bgColor: "bg-orange-100",
    label: "Stock Adjustment"
  },
  CREATE_PRODUCT: {
    icon: PlusCircle,
    color: "text-purple-600",
    bgColor: "bg-purple-100",
    label: "Create Product"
  },
  UPDATE_PRODUCT: {
    icon: Edit,
    color: "text-indigo-600",
    bgColor: "bg-indigo-100",
    label: "Update Product"
  }
}

export default function RecordActivityPage() {
  const [search, setSearch] = React.useState("")
  const [filterType, setFilterType] = React.useState<string>("ALL")

  const { data: activities, isLoading } = useQuery({
    queryKey: ['user-activities'],
    queryFn: () => ActivityService.getActivities(),
  })

  const filteredActivities = React.useMemo(() => {
    if (!activities) return []
    
    let filtered = activities

    // Filter by type
    if (filterType !== "ALL") {
      filtered = filtered.filter((activity: Activity) => activity.activity_type === filterType)
    }

    // Filter by search
    if (search) {
      filtered = filtered.filter((activity: Activity) => 
        activity.activity_text.toLowerCase().includes(search.toLowerCase())
      )
    }

    return filtered
  }, [activities, search, filterType])

  const activityStats = React.useMemo(() => {
    if (!activities) return {}
    
    return activities.reduce((acc: Record<string, number>, activity: Activity) => {
      acc[activity.activity_type] = (acc[activity.activity_type] || 0) + 1
      return acc
    }, {})
  }, [activities])

  return (
    <div className="p-4 sm:p-6 lg:p-10 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Activity Records</h1>
        <p className="text-gray-600">Track all your business activities and transactions</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
        {Object.entries(activityConfig).map(([type, config]) => {
          const Icon = config.icon
          const count = activityStats[type] || 0
          
          return (
            <Card 
              key={type}
              className={`p-4 cursor-pointer transition-all hover:shadow-lg ${
                filterType === type ? 'ring-2 ring-blue-500' : ''
              }`}
              onClick={() => setFilterType(filterType === type ? "ALL" : type)}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${config.bgColor}`}>
                  <Icon className={`w-5 h-5 ${config.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-500 truncate">{config.label}</p>
                  <p className="text-xl font-bold text-gray-900">{count}</p>
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <div className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
                placeholder="Search activities..."
              />
            </div>

            {/* Filter Type Dropdown */}
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="ALL">All Types</option>
              {Object.entries(activityConfig).map(([type, config]) => (
                <option key={type} value={type}>{config.label}</option>
              ))}
            </select>

            {/* Clear Filters */}
            {(search || filterType !== "ALL") && (
              <button
                onClick={() => {
                  setSearch("")
                  setFilterType("ALL")
                }}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>
      </Card>

      {/* Activity List */}
      <Card>
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Recent Activities
            </h2>
            <span className="text-sm text-gray-500">
              {filteredActivities.length} {filteredActivities.length === 1 ? 'activity' : 'activities'}
            </span>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : filteredActivities.length > 0 ? (
            <div className="space-y-3">
              {filteredActivities.map((activity: Activity) => {
                const config = activityConfig[activity.activity_type as keyof typeof activityConfig]
                const Icon = config?.icon || Calendar

                return (
                  <div
                    key={activity.id}
                    className="flex items-start gap-4 p-4 border-2 border-gray-100 rounded-xl hover:border-blue-200 hover:bg-blue-50/50 transition-all group"
                  >
                    {/* Icon */}
                    <div className={`flex-shrink-0 w-12 h-12 ${config?.bgColor || 'bg-gray-100'} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <Icon className={`w-6 h-6 ${config?.color || 'text-gray-600'}`} />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <p className="text-sm font-medium text-gray-900 leading-relaxed">
                          {activity.activity_text}
                        </p>
                        <span className={`flex-shrink-0 text-xs px-2 py-1 ${config?.bgColor || 'bg-gray-100'} ${config?.color || 'text-gray-600'} rounded-full font-medium`}>
                          {config?.label || activity.activity_type}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar size={14} />
                          <span>
                            {new Date(activity.created_at).toLocaleDateString('id-ID', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric'
                            })}
                          </span>
                        </div>
                        <span>•</span>
                        <span>
                          {new Date(activity.created_at).toLocaleTimeString('id-ID', {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-500 font-medium mb-1">No activities found</p>
              <p className="text-sm text-gray-400">
                {search || filterType !== "ALL" 
                  ? "Try adjusting your filters" 
                  : "Your activities will appear here"}
              </p>
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}