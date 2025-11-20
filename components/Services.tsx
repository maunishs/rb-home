'use client'

import {
  MagnifyingGlassIcon,
  UserCircleIcon,
  ScaleIcon,
  StarIcon,
  BanknotesIcon,
  TruckIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline'

interface ServiceStep {
  id: string
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  color: string
}

const services: ServiceStep[] = [
  {
    id: '1',
    title: 'Find Equipment',
    description: 'Browse thousands of items across 200+ categories',
    icon: MagnifyingGlassIcon,
    color: 'bg-orange-100',
  },
  {
    id: '2',
    title: 'Create an Account',
    description: 'Start bidding in minutes',
    icon: UserCircleIcon,
    color: 'bg-blue-100',
  },
  {
    id: '3',
    title: 'Join the Bidding',
    description: 'All auctions start at just $1',
    icon: ScaleIcon,
    color: 'bg-green-100',
  },
  {
    id: '4',
    title: 'Celebrate Your Win',
    description: 'Enjoy the moment of victory',
    icon: StarIcon,
    color: 'bg-yellow-100',
  },
  {
    id: '5',
    title: 'RBFS Financing',
    description: 'Clear and affordable financing options available',
    icon: BanknotesIcon,
    color: 'bg-purple-100',
  },
  {
    id: '6',
    title: 'Veritread Shipping',
    description: "From bidding to delivery, we've got you covered",
    icon: TruckIcon,
    color: 'bg-indigo-100',
  },
]

export default function Services() {
  return (
    <div className="bg-white py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            How it works?
          </h2>
          <a
            href="#"
            className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
          >
            Read more
            <ChevronRightIcon className="h-4 w-4" />
          </a>
        </div>

        {/* Service Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {services.map((service) => {
            const Icon = service.icon
            return (
              <div
                key={service.id}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
              >
                {/* Image Placeholder */}
                <div className={`${service.color} aspect-video flex items-center justify-center`}>
                  <Icon className="h-8 w-8 text-gray-700" />
                </div>

                {/* Content */}
                <div className="p-3">
                  <h3 className="text-base font-bold text-gray-900 mb-1">
                    {service.title}
                  </h3>
                  <p className="text-xs text-gray-600">
                    {service.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
