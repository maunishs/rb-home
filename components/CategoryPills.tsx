'use client'

import { useState } from 'react'
import {
  CalendarIcon,
  StarIcon,
  FireIcon,
  WrenchScrewdriverIcon,
  TruckIcon,
  CogIcon,
  BuildingOfficeIcon,
  BanknotesIcon,
} from '@heroicons/react/24/outline'

interface Category {
  id: string
  label: string
  icon: React.ComponentType<{ className?: string }>
}

const categories: Category[] = [
  {
    id: 'this-week',
    label: 'This week',
    icon: CalendarIcon,
  },
  {
    id: 'for-you',
    label: 'For you',
    icon: StarIcon,
  },
  {
    id: 'trending',
    label: 'Trending',
    icon: FireIcon,
  },
  {
    id: 'heavy-equipment',
    label: 'Heavy Equipment',
    icon: WrenchScrewdriverIcon,
  },
  {
    id: 'trucks',
    label: 'Trucks',
    icon: TruckIcon,
  },
  {
    id: 'construction',
    label: 'Construction',
    icon: CogIcon,
  },
  {
    id: 'agriculture',
    label: 'Agriculture',
    icon: BuildingOfficeIcon,
  },
  {
    id: 'financing',
    label: 'Financing',
    icon: BanknotesIcon,
  },
]

export default function CategoryPills() {
  const [selectedCategory, setSelectedCategory] = useState('this-week')

  return (
    <div className="bg-gray-50 pt-4 pb-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 overflow-x-auto hide-scrollbar pb-2">
          {categories.map((category) => {
            const Icon = category.icon
            const isSelected = selectedCategory === category.id

            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex flex-col items-center gap-1.5 px-4 py-2 rounded-lg transition-all whitespace-nowrap flex-shrink-0 ${
                  isSelected
                    ? 'bg-blue-50 text-blue-600'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon
                  className={`h-5 w-5 ${
                    isSelected ? 'text-blue-600' : 'text-gray-600'
                  }`}
                />
                <span
                  className={`text-xs font-medium ${
                    isSelected ? 'text-blue-600' : 'text-gray-700'
                  }`}
                >
                  {category.label}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

