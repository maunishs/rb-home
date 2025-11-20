'use client'

import { CalendarIcon } from '@heroicons/react/24/outline'

interface Event {
  id: string
  imageLabel: string
  status: {
    text: string
    color: string
  }
  category: string
  lots: string
  title: string
  location: string
  date: string
  viewing?: string
  buttons: Array<{
    text: string
    variant: 'primary' | 'secondary'
  }>
}

export default function UpcomingEvents() {
  const events: Event[] = [
    {
      id: '4',
      imageLabel: 'Mining Equipment',
      status: {
        text: 'Bidding Open',
        color: 'bg-green-100 text-green-800',
      },
      category: 'Mining',
      lots: '90+ Lots',
      title: 'Mining Equipment Auction',
      location: 'Denver, CO +3 locations',
      date: 'July 5 - July 8, 2024 4 days',
      viewing: 'Viewing: July 4, 10AM - 4PM',
      buttons: [
        { text: 'View Lots', variant: 'primary' },
        { text: 'Auction Details', variant: 'secondary' },
      ],
    },
    {
      id: '5',
      imageLabel: 'Construction Equipment',
      status: {
        text: 'Ending Soon',
        color: 'bg-orange-100 text-orange-800',
      },
      category: 'Construction',
      lots: '75+ Lots',
      title: 'Construction Fleet Sale',
      location: 'Miami, FL',
      date: 'July 10, 2024 1 day',
      viewing: 'Viewing: July 9, 1PM - 6PM',
      buttons: [
        { text: 'View Lots', variant: 'primary' },
        { text: 'Auction Details', variant: 'secondary' },
      ],
    },
    {
      id: '6',
      imageLabel: 'Manufacturing Equipment',
      status: {
        text: 'New Listing',
        color: 'bg-purple-100 text-purple-800',
      },
      category: 'Manufacturing',
      lots: '60+ Lots',
      title: 'Factory Equipment Sale',
      location: 'Detroit, MI +1 location',
      date: 'July 15 - July 16, 2024 2 days',
      viewing: 'Viewing: July 14, 11AM - 4PM',
      buttons: [{ text: 'View Details', variant: 'secondary' }],
    },
    {
      id: '7',
      imageLabel: 'Agricultural Equipment',
      status: {
        text: 'Bidding Open',
        color: 'bg-green-100 text-green-800',
      },
      category: 'Agriculture',
      lots: '200+ Lots',
      title: 'Farm Equipment Auction',
      location: 'Kansas City, MO +2 locations',
      date: 'July 20 - July 22, 2024 3 days',
      viewing: 'Viewing: July 19, 9AM - 5PM',
      buttons: [
        { text: 'View Lots', variant: 'primary' },
        { text: 'Auction Details', variant: 'secondary' },
      ],
    },
    {
      id: '8',
      imageLabel: 'Transportation Fleet',
      status: {
        text: 'Registration Open',
        color: 'bg-purple-100 text-purple-800',
      },
      category: 'Transportation',
      lots: '110+ Lots',
      title: 'Fleet Vehicle Auction',
      location: 'Phoenix, AZ',
      date: 'July 25, 2024 1 day',
      viewing: 'Viewing: July 24, 12PM - 6PM',
      buttons: [{ text: 'Register Now', variant: 'secondary' }],
    },
  ]

  return (
    <div className="bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          Upcoming Events Calendar
        </h2>

        {/* Event Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden"
            >
              {/* Image Placeholder */}
              <div className="aspect-video bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500 font-medium text-sm">
                  {event.imageLabel}
                </span>
              </div>

              {/* Content */}
              <div className="p-4">
                {/* Status Tag */}
                <div className="mb-3">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${event.status.color}`}
                  >
                    {event.status.text}
                  </span>
                </div>

                {/* Category Tag & Lots */}
                <div className="mb-3 flex items-center gap-2">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                    {event.category}
                  </span>
                  <span className="text-xs text-gray-600 font-medium">
                    {event.lots}
                  </span>
                </div>

                {/* Event Title */}
                <h3 className="text-base font-bold text-gray-900 mb-2">
                  {event.title}
                </h3>

                {/* Location */}
                <p className="text-sm text-gray-600 mb-1">{event.location}</p>

                {/* Date */}
                <p className="text-sm text-gray-600 mb-2">{event.date}</p>

                {/* Viewing Information */}
                {event.viewing && (
                  <p className="text-xs text-gray-500 mb-3">{event.viewing}</p>
                )}

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {event.buttons.map((button, index) => (
                    <button
                      key={index}
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                        button.variant === 'primary'
                          ? 'bg-orange-600 text-white hover:bg-orange-700'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {button.text}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer: Pagination and View Full Calendar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-gray-200">
          {/* Pagination */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">
              Showing 1-20 of 120 events
            </span>
            <div className="flex items-center gap-1">
              <button className="px-3 py-1 text-sm font-medium text-orange-600 bg-orange-50 rounded-md hover:bg-orange-100">
                1
              </button>
              <button className="px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md">
                2
              </button>
              <button className="px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md">
                3
              </button>
              <span className="px-2 text-sm text-gray-500">...</span>
              <button className="px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md">
                6
              </button>
            </div>
          </div>

          {/* View Full Calendar Button */}
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors text-sm font-medium">
            <CalendarIcon className="h-5 w-5" />
            <span>View Full Calendar</span>
          </button>
        </div>
      </div>
    </div>
  )
}