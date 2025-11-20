'use client'

import { useState } from 'react'
import {
  HeartIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid'

interface CategoryItem {
  id: string
  title: string
  price: string
  image: string
}

interface CategoryBrandModuleProps {
  category: string
  subtitle: string
  items: CategoryItem[]
}

export default function CategoryBrandModule({
  category,
  subtitle,
  items,
}: CategoryBrandModuleProps) {
  const [watchedItems, setWatchedItems] = useState<Set<string>>(new Set())

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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
          {/* Left Card - Category/Brand Info */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-3 h-full flex flex-col justify-between">
              <div>
                <h2 className="text-lg font-bold text-gray-900 mb-1">
                  {category}
                </h2>
                <p className="text-xs text-gray-600 mb-2">
                  {subtitle}
                </p>
              </div>
              <button className="w-full bg-gray-900 text-white font-semibold py-1.5 px-3 rounded-full hover:bg-gray-800 transition-colors flex items-center justify-center space-x-1 text-xs">
                <span>Shop now</span>
                <ChevronRightIcon className="h-3 w-3" />
              </button>
            </div>
          </div>

          {/* Right Grid - Item Cards with Large Item + 2x2 Grid */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-3 gap-2 h-full">
              {/* Large Central Item - Takes 2 rows */}
              <div className="row-span-2 group/item cursor-pointer">
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-lg transition-all overflow-hidden h-full">
                  {/* Image with Heart Icon */}
                  <div className="relative aspect-square bg-orange-100 overflow-hidden h-full">
                    {/* Heart Icon */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleWatch(items[0].id)
                      }}
                      className="absolute top-1.5 right-1.5 z-10 p-1 rounded-full bg-white/90 hover:bg-white shadow-sm transition-all"
                      aria-label={watchedItems.has(items[0].id) ? 'Remove from watchlist' : 'Add to watchlist'}
                    >
                      {watchedItems.has(items[0].id) ? (
                        <HeartSolidIcon className="h-3 w-3 text-red-500" />
                      ) : (
                        <HeartIcon className="h-3 w-3 text-gray-600" />
                      )}
                    </button>
                  </div>

                  {/* Content */}
                  <div className="p-2">
                    {/* Title */}
                    <h3 className="text-xs font-semibold text-gray-900 mb-1 line-clamp-2 leading-tight min-h-[1.75rem]">
                      {items[0].title}
                    </h3>

                    {/* Price */}
                    <p className="text-xs font-bold text-gray-900">
                      {items[0].price}
                    </p>
                  </div>
                </div>
              </div>

              {/* 2x2 Grid for remaining items */}
              <div className="col-span-2 grid grid-cols-2 gap-2">
                {items.slice(1, 5).map((item) => {
                  const isWatched = watchedItems.has(item.id)
                  return (
                    <div
                      key={item.id}
                      className="group/item cursor-pointer"
                    >
                      <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-lg transition-all overflow-hidden h-full flex flex-col">
                        {/* Image with Heart Icon */}
                        <div className="relative aspect-square bg-orange-100 overflow-hidden flex-shrink-0">
                          {/* Heart Icon */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              toggleWatch(item.id)
                            }}
                            className="absolute top-1.5 right-1.5 z-10 p-1 rounded-full bg-white/90 hover:bg-white shadow-sm transition-all"
                            aria-label={isWatched ? 'Remove from watchlist' : 'Add to watchlist'}
                          >
                            {isWatched ? (
                              <HeartSolidIcon className="h-3 w-3 text-red-500" />
                            ) : (
                              <HeartIcon className="h-3 w-3 text-gray-600" />
                            )}
                          </button>
                        </div>

                        {/* Content */}
                        <div className="p-1.5 flex-1 flex flex-col justify-between">
                          {/* Title */}
                          <h3 className="text-xs font-semibold text-gray-900 mb-1 line-clamp-2 leading-tight min-h-[1.75rem]">
                            {item.title}
                          </h3>

                          {/* Price */}
                          <p className="text-xs font-bold text-gray-900">
                            {item.price}
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
