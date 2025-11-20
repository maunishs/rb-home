'use client'

import { useRef, useState, useEffect } from 'react'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  HeartIcon,
} from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid'

interface RecommendedItem {
  id: string
  title: string
  price: string
  image: string
}

interface RecommendedForYouProps {
  category: string
  items: RecommendedItem[]
}

export default function RecommendedForYou({ category, items }: RecommendedForYouProps) {
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
  }, [items])

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

  return (
    <div className="bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{category}</h2>
            <p className="text-sm text-gray-600 mt-1">Recommended for you</p>
          </div>
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
                  {/* Image with Heart Icon */}
                  <div className="relative aspect-video bg-orange-100 overflow-hidden">
                    {/* Heart Icon */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleWatch(item.id)
                      }}
                      className="absolute top-3 right-3 z-10 p-1.5 rounded-full bg-white/90 hover:bg-white shadow-sm transition-all"
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

                    {/* Price */}
                    <p className="text-lg font-bold text-gray-900">
                      {item.price}
                    </p>
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
