'use client'

import { ChevronRightIcon } from '@heroicons/react/24/outline'

export default function UserSections() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Watchlist */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Watchlist</h3>
            <button className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center">
              SA
              <ChevronRightIcon className="h-4 w-4 ml-1" />
            </button>
          </div>
          <div className="bg-gray-50 rounded-lg h-48 flex items-center justify-center border-2 border-dashed border-gray-300">
            <p className="text-gray-400 text-sm">No items in watchlist</p>
          </div>
        </div>

        {/* Recent */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Recent</h3>
            <button className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center">
              SA
              <ChevronRightIcon className="h-4 w-4 ml-1" />
            </button>
          </div>
          <div className="bg-gray-50 rounded-lg h-48 flex items-center justify-center border-2 border-dashed border-gray-300">
            <p className="text-gray-400 text-sm">No recent items</p>
          </div>
        </div>
      </div>
    </div>
  )
}
