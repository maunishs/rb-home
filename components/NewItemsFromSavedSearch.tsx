'use client'

import { useRef, useState, useEffect } from 'react'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  HeartIcon,
} from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid'

interface DealItem {
  id: string
  title: string
  originalPrice: string
  currentPrice: string
  discountPercent: number
  image: string
}

export default function NewItemsFromSavedSearch() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(true)
  const [watchedItems, setWatchedItems] = useState<Set<string>>(new Set())

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 320
      const newScrollLeft =
        scrollRef.current.scrollLeft +
        (direction === 'right' ? scrollAmount : -scrollAmount)
      scrollRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth',
      })
    }
  }

  const checkScrollState = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
      setShowLeftArrow(scrollLeft > 0)
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  useEffect(() => {
    checkScrollState()
    window.addEventListener('resize', checkScrollState)
    return () => window.removeEventListener('resize', checkScrollState)
  }, [])

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

  const items: DealItem[] = [
    {
      id: '1',
      title: 'Caterpillar 336F Excavator 2021',
      originalPrice: '$220,000',
      currentPrice: '$195,000',
      discountPercent: 11,
      image: '',
    },
    {
      id: '2',
      title: 'John Deere 850K Dozer 2020',
      originalPrice: '$165,000',
      currentPrice: '$145,000',
      discountPercent: 12,
      image: '',
    },
    {
      id: '3',
      title: 'Komatsu PC490LC Excavator 2021',
      originalPrice: '$200,000',
      currentPrice: '$175,000',
      discountPercent: 13,
      image: '',
    },
    {
      id: '4',
      title: 'Volvo EC480E Excavator 2020',
      originalPrice: '$190,000',
      currentPrice: '$165,000',
      discountPercent: 13,
      image: '',
    },
    {
      id: '5',
      title: 'Case 580N Backhoe 2020',
      originalPrice: '$68,000',
      currentPrice: '$58,000',
      discountPercent: 15,
      image: '',
    },
    {
      id: '6',
      title: 'Bobcat S770 Skid Steer 2021',
      originalPrice: '$48,000',
      currentPrice: '$42,500',
      discountPercent: 11,
      image: '',
    },
    {
      id: '7',
      title: 'Liebherr R 920 Compact Excavator 2021',
      originalPrice: '$115,000',
      currentPrice: '$98,000',
      discountPercent: 15,
      image: '',
    },
    {
      id: '8',
      title: 'JCB 3CX Backhoe Loader 2020',
      originalPrice: '$75,000',
      currentPrice: '$65,000',
      discountPercent: 13,
      image: '',
    },
  ]

  return (
    <div className="bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Based on your saved searches, here are new items
          </h2>
          <button className="text-sm text-gray-900 hover:text-gray-700 font-medium flex items-center space-x-1">
            <span>See all</span>
            <ChevronRightIcon className="h-4 w-4" />
          </button>
        </div>

        <div className="relative group">
          {/* Left Arrow */}
          {showLeftArrow && (
            <button
              onClick={() => scroll('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Scroll left"
            >
              <ChevronLeftIcon className="h-6 w-6 text-gray-800" />
            </button>
          )}

          {/* Scrollable Container */}
          <div
            ref={scrollRef}
            onScroll={checkScrollState}
            className="flex overflow-x-auto hide-scrollbar gap-4 pb-4 scroll-smooth"
          >
            {items.map((item) => (
              <div
                key={item.id}
                className="flex-shrink-0 w-72 group/item cursor-pointer"
              >
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-lg transition-all overflow-hidden">
                  {/* Image with Badges */}
                  <div className="relative aspect-video bg-orange-100 overflow-hidden">
                    {/* New Badge */}
                    <div className="absolute top-3 left-3 z-10 bg-blue-600 text-white text-xs font-semibold px-2.5 py-1 rounded-md shadow-lg">
                      New
                    </div>
                    {/* Heart Icon */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleWatch(item.id)
                      }}
                      className="absolute bottom-3 right-3 z-10 p-1.5 rounded-full bg-white/90 hover:bg-white shadow-sm transition-all"
                      aria-label={watchedItems.has(item.id) ? 'Remove from watchlist' : 'Add to watchlist'}
                    >
                      {watchedItems.has(item.id) ? (
                        <HeartSolidIcon className="h-4 w-4 text-red-500" />
                      ) : (
                        <HeartIcon className="h-4 w-4 text-gray-600" />
                      )}
                    </button>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    {/* Title */}
                    <h3 className="text-sm font-semibold text-gray-900 mb-3 line-clamp-2 leading-snug min-h-[2.5rem]">
                      {item.title}
                    </h3>

                    {/* Pricing */}
                    <div className="space-y-2">
                      {/* Current Price */}
                      <p className="text-lg font-bold text-gray-900">
                        {item.currentPrice}
                      </p>
                      {/* Great Price Badge */}
                      <div className="inline-block bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-1 rounded-md">
                        Great Price
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          {showRightArrow && (
            <button
              onClick={() => scroll('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Scroll right"
            >
              <ChevronRightIcon className="h-6 w-6 text-gray-800" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
