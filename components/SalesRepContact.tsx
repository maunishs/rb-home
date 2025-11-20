'use client'

import { PhoneIcon, EnvelopeIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline'

export default function SalesRepContact() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-lg p-5 h-56 md:h-[300px] flex flex-col w-full">
      <div className="flex-1 flex flex-col min-h-0">
        <h3 className="text-base font-semibold text-gray-900 mb-3">
          Contact Your Sales Rep
        </h3>
        
        {/* Sales Rep Info */}
        <div className="mb-3 flex-1 flex flex-col">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-orange-200 flex-shrink-0">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
                alt="John Davis"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="font-semibold text-gray-900 text-sm">John Davis</p>
              <p className="text-xs text-gray-600">Senior Sales Representative</p>
            </div>
          </div>
          
          <div className="space-y-2 flex-1">
            <button className="w-full flex items-center space-x-2 px-3 py-2 bg-orange-50 hover:bg-orange-100 border border-orange-200 rounded-lg transition-colors group">
              <PhoneIcon className="h-4 w-4 text-orange-600 group-hover:text-orange-700 flex-shrink-0" />
              <span className="text-xs font-medium text-gray-900">1-800-555-0123</span>
            </button>
            
            <button className="w-full flex items-center space-x-2 px-3 py-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors group">
              <EnvelopeIcon className="h-4 w-4 text-gray-600 group-hover:text-gray-700 flex-shrink-0" />
              <span className="text-xs font-medium text-gray-900 truncate">john.davis@ritchiebros.com</span>
            </button>
            
            <button className="w-full flex items-center space-x-2 px-3 py-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors group">
              <ChatBubbleLeftRightIcon className="h-4 w-4 text-gray-600 group-hover:text-gray-700 flex-shrink-0" />
              <span className="text-xs font-medium text-gray-900">Live Chat</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
