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

export default function DealsForYou() {
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

  const deals: DealItem[] = [
    {
      id: '1',
      title: 'Caterpillar 326FL Excavator 2020',
      originalPrice: '$120,000',
      currentPrice: '$95,000',
      discountPercent: 21,
      image: '',
    },
    {
      id: '2',
      title: 'John Deere 850K Dozer 2019',
      originalPrice: '$150,000',
      currentPrice: '$125,000',
      discountPercent: 17,
      image: '',
    },
    {
      id: '3',
      title: 'Komatsu WA470 Loader 2021',
      originalPrice: '$95,000',
      currentPrice: '$78,500',
      discountPercent: 17,
      image: '',
    },
    {
      id: '4',
      title: 'Volvo EC480E Excavator 2020',
      originalPrice: '$180,000',
      currentPrice: '$145,000',
      discountPercent: 19,
      image: '',
    },
    {
      id: '5',
      title: 'Case 580N Backhoe 2019',
      originalPrice: '$65,000',
      currentPrice: '$52,000',
      discountPercent: 20,
      image: '',
    },
    {
      id: '6',
      title: 'Bobcat S770 Skid Steer 2020',
      originalPrice: '$55,000',
      currentPrice: '$42,500',
      discountPercent: 23,
      image: '',
    },
    {
      id: '7',
      title: 'Liebherr R 920 Compact Excavator 2021',
      originalPrice: '$120,000',
      currentPrice: '$98,000',
      discountPercent: 18,
      image: '',
    },
    {
      id: '8',
      title: 'JCB 3CX Backhoe Loader 2019',
      originalPrice: '$72,000',
      currentPrice: '$58,000',
      discountPercent: 19,
      image: '',
    },
  ]

  return (
    <div className="bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Deals for you</h2>
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
            {deals.map((deal) => (
              <div
                key={deal.id}
                className="flex-shrink-0 w-72 group/item cursor-pointer"
              >
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-lg transition-all overflow-hidden">
                  {/* Image with Discount Badge */}
                  <div className="relative aspect-video bg-orange-100 overflow-hidden">
                    {/* Discount Badge */}
                    <div className="absolute top-3 left-3 z-10 bg-red-600 text-white text-sm font-bold px-3 py-1.5 rounded-md shadow-lg">
                      {deal.discountPercent}% OFF
                    </div>
                    {/* Price Drop Badge */}
                    <div className="absolute top-3 right-3 z-10 bg-green-600 text-white text-xs font-semibold px-2.5 py-1 rounded-md shadow-lg">
                      Price Drop
                    </div>
                    {/* Heart Icon */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleWatch(deal.id)
                      }}
                      className="absolute bottom-3 right-3 z-10 p-1.5 rounded-full bg-white/90 hover:bg-white shadow-sm transition-all"
                      aria-label={watchedItems.has(deal.id) ? 'Remove from watchlist' : 'Add to watchlist'}
                    >
                      {watchedItems.has(deal.id) ? (
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
                      {deal.title}
                    </h3>

                    {/* Pricing */}
                    <div className="space-y-1">
                      {/* Original Price - Strikethrough */}
                      <p className="text-xs text-gray-500 line-through">
                        {deal.originalPrice}
                      </p>
                      {/* Current Price */}
                      <p className="text-lg font-bold text-gray-900">
                        {deal.currentPrice}
                      </p>
                      {/* Savings */}
                      <p className="text-xs text-green-600 font-semibold">
                        Save ${(parseInt(deal.originalPrice.replace(/\$|,/g, '')) - parseInt(deal.currentPrice.replace(/\$|,/g, ''))).toLocaleString()}
                      </p>
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
