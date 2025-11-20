'use client'

import { useRef, useState, useEffect } from 'react'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  HeartIcon,
  HandThumbUpIcon,
  HandThumbDownIcon,
} from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid'

interface NewItem {
  id: string
  title: string
  price: string
  image: string
}

export default function NewItemsBasedOnSearches() {
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

  const newItems: NewItem[] = [
    {
      id: '1',
      title: 'Caterpillar 326FL Excavator 2020',
      price: '$95,000',
      image: '',
    },
    {
      id: '2',
      title: 'John Deere 850K Dozer 2019',
      price: '$125,000',
      image: '',
    },
    {
      id: '3',
      title: 'Komatsu WA470 Loader 2021',
      price: '$78,500',
      image: '',
    },
    {
      id: '4',
      title: 'Volvo EC480E Excavator 2020',
      price: '$145,000',
      image: '',
    },
    {
      id: '5',
      title: 'Case 580N Backhoe 2019',
      price: '$52,000',
      image: '',
    },
    {
      id: '6',
      title: 'Bobcat S770 Skid Steer 2020',
      price: '$42,500',
      image: '',
    },
  ]

  return (
    <div className="bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            New items based on your recent searches
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
            {/* Feedback Card - First Item */}
            <div className="flex-shrink-0 w-72">
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm h-full flex flex-col p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  We want to hear from you
                </h3>
                <p className="text-sm text-gray-600 mb-6">
                  Give us your take in a quick survey
                </p>
                <div className="mt-auto flex items-center gap-3">
                  <button className="flex-1 flex items-center justify-center p-3 rounded-full border-2 border-gray-300 hover:border-gray-400 transition-colors">
                    <HandThumbDownIcon className="h-6 w-6 text-gray-700" />
                  </button>
                  <button className="flex-1 flex items-center justify-center p-3 rounded-full border-2 border-gray-300 hover:border-gray-400 transition-colors">
                    <HandThumbUpIcon className="h-6 w-6 text-gray-700" />
                  </button>
                </div>
              </div>
            </div>

            {/* Item Cards */}
            {newItems.map((item) => (
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
