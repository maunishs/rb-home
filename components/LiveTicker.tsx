'use client'

import { ClockIcon } from '@heroicons/react/24/outline'

interface TickerItem {
  id: string
  text: string
  time: string
}

const tickerItems: TickerItem[] = [
  { id: '1', text: 'Auction #12345 - Heavy Equipment', time: '2 min' },
  { id: '2', text: 'Auction #12346 - Construction Vehicles', time: '5 min' },
  { id: '3', text: 'Auction #12347 - Industrial Machinery', time: '8 min' },
  { id: '4', text: 'Auction #12348 - Fleet Vehicles', time: '12 min' },
  { id: '5', text: 'Auction #12349 - Excavators & Loaders', time: '15 min' },
  { id: '6', text: 'Auction #12350 - Mining Equipment', time: '18 min' },
  { id: '7', text: 'Auction #12351 - Agricultural Machinery', time: '22 min' },
]

export default function LiveTicker() {
  // Duplicate items for seamless loop
  const duplicatedItems = [...tickerItems, ...tickerItems]

  return (
    <div className="bg-orange-600 text-white py-2 px-4 relative overflow-hidden">
      <div className="max-w-7xl mx-auto flex items-center space-x-4">
        <div className="flex items-center space-x-2 flex-shrink-0 z-10 bg-orange-600">
          <ClockIcon className="h-4 w-4 animate-pulse" />
          <span className="text-sm font-semibold whitespace-nowrap">
            Closing Now:
          </span>
        </div>
        <div className="flex-1 overflow-hidden">
          <div className="flex animate-ticker-scroll">
            {duplicatedItems.map((item, index) => (
              <div
                key={`${item.id}-${index}`}
                className="flex items-center space-x-3 min-w-max mr-8"
              >
                <span className="text-sm whitespace-nowrap">{item.text}</span>
                <span className="text-xs bg-white/20 px-2 py-0.5 rounded whitespace-nowrap">
                  {item.time}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
