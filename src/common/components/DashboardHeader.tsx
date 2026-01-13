"use client"

import React from 'react'
import { Bell, Lock, User, Zap } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import CardSubscribetionInfo from './CardSubscribetionInfo'
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger } from '../shadcn-ui/navigation-menu'

export function DashboardHeader() {
  const pathname = usePathname()
  const [locked, setLocked] = React.useState(false)
  const [showSubscriptionModal, setShowSubscriptionModal] = React.useState(false)

  const isActive = (path: string) => {
    if (path === "/dashboard") {
      return pathname === "/dashboard"
    }

    return pathname === path || pathname.startsWith(path + "/")
  }

  const navClass = (path: string) =>
    isActive(path)
      ? "text-sm text-blue-600 font-medium border-b-2 border-blue-600 pb-1"
      : "text-sm text-gray-600 hover:text-gray-900"

  const handleLockedClick = () => {
    if (!locked) {
      setShowSubscriptionModal(true)
    }
  }

  const navigationItem = [
    {
      name: 'Rekomendasi',
      href: '/dashboard/stock/recommendation',
      active: isActive('/dashboard/stock/recommendation'),
      description: 'Lihat rekomendasi untuk stok Anda',
    },
    {
      name: "Lihat Stock",
      href: '/dashboard/stock/view',
      active: isActive('/dashboard/stock/view'),
      description: 'Kelola dan pantau stok Anda',
    },
    {
      name: "Atur Stock",
      href: '/dashboard/stock/manage',
      active: isActive('/dashboard/stock/manage'),
      description: 'Atur stok dan preferensi Anda',
    }
  ]

  return (
    <>
      <header className="bg-white/95 sticky top-0 z-50 shadow-sm">
        <div className="flex items-center justify-between px-6 py-4">

          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 2h12v8H4V6z" />
              </svg>
            </div>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">Inventa</h1>
              <p className="text-xs text-gray-500">Recomendations</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex items-center gap-8">
            <Link href="/dashboard" className={navClass("/dashboard")}>Home</Link>
            <Link href="/dashboard/record-activity" className={navClass("/dashboard/record-activity")}>Record Activity</Link>
            <Link href="/dashboard/insight" className={navClass("/dashboard/insight")}>Insight</Link>

            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Stock</NavigationMenuTrigger>

                  <NavigationMenuContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 w-[400px]">
                      {navigationItem.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="block p-3 rounded-lg hover:bg-gray-50 transition"
                        >
                          <h3 className="text-sm font-medium text-gray-900">
                            {item.name}
                          </h3>
                          <p className="mt-1 text-xs text-gray-600">
                            {item.description}
                          </p>
                        </Link>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </nav>


          {/* Right */}
          <div className="flex items-center gap-4">

            {
              locked ? (
                <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 border border-green-200 rounded-md">
                  <Zap className="w-5 h-5 text-green-400" />
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium text-green-700">POS: Active</span>
                  <span className="text-xs text-green-600 bg-green-100 px-2 py-0.5 rounded">30 Day Left</span>
                </div>
              ) : (
                <button
                  onClick={handleLockedClick}
                  className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-md hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <Lock className="w-5 h-5 text-gray-400" />
                  <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                  <span className="text-sm font-medium text-gray-700">POS: Locked</span>
                </button>
              )
            }

            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <Bell className="w-5 h-5 text-gray-600" />
            </button>

            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <User className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </header>

      {/* Subscription Modal */}
      {showSubscriptionModal && (
        <CardSubscribetionInfo onClose={() => setShowSubscriptionModal(false)} />
      )}
    </>
  )
}
