'use client'

import { useState } from 'react'
import { BellIcon, PlusIcon } from '@heroicons/react/24/outline'

export default function Header() {
  const [activeTab, setActiveTab] = useState('All')

  const tabs = ['All', 'Auctions', 'BIN', 'salvage']

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Row */}
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="bg-primary-600 text-white font-bold text-2xl px-3 py-1.5 rounded">
                RB
              </div>
              <div className="bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-full animate-pulse">
                LIVE NOW!
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm">
              <span className="font-medium text-gray-700">Bids/VOL</span>
              <BellIcon className="h-5 w-5 text-gray-600" />
              <button className="p-1 hover:bg-gray-100 rounded">
                <PlusIcon className="h-5 w-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 border-t border-gray-100">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 text-sm font-medium transition-colors relative ${
                activeTab === tab
                  ? 'text-primary-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab}
              {activeTab === tab && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600" />
              )}
            </button>
          ))}
        </div>
      </div>
    </header>
  )
}
