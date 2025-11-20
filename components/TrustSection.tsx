'use client'

import {
  ShieldCheckIcon,
  CheckBadgeIcon,
  StarIcon,
} from '@heroicons/react/24/outline'

export default function TrustSection() {
  const trustPoints = [
    {
      icon: ShieldCheckIcon,
      text: 'Verified Equipment',
      color: 'text-green-600',
    },
    {
      icon: CheckBadgeIcon,
      text: 'Buyer Protection',
      color: 'text-blue-600',
    },
    {
      icon: StarIcon,
      text: '5-Star Rated',
      color: 'text-orange-600',
    },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-gradient-to-br from-orange-50 via-orange-100/50 to-orange-50 rounded-lg border border-orange-200 shadow-md p-2.5 md:p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 flex-1">
            <div className="text-left">
              <h2 className="text-sm md:text-base font-bold text-gray-900 leading-tight">
                Why <span className="text-orange-600">Ritchie Bros</span>?
              </h2>
              <p className="text-xs md:text-sm font-bold text-gray-900 leading-tight">
                Trusted by <span className="text-orange-600 text-base md:text-lg">100M+</span> users
              </p>
            </div>
          </div>

          {/* Trust Points - Horizontal */}
          <div className="flex items-center space-x-3 md:space-x-4">
            {trustPoints.map((point, index) => {
              const Icon = point.icon
              return (
                <div
                  key={index}
                  className="flex items-center space-x-1.5 bg-white/80 backdrop-blur-sm rounded-lg px-2 py-1.5 border border-orange-200 shadow-sm"
                >
                  <Icon className={`h-4 w-4 ${point.color}`} strokeWidth={2} />
                  <p className="text-xs font-semibold text-gray-900 whitespace-nowrap">
                    {point.text}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
