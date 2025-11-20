'use client'

import { useState } from 'react'
import {
  ChevronRightIcon,
  ClockIcon,
  HeartIcon,
} from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid'

interface Item {
  id: string
  title: string
  price: string
  closingDate?: string
  image: string
  isWatched?: boolean
}

interface GridItemCardsProps {
  title: string
  items: Item[]
  showClosingDate?: boolean
  heartColor?: 'white' | 'black'
}

const GridItemCards = ({
  title,
  items,
  showClosingDate = false,
  heartColor = 'white',
}: GridItemCardsProps) => {
  const [watchedItems, setWatchedItems] = useState<Set<string>>(
    new Set(items.filter((item) => item.isWatched).map((item) => item.id))
  )

  const toggleWatch = (itemId: string) => {
    setWatchedItems((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(itemId)) {
        newSet.delete(itemId)
      } else {
        newSet.add(itemId)
      }
      return newSet
    })
  }

  // Show first 4 items in a 2x2 grid
  const displayedItems = items.slice(0, 4)

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-lg p-4 h-full flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xl font-bold text-gray-900">{title}</h3>
        <button className="text-sm text-gray-900 hover:text-gray-700 font-medium flex items-center space-x-1">
          <span>See all</span>
          <ChevronRightIcon className="h-4 w-4" />
        </button>
      </div>

      {/* 2x2 Grid */}
      <div className="grid grid-cols-2 gap-2.5 flex-1 min-h-0">
        {displayedItems.map((item) => {
          const isWatched = watchedItems.has(item.id)
          return (
            <div
              key={item.id}
              className="group/item cursor-pointer relative min-w-0"
            >
              <div className="bg-white border border-gray-200 rounded-md overflow-hidden shadow-sm hover:shadow-md transition-all h-full flex flex-col">
                {/* Image with Heart Icon */}
                <div className="relative aspect-square bg-orange-100 overflow-hidden flex-shrink-0">
                  {/* Heart Icon */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleWatch(item.id)
                    }}
                    className={`absolute top-1.5 right-1.5 z-10 p-1 rounded-full ${
                      heartColor === 'white'
                        ? 'bg-white/90 hover:bg-white'
                        : 'bg-black/10 hover:bg-black/20'
                    } shadow-sm transition-all`}
                    aria-label={isWatched ? 'Remove from watchlist' : 'Add to watchlist'}
                  >
                    {isWatched ? (
                      <HeartSolidIcon className={`h-3.5 w-3.5 ${
                        heartColor === 'white' ? 'text-red-500' : 'text-black'
                      }`} />
                    ) : (
                      <HeartIcon className={`h-3.5 w-3.5 ${
                        heartColor === 'white' ? 'text-gray-600' : 'text-black'
                      }`} />
                    )}
                  </button>
                </div>

                {/* Content */}
                <div className="p-2.5 flex flex-col flex-1 justify-between min-h-0">
                  <h4 className="text-sm font-semibold text-gray-900 mb-1.5 line-clamp-2 leading-snug">
                    {item.title}
                  </h4>
                  
                  <div className="mt-auto">
                    {/* Price */}
                    <p className="text-base font-bold text-gray-900 mb-0.5">
                      {item.price}
                    </p>

                    {/* Closing Date */}
                    {showClosingDate && item.closingDate && (
                      <div className="flex items-center space-x-1 text-xs text-gray-600">
                        <ClockIcon className="h-3.5 w-3.5 flex-shrink-0" />
                        <span className="leading-tight">Closes {item.closingDate}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

const MarketingBanner = () => {
  return (
    <div className="bg-gradient-to-br from-amber-900 to-amber-800 rounded-lg border border-amber-700 shadow-lg p-5 h-full flex flex-col justify-between relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full -ml-24 -mb-24"></div>
      </div>

      <div className="relative z-10 flex flex-col flex-1 justify-between">
        {/* Content */}
        <div>
          <h3 className="text-2xl font-bold text-white mb-2">
            New Equipment Drop
          </h3>
          <p className="text-white/90 text-sm mb-6">
            Don&apos;t miss out on the latest heavy machinery finds.
          </p>
        </div>

        {/* CTA Button */}
        <button className="bg-amber-50 hover:bg-amber-100 text-amber-900 font-semibold px-6 py-3 rounded-lg transition-colors shadow-md hover:shadow-lg">
          Buy Now
        </button>
      </div>

      {/* Decorative Equipment Icons */}
      <div className="absolute bottom-0 right-0 opacity-20">
        <div className="w-32 h-32 bg-white rounded-full -mr-16 -mb-16"></div>
      </div>
    </div>
  )
}

export default function WatchlistAndRecent() {
  // Heavy machinery images
  const machineryImages = [
    'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1581091870623-1d2c5a0b2a5b?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=400&fit=crop&q=80',
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop&q=80',
    'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=400&fit=crop&q=80',
    'https://images.unsplash.com/photo-1581091870623-1d2c5a0b2a5b?w=400&h=400&fit=crop&q=80',
  ]

  // Recently viewed items
  const recentlyViewedItems: Item[] = [
    {
      id: 'rv1',
      title: 'Caterpillar 326FL Excavator 2020',
      price: '$95,000',
      image: machineryImages[0],
    },
    {
      id: 'rv2',
      title: 'John Deere 850K Dozer 2019',
      price: '$125,000',
      image: machineryImages[1],
    },
    {
      id: 'rv3',
      title: 'Komatsu WA470 Loader 2021',
      price: '$78,500',
      image: machineryImages[2],
    },
    {
      id: 'rv4',
      title: 'Volvo EC480E Excavator 2020',
      price: '$145,000',
      image: machineryImages[3],
    },
  ]

  // Watched items
  const watchedItems: Item[] = [
    {
      id: 'w1',
      title: 'Caterpillar 950M Wheel Loader 2021',
      price: '$185,000',
      image: machineryImages[4],
      isWatched: true,
    },
    {
      id: 'w2',
      title: 'Bobcat S770 Skid Steer 2020',
      price: '$42,500',
      image: machineryImages[5],
      isWatched: true,
    },
    {
      id: 'w3',
      title: 'Liebherr R 920 Compact Excavator 2021',
      price: '$98,000',
      image: machineryImages[6],
      isWatched: true,
    },
    {
      id: 'w4',
      title: 'JCB 3CX Backhoe Loader 2019',
      price: '$58,000',
      image: machineryImages[7],
      isWatched: true,
    },
  ]

  // Picks for you
  const picksForYouItems: Item[] = [
    {
      id: 'p1',
      title: 'Deere 844K Wheel Loader 2020',
      price: '$165,000',
      image: machineryImages[0],
    },
    {
      id: 'p2',
      title: 'Case 580N Backhoe 2019',
      price: '$52,000',
      image: machineryImages[1],
    },
    {
      id: 'p3',
      title: 'Caterpillar 336F Excavator 2021',
      price: '$195,000',
      image: machineryImages[2],
    },
    {
      id: 'p4',
      title: 'Komatsu PC490LC Excavator 2020',
      price: '$175,000',
      image: machineryImages[3],
    },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Recently Viewed Module */}
        <div className="h-[500px]">
          <GridItemCards
            title="Recently viewed"
            items={recentlyViewedItems}
            showClosingDate={false}
            heartColor="white"
          />
        </div>

        {/* Watched Items Module */}
        <div className="h-[500px]">
          <GridItemCards
            title="Watched items"
            items={watchedItems}
            showClosingDate={false}
            heartColor="black"
          />
        </div>

        {/* Picks for You Module */}
        <div className="h-[500px]">
          <GridItemCards
            title="Picks for you"
            items={picksForYouItems}
            showClosingDate={false}
            heartColor="white"
          />
        </div>

        {/* Marketing Banner */}
        <div className="h-[500px]">
          <MarketingBanner />
        </div>
      </div>
    </div>
  )
}