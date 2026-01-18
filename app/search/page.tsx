'use client'

import { useState, Suspense, useMemo, useRef, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import LiveTicker from '@/components/LiveTicker'
import RBHeader from '@/components/RBHeader'
import CategoryPills from '@/components/CategoryPills'
import Footer from '@/components/Footer'
import ScrollToTop from '@/components/ScrollToTop'
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  HeartIcon,
  FunnelIcon,
  TrophyIcon,
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

// Closing Today Module Component
function ClosingTodayModule({ items }: { items: SearchItem[] }) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(true)

  // Filter items closing today (items with short time left - less than 30 minutes)
  const closingTodayItems = useMemo(() => {
    return items
      .filter((item) => {
        if (!item.timeLeft) return false
        // Parse time left - items with format like "1m 32s", "2m 15s", etc.
        const timeMatch = item.timeLeft.match(/(\d+)m\s*(\d+)s/)
        if (timeMatch) {
          const minutes = parseInt(timeMatch[1])
          const seconds = parseInt(timeMatch[2])
          const totalSeconds = minutes * 60 + seconds
          // Consider items closing in less than 30 minutes as "closing today"
          return totalSeconds < 1800
        }
        return false
      })
      .slice(0, 12) // Limit to 12 items
  }, [items])

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
  }, [closingTodayItems])

  if (closingTodayItems.length === 0) {
    return null
  }

  return (
    <div className="bg-white border-t border-b border-gray-200 py-4 mb-6 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-gray-900">Closing Today</h2>
            <span className="bg-red-100 text-red-700 text-xs font-semibold px-2 py-0.5 rounded-full">ABSOLUTE SALE</span>
          </div>
          <button className="text-sm text-orange-600 hover:text-orange-700 font-medium flex items-center space-x-1">
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
            className="flex overflow-x-auto hide-scrollbar gap-2 pb-2 scroll-smooth"
          >
            {closingTodayItems.map((item, index) => {
              // Deterministically assign price signal if not already present
              // Use item ID to create consistent assignment between server and client
              const itemIdNum = parseInt(item.id) || index
              const seed = itemIdNum * 7 + 13
              const randomValue = (Math.sin(seed) * 10000) - Math.floor(Math.sin(seed) * 10000)
              const priceSignal = item.priceSignal || (randomValue < 0.4 ? (randomValue < 0.2 ? 'Great Price' : 'Good Price') : undefined)
              
              return (
                <div
                  key={item.id}
                  className="flex-shrink-0 w-32 group/item cursor-pointer"
                >
                  <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-lg transition-all overflow-hidden">
                    {/* Image */}
                    <div className="relative aspect-video overflow-hidden" style={{ backgroundColor: '#F3F4F6' }}>
                      {/* Price Signal Badge */}
                      {priceSignal && (
                        <div className={`absolute top-1 left-1 z-10 text-[10px] font-semibold px-1 py-0.5 rounded ${
                          priceSignal === 'Great Price' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-blue-100 text-blue-700'
                        }`}>
                          {priceSignal}
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-2">
                      {/* Title */}
                      <h3 className="text-xs font-semibold text-gray-900 mb-1 line-clamp-2 leading-tight min-h-[2rem]">
                        {item.title}
                      </h3>

                      {/* Price */}
                      <p className="text-sm font-bold text-gray-900 mb-1">
                        {item.price}
                      </p>

                      {/* Time Left and Location */}
                      <div className="flex flex-col gap-0.5 text-[10px] text-gray-600">
                        {item.timeLeft && (
                          <span className="font-medium text-red-600">⏱ {item.timeLeft}</span>
                        )}
                        <span className="truncate">{item.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
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
    recentSearch: false,
    quickFilters: true,
    location: false,
    buyingFormat: false,
    categories: false,
    make: false,
    model: false,
    price: false,
    meter: false,
  })
  const [selectedFilters, setSelectedFilters] = useState({
    recentSearch: [] as string[],
    reserveMet: false,
    closingToday: false,
    absoluteSale: false,
    greatPrice: false,
    goodPrice: false,
    location: 'Within 25 mi',
    buyingFormat: 'All',
    categories: [] as string[],
    make: ['Bergmann'] as string[],
    model: [] as string[],
    price: [] as string[],
    meter: [] as string[],
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

    // Simple seeded random function for consistent values between server and client
    const seededRandom = (seed: number) => {
      const x = Math.sin(seed) * 10000
      return x - Math.floor(x)
    }

    for (let i = 0; i < 75; i++) {
      const titleIndex = i % titles.length
      const priceIndex = i % prices.length
      const timeIndex = i % timeOptions.length
      const statusIndex = i % statuses.length
      const locationIndex = i % locations.length
      const lotNumber = String(1000 + i)
      
      // Use seeded random for consistent values between server and client
      const seed1 = i * 7 + 13
      const seed2 = i * 11 + 17
      const seed3 = i * 19 + 23
      const seed4 = i * 31 + 37
      const seed5 = i * 41 + 43
      const seed6 = i * 47 + 53
      const seed7 = i * 59 + 61
      const seed8 = i * 67 + 71
      
      // Generate deterministic distance between 10 and 2000 miles
      const distance = Math.floor(seededRandom(seed1) * 1990) + 10
      
      // Determine if this item will show "Buy it Now" (deterministic)
      const willShowBuyNow = (parseInt(String(i + 1)) % 3 === 0) || seededRandom(seed2) < 0.3
      // Deterministically assign price signal to some "Buy it Now" items
      const priceSignal = willShowBuyNow && seededRandom(seed3) < 0.6 
        ? (seededRandom(seed4) < 0.5 ? 'Great Price' : 'Good Price')
        : undefined

      // Calculate estimated monthly value as 1/40 of the price
      const priceStr = prices[priceIndex]
      const priceNum = parseInt(priceStr.replace(/[^0-9]/g, ''))
      const monthlyEstimate = priceNum / 40
      let formattedMonthly: string
      if (monthlyEstimate >= 1000) {
        formattedMonthly = `$${(monthlyEstimate / 1000).toFixed(1)}k/mo`
      } else {
        formattedMonthly = `$${Math.round(monthlyEstimate).toLocaleString()}/mo`
      }

      items.push({
        id: String(i + 1),
        title: `${titles[titleIndex]} ${2020 + (i % 4)}`,
        price: prices[priceIndex],
        status: statuses[statusIndex],
        bids: Math.floor(seededRandom(seed5) * 50) + 10,
        timeLeft: timeOptions[timeIndex],
        location: locations[locationIndex],
        hours: `${Math.floor(seededRandom(seed6) * 1000000).toLocaleString()} hr`,
        watchCount: Math.floor(seededRandom(seed7) * 120) + 5, // Range: 5-125, so some items will have >20
        image: 'bg-blue-200',
        type: 'auction',
        lotNumber,
        estimatedValue: formattedMonthly,
        maxBid: statuses[statusIndex] === 'OUTBID' && i % 3 === 0 ? `$${Math.floor(seededRandom(seed8) * 10) + 1}k` : undefined,
        distance,
        priceSignal,
      })
    }

    return items
  }

  const allSearchResults = useMemo(() => generateItems(), [])

  // Helper function to generate random counts based on item index
  const getCountForFilter = (filterValue: string, filterType: string, totalItems: number): number => {
    // Use a seeded random based on filter value to get consistent counts
    const seed = filterValue.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
    const random = Math.abs(Math.sin(seed)) * 100
    // Return a count between 5% and 40% of total items, with some variation
    const baseCount = Math.floor(totalItems * (0.05 + (random % 0.35)))
    return Math.max(1, baseCount + Math.floor(random % 20))
  }

  // Calculate counts for each filter option
  const getLocationCount = (location: string) => {
    if (location === 'All') return allSearchResults.length
    const seed = location.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
    return Math.floor(allSearchResults.length * (0.2 + (Math.abs(Math.sin(seed)) % 0.3)))
  }

  const getBuyingFormatCount = (format: string) => {
    if (format === 'All') return allSearchResults.length
    // Auction vs Buy It Now split
    const auctionCount = Math.floor(allSearchResults.length * 0.65)
    return format === 'Auction' ? auctionCount : allSearchResults.length - auctionCount
  }

  const getCategoryCount = (category: string) => {
    return getCountForFilter(category, 'category', allSearchResults.length)
  }

  const getMakeCount = (make: string) => {
    return getCountForFilter(make, 'make', allSearchResults.length)
  }

  const getPriceCount = (priceRange: string) => {
    return getCountForFilter(priceRange, 'price', allSearchResults.length)
  }

  const getMeterCount = (meterRange: string) => {
    return getCountForFilter(meterRange, 'meter', allSearchResults.length)
  }

  const getRecentSearchCount = (searchTerm: string) => {
    return getCountForFilter(searchTerm, 'recentSearch', allSearchResults.length)
  }

  const getReserveMetCount = () => {
    return Math.floor(allSearchResults.length * 0.25)
  }

  const getClosingTodayCount = () => {
    return Math.floor(allSearchResults.length * 0.15)
  }

  const getAbsoluteSaleCount = () => {
    return Math.floor(allSearchResults.length * 0.35)
  }

  const getGreatPriceCount = () => {
    return Math.floor(allSearchResults.length * 0.20)
  }

  const getGoodPriceCount = () => {
    return Math.floor(allSearchResults.length * 0.30)
  }

  const totalPages = Math.ceil(allSearchResults.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const searchResults = allSearchResults.slice(startIndex, endIndex)

  const makes = ['Ashland', 'Allu', 'Bergmann', 'Case', 'Caterpillar', 'Ford']
  const categories = ['Truck Tractors', 'Van Trucks', 'Dump Trucks', 'Service and Utility Trucks']
  const selectedMakes = ['Freightliner']

  // Model mappings for each make
  const makeToModels: Record<string, string[]> = {
    'Ashland': ['AS-200', 'AS-300', 'AS-400', 'AS-500'],
    'Allu': ['AL-100', 'AL-200', 'AL-300', 'AL-400'],
    'Bergmann': ['BG-150', 'BG-250', 'BG-350', 'BG-450'],
    'Case': ['580N', '590N', '750N', '850N'],
    'Caterpillar': ['336F', '336FL', '950M', '326FL', '262D3', '272D3'],
    'Ford': ['F-150', 'F-250', 'F-350', 'F-450'],
  }

  // Get available models based on selected makes
  const getAvailableModels = (): string[] => {
    if (selectedFilters.make.length === 0) {
      return []
    }
    const models = new Set<string>()
    selectedFilters.make.forEach((make) => {
      const makeModels = makeToModels[make] || []
      makeModels.forEach((model) => models.add(model))
    })
    return Array.from(models).sort()
  }

  const availableModels = getAvailableModels()

  const getModelCount = (model: string) => {
    return getCountForFilter(model, 'model', allSearchResults.length)
  }

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
        {/* Closing Today Module */}
        <ClosingTodayModule items={allSearchResults} />

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
            <div className="bg-white rounded-lg border border-gray-200 p-4 sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto hide-scrollbar" style={{ scrollBehavior: 'smooth' }}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Filters</h3>
                <button className="text-sm text-blue-600 hover:text-blue-700">Clear all</button>
              </div>

              {/* Recent Search Filter */}
              <div className="border-b border-gray-200 pb-4 mb-4">
                <button
                  onClick={() => setFiltersOpen({ ...filtersOpen, recentSearch: !filtersOpen.recentSearch })}
                  className="w-full flex items-center justify-between text-sm font-medium text-gray-900 mb-2"
                >
                  <span>Recent Search</span>
                  <ChevronDownIcon
                    className={`h-4 w-4 transition-transform ${filtersOpen.recentSearch ? 'rotate-180' : ''}`}
                  />
                </button>
                {filtersOpen.recentSearch && (
                  <div className="space-y-2 mt-2">
                    {['Excavator', 'Caterpillar', 'Skid Steer', 'Loader', 'Dozer'].map((searchTerm) => {
                      const count = getRecentSearchCount(searchTerm)
                      const isChecked = selectedFilters.recentSearch.includes(searchTerm)
                      return (
                        <label key={searchTerm} className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedFilters({
                                  ...selectedFilters,
                                  recentSearch: [...selectedFilters.recentSearch, searchTerm],
                                })
                              } else {
                                setSelectedFilters({
                                  ...selectedFilters,
                                  recentSearch: selectedFilters.recentSearch.filter((s) => s !== searchTerm),
                                })
                              }
                            }}
                            className="text-orange-600"
                          />
                          <span className="text-sm text-gray-700">{searchTerm} ({count})</span>
                        </label>
                      )
                    })}
                  </div>
                )}
              </div>

              {/* Quick Filters */}
              <div className="border-b border-orange-200 pb-4 mb-4 bg-orange-50 rounded-lg p-3 -mx-1">
                <button
                  onClick={() => setFiltersOpen({ ...filtersOpen, quickFilters: !filtersOpen.quickFilters })}
                  className="w-full flex items-center justify-between text-sm font-semibold text-gray-900 mb-2"
                >
                  <div className="flex items-center gap-2">
                    <span>Quick Filters</span>
                    <span className="px-2 py-0.5 bg-orange-600 text-white text-xs font-bold rounded-full">POPULAR</span>
                  </div>
                  <ChevronDownIcon
                    className={`h-4 w-4 transition-transform ${filtersOpen.quickFilters ? 'rotate-180' : ''}`}
                  />
                </button>
                {filtersOpen.quickFilters && (
                  <div className="space-y-2 mt-2">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedFilters.reserveMet}
                        onChange={(e) => {
                          setSelectedFilters({
                            ...selectedFilters,
                            reserveMet: e.target.checked,
                          })
                        }}
                        className="text-orange-600"
                      />
                      <span className="text-sm text-gray-700">Reserve Met ({getReserveMetCount()})</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedFilters.closingToday}
                        onChange={(e) => {
                          setSelectedFilters({
                            ...selectedFilters,
                            closingToday: e.target.checked,
                          })
                        }}
                        className="text-orange-600"
                      />
                      <span className="text-sm text-gray-700">Closing Today ({getClosingTodayCount()})</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedFilters.absoluteSale}
                        onChange={(e) => {
                          setSelectedFilters({
                            ...selectedFilters,
                            absoluteSale: e.target.checked,
                          })
                        }}
                        className="text-orange-600"
                      />
                      <span className="text-sm text-gray-700">Absolute Sale ({getAbsoluteSaleCount()})</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedFilters.greatPrice}
                        onChange={(e) => {
                          setSelectedFilters({
                            ...selectedFilters,
                            greatPrice: e.target.checked,
                          })
                        }}
                        className="text-orange-600"
                      />
                      <span className="text-sm text-gray-700">Great Price ({getGreatPriceCount()})</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedFilters.goodPrice}
                        onChange={(e) => {
                          setSelectedFilters({
                            ...selectedFilters,
                            goodPrice: e.target.checked,
                          })
                        }}
                        className="text-orange-600"
                      />
                      <span className="text-sm text-gray-700">Good Price ({getGoodPriceCount()})</span>
                    </label>
                  </div>
                )}
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
                    {['All', 'Within 25 mi', 'US Only', 'North America'].map((option) => {
                      const count = getLocationCount(option)
                      return (
                        <label key={option} className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="radio"
                            name="location"
                            value={option}
                            defaultChecked={option === 'Within 25 mi'}
                            onChange={() => setSelectedFilters({ ...selectedFilters, location: option })}
                            className="text-orange-600"
                          />
                          <span className="text-sm text-gray-700">{option} ({count})</span>
                        </label>
                      )
                    })}
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
                    {['All', 'Auction', 'Buy It Now'].map((option) => {
                      const count = getBuyingFormatCount(option)
                      return (
                        <label key={option} className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="radio"
                            name="buyingFormat"
                            value={option}
                            defaultChecked={option === 'All'}
                            onChange={() => setSelectedFilters({ ...selectedFilters, buyingFormat: option })}
                            className="text-orange-600"
                          />
                          <span className="text-sm text-gray-700">{option} ({count})</span>
                        </label>
                      )
                    })}
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
                    {categories.map((category) => {
                      const count = getCategoryCount(category)
                      const isChecked = selectedFilters.categories.includes(category)
                      return (
                        <label key={category} className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedFilters({
                                  ...selectedFilters,
                                  categories: [...selectedFilters.categories, category],
                                })
                              } else {
                                setSelectedFilters({
                                  ...selectedFilters,
                                  categories: selectedFilters.categories.filter((c) => c !== category),
                                })
                              }
                            }}
                            className="text-orange-600"
                          />
                          <span className="text-sm text-gray-700">{category} ({count})</span>
                        </label>
                      )
                    })}
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
                    {makes.map((make) => {
                      const count = getMakeCount(make)
                      const isChecked = selectedFilters.make.includes(make)
                      return (
                        <label key={make} className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedFilters({
                                  ...selectedFilters,
                                  make: [...selectedFilters.make, make],
                                })
                              } else {
                                const newSelectedMakes = selectedFilters.make.filter((m) => m !== make)
                                // Remove models that are no longer available after deselecting this make
                                const modelsForRemovedMake = makeToModels[make] || []
                                const newSelectedModels = selectedFilters.model.filter(
                                  (model) => !modelsForRemovedMake.includes(model)
                                )
                                setSelectedFilters({
                                  ...selectedFilters,
                                  make: newSelectedMakes,
                                  model: newSelectedModels,
                                })
                              }
                            }}
                            className="text-orange-600"
                          />
                          <span className="text-sm text-gray-700">{make} ({count})</span>
                        </label>
                      )
                    })}
                    <button className="text-sm text-blue-600 hover:text-blue-700 mt-2">See More</button>
                  </div>
                )}
              </div>

              {/* Model Filter */}
              <div className="border-b border-gray-200 pb-4 mb-4">
                <button
                  onClick={() => setFiltersOpen({ ...filtersOpen, model: !filtersOpen.model })}
                  className="w-full flex items-center justify-between text-sm font-medium text-gray-900 mb-2"
                >
                  <span>Model</span>
                  <ChevronDownIcon
                    className={`h-4 w-4 transition-transform ${filtersOpen.model ? 'rotate-180' : ''}`}
                  />
                </button>
                {filtersOpen.model && (
                  <div className="space-y-2 mt-2">
                    {availableModels.length > 0 ? (
                      availableModels.map((model) => {
                        const count = getModelCount(model)
                        const isChecked = selectedFilters.model.includes(model)
                        return (
                          <label key={model} className="flex items-center space-x-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setSelectedFilters({
                                    ...selectedFilters,
                                    model: [...selectedFilters.model, model],
                                  })
                                } else {
                                  setSelectedFilters({
                                    ...selectedFilters,
                                    model: selectedFilters.model.filter((m) => m !== model),
                                  })
                                }
                              }}
                              className="text-orange-600"
                            />
                            <span className="text-sm text-gray-700">{model} ({count})</span>
                          </label>
                        )
                      })
                    ) : (
                      <p className="text-sm text-gray-500 italic">Select a make to see models</p>
                    )}
                    {availableModels.length > 0 && (
                      <button className="text-sm text-blue-600 hover:text-blue-700 mt-2">See More</button>
                    )}
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
                    {['Under $10,000', '$10,000 - $20,000', 'Over $20,000'].map((option) => {
                      const count = getPriceCount(option)
                      const isChecked = selectedFilters.price.includes(option)
                      return (
                        <label key={option} className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedFilters({
                                  ...selectedFilters,
                                  price: [...selectedFilters.price, option],
                                })
                              } else {
                                setSelectedFilters({
                                  ...selectedFilters,
                                  price: selectedFilters.price.filter((p) => p !== option),
                                })
                              }
                            }}
                            className="text-orange-600"
                          />
                          <span className="text-sm text-gray-700">{option} ({count})</span>
                        </label>
                      )
                    })}
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
                    {['Under 1,000 mi', '1,001 mi - 5,000 mi'].map((option) => {
                      const count = getMeterCount(option)
                      const isChecked = selectedFilters.meter.includes(option)
                      return (
                        <label key={option} className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedFilters({
                                  ...selectedFilters,
                                  meter: [...selectedFilters.meter, option],
                                })
                              } else {
                                setSelectedFilters({
                                  ...selectedFilters,
                                  meter: selectedFilters.meter.filter((m) => m !== option),
                                })
                              }
                            }}
                            className="text-orange-600"
                          />
                          <span className="text-sm text-gray-700">{option} ({count})</span>
                        </label>
                      )
                    })}
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
                    style={{ backgroundColor: '#F3F4F6' }}
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

                    {/* Heart Icon with Watch Count */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleWatch(item.id)
                      }}
                      className="absolute top-2 right-2 z-10 flex flex-col items-center gap-0.5 p-1.5 rounded-lg bg-white/90 hover:bg-white shadow-sm transition-all"
                    >
                      {watchedItems.has(item.id) ? (
                        <HeartIconSolid className="h-4 w-4 text-red-500" />
                      ) : item.watchCount > 20 ? (
                        <HeartIcon className="h-4 w-4 text-red-500 animate-heart-glow" />
                      ) : (
                        <HeartIcon className="h-4 w-4 text-gray-600" />
                      )}
                      {item.watchCount > 0 && (
                        <span className="text-[10px] font-semibold text-gray-700 leading-none">
                          {item.watchCount}
                        </span>
                      )}
                    </button>

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
                            
                            // Calculate top offer (85-90% of price) for Buy it Now items (deterministic)
                            let topOffer = null
                            if (isBuyNow) {
                              const priceStr = item.price.replace(/[^0-9]/g, '')
                              const priceNum = parseInt(priceStr)
                              if (!isNaN(priceNum)) {
                                // Use item ID as seed for consistent percentage
                                const seed = parseInt(item.id) * 73 + 79
                                const seededRandom = (s: number) => {
                                  const x = Math.sin(s) * 10000
                                  return x - Math.floor(x)
                                }
                                const percentage = 0.85 + (seededRandom(seed) * 0.05) // Deterministic between 85-90%
                                const topOfferAmount = Math.floor(priceNum * percentage)
                                topOffer = `$${topOfferAmount.toLocaleString()}`
                              }
                            }
                            
                            return (
                              <>
                                {isBuyNow && topOffer && (
                                  <div className="text-xs text-gray-600 text-right mb-1 flex items-center justify-end gap-1">
                                    <TrophyIcon className="h-3.5 w-3.5 text-orange-600" />
                                    <span className="text-gray-500">{topOffer}</span>
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

