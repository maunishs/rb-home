'use client'

import { ClockIcon, MapPinIcon, ChevronRightIcon } from '@heroicons/react/24/outline'

interface Item {
  id: string
  title: string
  image: string
  price?: string
  timeRemaining?: string
  distance?: string
}

interface ScrollableModuleProps {
  title: string
  items: Item[]
  showTimer?: boolean
  showDistance?: boolean
  showPrice?: boolean
}

const ScrollableModule = ({
  title,
  items,
  showTimer = false,
  showDistance = false,
  showPrice = false,
}: ScrollableModuleProps) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-lg p-4 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold text-gray-900">{title}</h3>
        <button className="text-sm text-orange-600 hover:text-orange-700 font-medium flex items-center space-x-1">
          <span>See all</span>
          <ChevronRightIcon className="h-4 w-4" />
        </button>
      </div>
      
      {/* List View */}
      <div className="flex-1 overflow-y-auto hide-scrollbar space-y-2">
        {items.map((item) => (
          <button
            key={item.id}
            className="w-full flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:border-orange-400 hover:bg-orange-50 transition-all group text-left"
          >
            {/* Thumbnail Image */}
            <div className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden bg-orange-100">
            </div>
            
            {/* Item Info */}
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold text-gray-900 mb-1 line-clamp-1 group-hover:text-orange-700">
                {item.title}
              </h4>
              
              <div className="flex items-center space-x-3 flex-wrap gap-y-1">
                {/* Timer Badge */}
                {showTimer && item.timeRemaining && (
                  <div className="flex items-center space-x-1">
                    <ClockIcon className="h-3.5 w-3.5 text-red-500" />
                    <span className="text-xs font-medium text-gray-700">
                      {item.timeRemaining}
                    </span>
                  </div>
                )}
                
                {/* Distance Badge */}
                {showDistance && item.distance && (
                  <div className="flex items-center space-x-1">
                    <MapPinIcon className="h-3.5 w-3.5 text-blue-500" />
                    <span className="text-xs font-medium text-gray-700">
                      {item.distance}
                    </span>
                  </div>
                )}
                
                {/* Price */}
                {showPrice && item.price && (
                  <span className="text-xs font-semibold text-gray-900">
                    {item.price}
                  </span>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

export default function QuickBrowseModules() {
  // Heavy machinery images
  const machineryImages = [
    'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1581091870623-1d2c5a0b2a5b?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=300&fit=crop&q=80',
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop&q=80',
  ]

  // Closing Today items
  const closingTodayItems: Item[] = [
    {
      id: '1',
      title: 'Excavator 2020',
      image: machineryImages[0],
      price: '$45,000',
      timeRemaining: '2h 15m',
    },
    {
      id: '2',
      title: 'Bulldozer 2019',
      image: machineryImages[1],
      price: '$78,500',
      timeRemaining: '3h 30m',
    },
    {
      id: '3',
      title: 'Loader 2021',
      image: machineryImages[2],
      price: '$65,000',
      timeRemaining: '5h 45m',
    },
    {
      id: '4',
      title: 'Crane 2018',
      image: machineryImages[3],
      price: '$95,000',
      timeRemaining: '1h 20m',
    },
    {
      id: '5',
      title: 'Dump Truck 2020',
      image: machineryImages[4],
      price: '$52,000',
      timeRemaining: '4h 10m',
    },
    {
      id: '6',
      title: 'Skid Steer 2021',
      image: machineryImages[5],
      price: '$38,000',
      timeRemaining: '6h 5m',
    },
  ]

  // Closest to Me items
  const closestItems: Item[] = [
    {
      id: '1',
      title: 'Excavator 2020',
      image: machineryImages[1],
      price: '$45,000',
      distance: '12 miles',
    },
    {
      id: '2',
      title: 'Bulldozer 2019',
      image: machineryImages[2],
      price: '$78,500',
      distance: '25 miles',
    },
    {
      id: '3',
      title: 'Loader 2021',
      image: machineryImages[3],
      price: '$65,000',
      distance: '8 miles',
    },
    {
      id: '4',
      title: 'Crane 2018',
      image: machineryImages[4],
      price: '$95,000',
      distance: '45 miles',
    },
    {
      id: '5',
      title: 'Dump Truck 2020',
      image: machineryImages[5],
      price: '$52,000',
      distance: '18 miles',
    },
    {
      id: '6',
      title: 'Skid Steer 2021',
      image: machineryImages[0],
      price: '$38,000',
      distance: '32 miles',
    },
  ]

  // Under $50k items
  const under50kItems: Item[] = [
    {
      id: '1',
      title: 'Excavator 2018',
      image: machineryImages[2],
      price: '$42,000',
    },
    {
      id: '2',
      title: 'Skid Steer 2020',
      image: machineryImages[3],
      price: '$38,500',
    },
    {
      id: '3',
      title: 'Loader 2019',
      image: machineryImages[4],
      price: '$45,000',
    },
    {
      id: '4',
      title: 'Backhoe 2017',
      image: machineryImages[5],
      price: '$35,000',
    },
    {
      id: '5',
      title: 'Forklift 2020',
      image: machineryImages[0],
      price: '$28,000',
    },
    {
      id: '6',
      title: 'Compactor 2019',
      image: machineryImages[1],
      price: '$32,000',
    },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Closing Today Module */}
        <div className="h-[300px]">
          <ScrollableModule
            title="Closing Today"
            items={closingTodayItems}
            showTimer={true}
            showPrice={true}
          />
        </div>

        {/* Closest to Me Module */}
        <div className="h-[300px]">
          <ScrollableModule
            title="Closest to Me (&lt;250 miles)"
            items={closestItems}
            showDistance={true}
            showPrice={true}
          />
        </div>

        {/* Under $50k Module */}
        <div className="h-[300px]">
          <ScrollableModule
            title="&lt;$50k Items"
            items={under50kItems}
            showPrice={true}
          />
        </div>
      </div>
    </div>
  )
}
