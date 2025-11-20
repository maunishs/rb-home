'use client'

import { ChevronRightIcon } from '@heroicons/react/24/outline'

export default function Filters() {
  return (
    <div className="bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-4">
          {/* Near You */}
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-600">Near you:</span>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-orange-50 hover:border-orange-300 hover:text-orange-700 transition-colors">
                &lt;50
              </button>
              <button className="px-3 py-1.5 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-orange-50 hover:border-orange-300 hover:text-orange-700 transition-colors">
                &lt;100
              </button>
              <button className="px-3 py-1.5 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-orange-50 hover:border-orange-300 hover:text-orange-700 transition-colors">
                &lt;500
              </button>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-600">Price:</span>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-orange-50 hover:border-orange-300 hover:text-orange-700 transition-colors">
                &lt;50k
              </button>
              <button className="px-3 py-1.5 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-orange-50 hover:border-orange-300 hover:text-orange-700 transition-colors">
                &lt;100k
              </button>
            </div>
          </div>

          {/* Deal of the Day */}
          <button className="px-4 py-1.5 bg-orange-500 text-white rounded-lg text-sm font-medium hover:bg-orange-600 transition-colors flex items-center space-x-1">
            <span>Deal of the day</span>
            <ChevronRightIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
