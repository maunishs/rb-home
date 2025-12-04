'use client'

import { useState, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import LiveTicker from '@/components/LiveTicker'
import RBHeader from '@/components/RBHeader'
import CategoryPills from '@/components/CategoryPills'
import Footer from '@/components/Footer'
import ScrollToTop from '@/components/ScrollToTop'
import {
  ChevronDownIcon,
  HeartIcon,
  FunnelIcon,
} from '@heroicons/react/24/outline'
import {
  HeartIcon as HeartIconSolid,
} from '@heroicons/react/24/solid'

interface SearchItem {
  id: string
  title: string
  price: string
  status?: 'WINNING' | 'OUTBID'
  bids?: number
  timeLeft?: string
  location: string
  hours: string
  watchCount: number
  image: string
  type: 'auction' | 'buyItNow'
  lotNumber?: string
  estimatedValue?: string
  maxBid?: string
  distance?: number
  priceSignal?: 'Great Price' | 'Good Price'
}

function SearchResultsContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const query = searchParams.get('q') || 'Excavator'
  const [activeTab, setActiveTab] = useState('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list')
  const [watchedItems, setWatchedItems] = useState<Set<string>>(new Set())
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 60
  const [filtersOpen, setFiltersOpen] = useState({
    location: true,
    buyingFormat: true,
    categories: true,
    make: true,
    price: true,
    meter: true,
  })

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

  // Parse time string to check if less than 5 minutes
  const isTimeLessThan5Min = (timeStr: string | undefined): boolean => {
    if (!timeStr) return false
    // Parse formats like "1m 32s", "4m 20s", "6m 32s", "10m 15s"
    const match = timeStr.match(/(\d+)m\s*(\d+)s/)
    if (match) {
      const minutes = parseInt(match[1])
      return minutes < 5
    }
    return false
  }

  // Generate more items for pagination
  const generateItems = (): SearchItem[] => {
    const items: SearchItem[] = []
    const titles = [
      'Caterpillar 336F Excavator',
      'Komatsu PC490LC Excavator',
      'Volvo EC480E Excavator',
      'John Deere 850K Dozer',
      'Liebherr R 920 Compact Excavator',
      'Case 580N Backhoe',
      'Bobcat S770 Skid Steer',
      'JCB 3CX Backhoe Loader',
      'Kaiser Premier Urban X 2.0 on 2022 Freightliner 108SD 6x4 Vacuum E>',
      'Caterpillar 950M Wheel Loader',
      'Komatsu WA470 Loader',
      'Deere 844K Wheel Loader',
      'Caterpillar 326FL Excavator',
      'Volvo EC210E Excavator',
      'Hitachi ZX350LC Excavator',
    ]
    const prices = ['$51,700', '$158,300', '$12,158,300', '$95,000', '$125,000', '$78,500', '$145,000', '$52,000', '$42,500', '$185,000']
    const timeOptions = ['1m 32s', '2m 15s', '3m 45s', '4m 20s', '6m 32s', '8m 15s', '12m 30s', '15m 45s', '20m 10s', '25m 30s']
    const statuses: Array<'WINNING' | 'OUTBID' | undefined> = [undefined, undefined, undefined, 'WINNING', 'OUTBID', undefined, undefined, 'WINNING', 'OUTBID', undefined]
    const locations = ['Fort Worth, TX, US', 'Sacramento, CA, USA', 'Dallas, TX, USA', 'Phoenix, AZ, USA', 'Denver, CO, USA']

    for (let i = 0; i < 75; i++) {
      const titleIndex = i % titles.length
      const priceIndex = i % prices.length
      const timeIndex = i % timeOptions.length
      const statusIndex = i % statuses.length
      const locationIndex = i % locations.length
      const lotNumber = String(1000 + i)
      // Generate random distance between 10 and 2000 miles
      const distance = Math.floor(Math.random() * 1990) + 10
      
      // Determine if this item will show "Buy it Now" (on "all" tab, items with id divisible by 3, or non-auction items)
      const willShowBuyNow = (parseInt(String(i + 1)) % 3 === 0) || Math.random() < 0.3
      // Randomly assign price signal to some "Buy it Now" items
      const priceSignal = willShowBuyNow && Math.random() < 0.6 
        ? (Math.random() < 0.5 ? 'Great Price' : 'Good Price')
        : undefined

      items.push({
        id: String(i + 1),
        title: `${titles[titleIndex]} ${2020 + (i % 4)}`,
        price: prices[priceIndex],
        status: statuses[statusIndex],
        bids: Math.floor(Math.random() * 50) + 10,
        timeLeft: timeOptions[timeIndex],
        location: locations[locationIndex],
        hours: `${Math.floor(Math.random() * 1000000).toLocaleString()} hr`,
        watchCount: Math.floor(Math.random() * 100) + 20,
        image: 'bg-blue-200',
        type: 'auction',
        lotNumber,
        estimatedValue: '$321.5k/mo',
        maxBid: statuses[statusIndex] === 'OUTBID' && i % 3 === 0 ? `$${Math.floor(Math.random() * 10) + 1}k` : undefined,
        distance,
        priceSignal,
      })
    }

    return items
  }

  const allSearchResults = generateItems()
  const totalPages = Math.ceil(allSearchResults.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const searchResults = allSearchResults.slice(startIndex, endIndex)

  const makes = ['Freightliner', 'Kenworth', 'Ford', 'Peterbilt', 'Volvo', 'Mack']
  const categories = ['Truck Tractors', 'Van Trucks', 'Dump Trucks', 'Service and Utility Trucks']
  const selectedMakes = ['Freightliner']

  const relatedSearches = [
    'excavator 2023',
    'caterpillar excavator',
    'komatsu excavator',
    'excavator for sale',
    'mini excavator',
    'excavator parts',
    'used excavator',
    'excavator rental',
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <LiveTicker />
      <RBHeader />
      <CategoryPills />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Related Searches */}
        <div className="mb-6">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-sm text-gray-600">Related:</span>
            {relatedSearches.map((related, index) => (
              <button
                key={index}
                onClick={() => router.push(`/search?q=${encodeURIComponent(related)}`)}
                className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
              >
                {related}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar - Filters */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-gray-200 p-4 sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Filters</h3>
                <button className="text-sm text-blue-600 hover:text-blue-700">Clear all</button>
              </div>

              {/* Location Filter */}
              <div className="border-b border-gray-200 pb-4 mb-4">
                <button
                  onClick={() => setFiltersOpen({ ...filtersOpen, location: !filtersOpen.location })}
                  className="w-full flex items-center justify-between text-sm font-medium text-gray-900 mb-2"
                >
                  <span>Location</span>
                  <ChevronDownIcon
                    className={`h-4 w-4 transition-transform ${filtersOpen.location ? 'rotate-180' : ''}`}
                  />
                </button>
                {filtersOpen.location && (
                  <div className="space-y-2 mt-2">
                    {['All', 'Within 25 mi', 'US Only', 'North America'].map((option) => (
                      <label key={option} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name="location"
                          value={option}
                          defaultChecked={option === 'Within 25 mi'}
                          className="text-orange-600"
                        />
                        <span className="text-sm text-gray-700">{option}</span>
                      </label>
                    ))}
                    <button className="text-sm text-blue-600 hover:text-blue-700 mt-2">See More</button>
                  </div>
                )}
              </div>

              {/* Buying Format Filter */}
              <div className="border-b border-gray-200 pb-4 mb-4">
                <button
                  onClick={() =>
                    setFiltersOpen({ ...filtersOpen, buyingFormat: !filtersOpen.buyingFormat })
                  }
                  className="w-full flex items-center justify-between text-sm font-medium text-gray-900 mb-2"
                >
                  <span>Buying Format</span>
                  <ChevronDownIcon
                    className={`h-4 w-4 transition-transform ${filtersOpen.buyingFormat ? 'rotate-180' : ''}`}
                  />
                </button>
                {filtersOpen.buyingFormat && (
                  <div className="space-y-2 mt-2">
                    {['All', 'Auction', 'Buy It Now'].map((option) => (
                      <label key={option} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name="buyingFormat"
                          value={option}
                          defaultChecked={option === 'All'}
                          className="text-orange-600"
                        />
                        <span className="text-sm text-gray-700">{option}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Categories Filter */}
              <div className="border-b border-gray-200 pb-4 mb-4">
                <button
                  onClick={() =>
                    setFiltersOpen({ ...filtersOpen, categories: !filtersOpen.categories })
                  }
                  className="w-full flex items-center justify-between text-sm font-medium text-gray-900 mb-2"
                >
                  <span>Categories</span>
                  <ChevronDownIcon
                    className={`h-4 w-4 transition-transform ${filtersOpen.categories ? 'rotate-180' : ''}`}
                  />
                </button>
                {filtersOpen.categories && (
                  <div className="space-y-2 mt-2">
                    {categories.map((category) => (
                      <label key={category} className="flex items-center space-x-2 cursor-pointer">
                        <input type="checkbox" className="text-orange-600" />
                        <span className="text-sm text-gray-700">{category}</span>
                      </label>
                    ))}
                    <button className="text-sm text-blue-600 hover:text-blue-700 mt-2">See More</button>
                  </div>
                )}
              </div>

              {/* Make Filter */}
              <div className="border-b border-gray-200 pb-4 mb-4">
                <button
                  onClick={() => setFiltersOpen({ ...filtersOpen, make: !filtersOpen.make })}
                  className="w-full flex items-center justify-between text-sm font-medium text-gray-900 mb-2"
                >
                  <span>Make</span>
                  <ChevronDownIcon
                    className={`h-4 w-4 transition-transform ${filtersOpen.make ? 'rotate-180' : ''}`}
                  />
                </button>
                {filtersOpen.make && (
                  <div className="space-y-2 mt-2">
                    {['Ashland', 'Allu', 'Bergmann', 'Case', 'Caterpillar', 'Ford'].map((make) => (
                      <label key={make} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          defaultChecked={make === 'Bergmann'}
                          className="text-orange-600"
                        />
                        <span className="text-sm text-gray-700">{make}</span>
                      </label>
                    ))}
                    <button className="text-sm text-blue-600 hover:text-blue-700 mt-2">See More</button>
                  </div>
                )}
              </div>

              {/* Price Filter */}
              <div className="border-b border-gray-200 pb-4 mb-4">
                <button
                  onClick={() => setFiltersOpen({ ...filtersOpen, price: !filtersOpen.price })}
                  className="w-full flex items-center justify-between text-sm font-medium text-gray-900 mb-2"
                >
                  <span>Price</span>
                  <ChevronDownIcon
                    className={`h-4 w-4 transition-transform ${filtersOpen.price ? 'rotate-180' : ''}`}
                  />
                </button>
                {filtersOpen.price && (
                  <div className="space-y-2 mt-2">
                    {['Under $10,000', '$10,000 - $20,000', 'Over $20,000'].map((option) => (
                      <label key={option} className="flex items-center space-x-2 cursor-pointer">
                        <input type="checkbox" className="text-orange-600" />
                        <span className="text-sm text-gray-700">{option}</span>
                      </label>
                    ))}
                    <div className="flex items-center gap-2 mt-3">
                      <input
                        type="text"
                        placeholder="$ 1000"
                        className="flex-1 border border-gray-300 rounded px-2 py-1 text-sm"
                      />
                      <span className="text-gray-500">to</span>
                      <input
                        type="text"
                        placeholder="$ 30k"
                        className="flex-1 border border-gray-300 rounded px-2 py-1 text-sm"
                      />
                      <button className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded text-sm">
                        →
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Meter Filter */}
              <div>
                <button
                  onClick={() => setFiltersOpen({ ...filtersOpen, meter: !filtersOpen.meter })}
                  className="w-full flex items-center justify-between text-sm font-medium text-gray-900 mb-2"
                >
                  <span>Meter</span>
                  <ChevronDownIcon
                    className={`h-4 w-4 transition-transform ${filtersOpen.meter ? 'rotate-180' : ''}`}
                  />
                </button>
                {filtersOpen.meter && (
                  <div className="space-y-2 mt-2">
                    {['Under 1,000 mi', '1,001 mi - 5,000 mi'].map((option) => (
                      <label key={option} className="flex items-center space-x-2 cursor-pointer">
                        <input type="checkbox" className="text-orange-600" />
                        <span className="text-sm text-gray-700">{option}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Main Content - Results Grid */}
          <div className="lg:col-span-3">
            {/* Results Summary */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-700">
                  {allSearchResults.length.toLocaleString()}+ results for <strong>{query || 'Excavator'}</strong>
                </span>
                <button className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 font-medium">
                  <HeartIcon className="h-4 w-4" />
                  <span>Save this search</span>
                </button>
              </div>
              <div className="text-sm text-gray-600">
                Shipping to 95835
              </div>
            </div>

            {/* Filter Pills and Dropdowns Row */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-gray-200">
              {/* Filter Pills */}
              <div className="flex items-center gap-2">
                {[
                  { id: 'all', label: 'All' },
                  { id: 'auction', label: 'Auction' },
                  { id: 'buyItNow', label: 'Buy It Now' },
                  { id: 'sold', label: 'Sold' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      activeTab === tab.id
                        ? 'bg-gray-800 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Sort Dropdown - Right aligned */}
              <div className="flex items-center gap-2 flex-wrap">
                <button className="flex items-center gap-1 px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 bg-white">
                  <span>Sort: Best Match</span>
                  <ChevronDownIcon className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Results Grid/List */}
            <div
              className={
                viewMode === 'grid'
                  ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4'
                  : 'space-y-3'
              }
            >
              {searchResults.map((item) => {
                const isBuyNow = (activeTab === 'all' && parseInt(item.id) % 3 === 0) || item.type !== 'auction'
                return (
                <div
                  key={item.id}
                  className={`bg-white border border-gray-200 overflow-hidden hover:shadow-md transition-all ${
                    viewMode === 'list'
                      ? 'flex items-center gap-4 p-4 rounded-lg'
                      : 'rounded-lg'
                  } ${item.status === 'OUTBID' && viewMode === 'list' && !isBuyNow ? 'border-l-4 border-l-red-500' : ''}`}
                >
                  {/* Image */}
                  <div
                    className={`relative flex-shrink-0 ${
                      viewMode === 'list' ? 'w-32 h-24' : 'aspect-video'
                    } overflow-hidden rounded`}
                    style={{ backgroundColor: '#FFEDD5' }}
                  >
                    {/* Status Badge - Only show for auction items, not Buy it Now */}
                    {item.status && !isBuyNow && (
                      <div
                        className={`absolute top-2 left-2 z-10 px-2 py-0.5 rounded text-xs font-semibold ${
                          item.status === 'WINNING'
                            ? 'bg-green-600 text-white'
                            : 'bg-red-600 text-white'
                        }`}
                      >
                        {item.status}
                      </div>
                    )}

                    {/* Heart Icon */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleWatch(item.id)
                      }}
                      className="absolute top-2 right-2 z-10 p-1.5 rounded-full bg-white/90 hover:bg-white shadow-sm transition-all"
                    >
                      {watchedItems.has(item.id) ? (
                        <HeartIconSolid className="h-4 w-4 text-red-500" />
                      ) : (
                        <HeartIcon className="h-4 w-4 text-gray-600" />
                      )}
                    </button>

                    {/* RB Logo */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-xl font-bold text-white/20">RB</div>
                      </div>
                    </div>
                  </div>

                  {/* Content - List View */}
                  {viewMode === 'list' ? (
                    <div className="flex-1 flex items-center justify-between gap-6">
                      {/* Middle Section - Title and Details */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium text-gray-900 mb-1 line-clamp-2">
                          {item.title}
                        </h3>
                        <div className="text-xs text-gray-600">
                          Lot {item.lotNumber} • {item.location}
                        </div>
                        {item.distance && (
                          <div className="text-xs text-orange-600 font-medium mt-1 inline-flex items-center gap-1 px-2 py-0.5 bg-orange-50 rounded-full">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span>{item.distance.toLocaleString()} miles from you</span>
                          </div>
                        )}
                      </div>

                      {/* Right Section - Time, Price, Actions */}
                      <div className="flex items-center gap-6 flex-shrink-0">
                        {/* Time Left */}
                        {item.timeLeft && (
                          <div
                            className={`text-sm font-medium min-w-[60px] text-right ${
                              isTimeLessThan5Min(item.timeLeft) ? 'text-red-600' : 'text-gray-900'
                            }`}
                          >
                            {item.timeLeft}
                          </div>
                        )}

                        {/* Price and Estimated Value */}
                        <div className="text-right min-w-[160px]">
                          <div className="flex flex-col items-end gap-1 mb-1">
                            {(() => {
                              const isBuyNow = (activeTab === 'all' && parseInt(item.id) % 3 === 0) || item.type !== 'auction'
                              return isBuyNow && item.priceSignal ? (
                                <span className={`text-xs font-semibold px-2 py-0.5 rounded ${
                                  item.priceSignal === 'Great Price' 
                                    ? 'bg-green-100 text-green-700' 
                                    : 'bg-blue-100 text-blue-700'
                                }`}>
                                  {item.priceSignal}
                                </span>
                              ) : null
                            })()}
                            <div className="text-base font-bold text-gray-900">{item.price}</div>
                          </div>
                          {item.estimatedValue && (
                            <div className="text-xs text-gray-600 flex items-center justify-end gap-1">
                              <span>est. {item.estimatedValue}</span>
                              <button className="text-gray-400 hover:text-gray-600 flex-shrink-0">
                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                  <path
                                    fillRule="evenodd"
                                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </button>
                            </div>
                          )}
                          {item.maxBid && (
                            <div className="text-xs text-gray-600 mt-1 text-right">
                              Your max. bid: {item.maxBid}
                            </div>
                          )}
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col items-end gap-2 min-w-[140px]">
                          {(() => {
                            const isBuyNow = (activeTab === 'all' && parseInt(item.id) % 3 === 0) || item.type !== 'auction'
                            
                            // Calculate top offer (85-90% of price) for Buy it Now items
                            let topOffer = null
                            if (isBuyNow) {
                              const priceStr = item.price.replace(/[^0-9]/g, '')
                              const priceNum = parseInt(priceStr)
                              if (!isNaN(priceNum)) {
                                const percentage = 0.85 + (Math.random() * 0.05) // Random between 85-90%
                                const topOfferAmount = Math.floor(priceNum * percentage)
                                topOffer = `$${topOfferAmount.toLocaleString()}`
                              }
                            }
                            
                            return (
                              <>
                                {isBuyNow && topOffer && (
                                  <div className="text-xs text-gray-600 text-right mb-1">
                                    <div className="font-medium text-gray-700">Top offer</div>
                                    <div className="text-gray-500">{topOffer}</div>
                                  </div>
                                )}
                                <button
                                  className={`px-4 py-2 rounded-md font-medium text-sm transition-colors ${
                                    isBuyNow
                                      ? 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                                      : 'bg-black text-white hover:bg-gray-800'
                                  }`}
                                >
                                  {isBuyNow
                                    ? 'Buy it Now'
                                    : `Bid ${item.estimatedValue?.replace('/mo', '') || '$321.5k'}`}
                                </button>
                                {!item.maxBid && (
                                  <button className="text-xs text-blue-600 hover:text-blue-700 font-medium">
                                    {isBuyNow ? 'Best offer' : 'Set Max. Bid'}
                                  </button>
                                )}
                              </>
                            )
                          })()}
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* Content - Grid View */
                    <div className="p-4">
                      <h3 className="text-sm font-semibold text-gray-900 mb-2 line-clamp-2">
                        {item.title}
                      </h3>

                      <div className="flex flex-col gap-1 mb-2">
                        {(() => {
                          const isBuyNow = (activeTab === 'all' && parseInt(item.id) % 3 === 0) || item.type !== 'auction'
                          return isBuyNow && item.priceSignal ? (
                            <span className={`text-xs font-semibold px-2 py-0.5 rounded w-fit ${
                              item.priceSignal === 'Great Price' 
                                ? 'bg-green-100 text-green-700' 
                                : 'bg-blue-100 text-blue-700'
                            }`}>
                              {item.priceSignal}
                            </span>
                          ) : null
                        })()}
                        <div className="text-lg font-bold text-gray-900">{item.price}</div>
                      </div>

                      {item.bids && (
                        <div className="text-xs text-gray-600 mb-2">
                          {item.bids} bids • {item.timeLeft}
                        </div>
                      )}

                      <div className="text-xs text-gray-600 mb-3">
                        {item.location} • {item.hours}
                      </div>

                      <button
                        className={`w-full py-2 px-4 rounded-md font-medium text-sm transition-colors ${
                          item.type === 'auction'
                            ? 'bg-black text-white hover:bg-gray-800'
                            : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                        }`}
                      >
                        {item.type === 'auction' ? 'Place Bid' : 'Buy it Now'}
                      </button>
                    </div>
                  )}
                </div>
                )
              })}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-8 mb-8">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                
                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(7, totalPages) }, (_, i) => {
                    let pageNum
                    if (totalPages <= 7) {
                      pageNum = i + 1
                    } else if (currentPage <= 4) {
                      pageNum = i + 1
                    } else if (currentPage >= totalPages - 3) {
                      pageNum = totalPages - 6 + i
                    } else {
                      pageNum = currentPage - 3 + i
                    }
                    
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                          currentPage === pageNum
                            ? 'bg-black text-white'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {pageNum}
                      </button>
                    )
                  })}
                </div>

                <button
                  onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
      <ScrollToTop />
    </div>
  )
}

export default function SearchResultsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Loading search results...</div>
      </div>
    }>
      <SearchResultsContent />
    </Suspense>
  )
}

