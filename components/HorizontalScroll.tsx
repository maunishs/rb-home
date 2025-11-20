'use client'

import { useRef, useState, useEffect } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'

interface Item {
  id: string
  title: string
  price?: string
  image: string
  badge?: string
}

interface HorizontalScrollProps {
  title: string
  items: Item[]
  showSeeAll?: boolean
}

export default function HorizontalScroll({
  title,
  items,
  showSeeAll = true,
}: HorizontalScrollProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(true)

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 400
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

  const handleScroll = () => {
    checkScrollState()
  }

  useEffect(() => {
    // Check initial scroll state after render
    const timer = setTimeout(() => {
      checkScrollState()
    }, 100)
    // Also check on window resize
    window.addEventListener('resize', checkScrollState)
    return () => {
      clearTimeout(timer)
      window.removeEventListener('resize', checkScrollState)
    }
  }, [items])

  return (
    <div className="mb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          {showSeeAll && (
            <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
              See all
            </button>
          )}
        </div>
      </div>

      <div className="relative group">
        {/* Left Arrow */}
        {showLeftArrow && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Scroll left"
          >
            <ChevronLeftIcon className="h-6 w-6 text-gray-800" />
          </button>
        )}

        {/* Scrollable Container */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto hide-scrollbar gap-4 px-4 sm:px-6 lg:px-8 pb-4 scroll-smooth"
        >
          {items.map((item) => (
            <div
              key={item.id}
              className="flex-shrink-0 w-64 md:w-72 group/item cursor-pointer"
            >
              <div className="relative rounded-lg overflow-hidden bg-gray-200 aspect-video shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                {item.badge && (
                  <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded">
                    {item.badge}
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-black/0 opacity-0 group-hover/item:opacity-100 transition-opacity">
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h3 className="font-semibold text-sm mb-1">{item.title}</h3>
                    {item.price && (
                      <p className="text-xs opacity-90">{item.price}</p>
                    )}
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
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Scroll right"
          >
            <ChevronRightIcon className="h-6 w-6 text-gray-800" />
          </button>
        )}
      </div>
    </div>
  )
}
