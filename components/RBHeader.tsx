'use client'

import { useState, useRef, useEffect } from 'react'
import {
  ChevronDownIcon,
  BellIcon,
  ShoppingCartIcon,
  MagnifyingGlassIcon,
  ClockIcon,
  FireIcon,
} from '@heroicons/react/24/outline'
import StatsPill from './StatsPill'

export default function RBHeader() {
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [watchlistOpen, setWatchlistOpen] = useState(false)
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [allCategoriesOpen, setAllCategoriesOpen] = useState(false)
  const userMenuRef = useRef<HTMLDivElement>(null)
  const watchlistRef = useRef<HTMLDivElement>(null)
  const searchContainerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const allCategoriesRef = useRef<HTMLDivElement>(null)

  const categories = [
    'Heavy Equipment',
    'Construction',
    'Agriculture',
    'Transportation',
    'Mining',
    'Industrial',
  ]

  // Sample data for search suggestions
  const recentSearches = ['Excavator', 'Bulldozer', 'Loader', 'Crane']
  const trendingItems = [
    'Skid Steer',
    'Telehandler',
    'Backhoe',
    'Wheel Loader',
    'Dump Truck',
  ]
  const searchNarrowPills = [
    'Under $50k',
    'Under $100k',
    'Near me',
    'Closing today',
    'New listings',
  ]
  const popularCategories = [
    'Skid steers',
    'Bulldozers',
    'Excavators',
    'Track loaders',
    'Wheel loaders',
    'Motor Graders',
    'Backhoe loaders',
    'Bucket trucks',
    'Telehandlers',
    'Dump trucks',
  ]
  const browsingHistory = [
    {
      id: '1',
      year: '2018',
      make: 'Mack',
      model: 'GU713',
      color: 'bg-orange-200',
    },
    {
      id: '2',
      year: '2019',
      make: 'Wacker Neuson',
      model: 'SW24',
      color: 'bg-blue-200',
    },
    {
      id: '3',
      year: '2019',
      make: 'Caterpillar',
      model: '326FL',
      color: 'bg-green-200',
    },
    {
      id: '4',
      year: '2019',
      make: 'John Deere',
      model: '300G',
      color: 'bg-purple-200',
    },
  ]
  const closingToday = [
    { id: '1', title: 'Auction #12345', time: '2h', price: '$45,000' },
    { id: '2', title: 'Auction #12346', time: '3h', price: '$78,500' },
    { id: '3', title: 'Auction #12347', time: '5h', price: '$32,000' },
  ]
  const dealsOfDay = [
    { id: '1', title: 'Excavator 2020', discount: '25% OFF', price: '$95,000' },
    { id: '2', title: 'Loader 2019', discount: '30% OFF', price: '$65,000' },
    { id: '3', title: 'Bulldozer 2021', discount: '20% OFF', price: '$125,000' },
  ]

  // Sample counts
  const watchlistCount = 12
  const notificationCount = 8
  const cartCount = 3

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setUserMenuOpen(false)
      }
      if (
        watchlistRef.current &&
        !watchlistRef.current.contains(event.target as Node)
      ) {
        setWatchlistOpen(false)
      }
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setIsSearchFocused(false)
      }
      if (
        allCategoriesRef.current &&
        !allCategoriesRef.current.contains(event.target as Node)
      ) {
        setAllCategoriesOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleSearchClick = (query: string) => {
    setSearchValue(query)
    inputRef.current?.focus()
  }

  return (
    <header className="bg-gray-50 border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      {/* Top Bar - User greeting and navigation */}
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-2 text-sm">
            <div className="flex items-center space-x-4">
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center space-x-1 text-gray-700 hover:text-gray-900"
                >
                  <span>Hi maunish!</span>
                  <ChevronDownIcon className="h-3 w-3" />
                </button>
                {userMenuOpen && (
                  <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                    <div className="py-1">
                      <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                        Account Settings
                      </button>
                      <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <a href="#" className="text-gray-700 hover:text-gray-900">
                Deals for you
              </a>
              <a href="#" className="text-gray-700 hover:text-gray-900">
                Financing
              </a>
              <a href="#" className="text-gray-700 hover:text-gray-900">
                Help & Contact
              </a>
            </div>
            <div className="flex items-center space-x-4">
              <a href="#" className="text-gray-700 hover:text-gray-900">
                Sell
              </a>
              <div className="relative" ref={watchlistRef}>
                <button
                  onClick={() => setWatchlistOpen(!watchlistOpen)}
                  className="flex items-center space-x-1 text-gray-700 hover:text-gray-900"
                >
                  <span>Watchlist</span>
                  <ChevronDownIcon className="h-3 w-3" />
                </button>
                {watchlistOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                    <div className="py-1">
                      <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                        View All
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <div className="relative">
                <button className="flex items-center space-x-1 text-gray-700 hover:text-gray-900">
                  <span>My RB</span>
                  <ChevronDownIcon className="h-3 w-3" />
                </button>
              </div>
              <button className="relative p-1 text-gray-700 hover:text-gray-900">
                <BellIcon className="h-5 w-5" />
                {notificationCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-semibold rounded-full h-5 w-5 flex items-center justify-center min-w-[20px]">
                    {notificationCount > 99 ? '99+' : notificationCount}
                  </span>
                )}
              </button>
              <button className="relative p-1 text-gray-700 hover:text-gray-900">
                <ShoppingCartIcon className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs font-semibold rounded-full h-5 w-5 flex items-center justify-center min-w-[20px]">
                    {cartCount > 99 ? '99+' : cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Backdrop Overlay - Outside header for full viewport coverage */}
      {isSearchFocused && (
        <div
          className="fixed inset-0 bg-black/50 z-[40]"
          onClick={() => setIsSearchFocused(false)}
        />
      )}

      {/* Main Header - Logo, Search, Actions */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 py-4">
          <div className="flex items-center space-x-3 flex-shrink-0">
            <div className="bg-orange-500 text-white font-bold text-2xl px-3 py-1.5 rounded">
              rb
            </div>
            <div className="hidden sm:block flex-shrink-0">
              <StatsPill />
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 min-w-0 flex items-center gap-3">
            <div className="flex-1 relative" ref={searchContainerRef}>
              <div className="flex items-center bg-white border-2 border-gray-400 rounded-full hover:border-orange-400 focus-within:border-orange-500 transition-all shadow-sm">
              <input
                ref={inputRef}
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                placeholder="Search by category, make, or model"
                className="flex-1 px-5 py-2.5 text-base border-0 focus:outline-none focus:ring-0 bg-transparent rounded-l-full min-w-0"
              />
              <div className="relative flex-shrink-0" ref={allCategoriesRef}>
                <button
                  onClick={() => {
                    setAllCategoriesOpen(!allCategoriesOpen)
                  }}
                  className="px-4 py-2.5 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 border-l border-gray-100 whitespace-nowrap rounded-r-full"
                >
                  All Categories
                  <ChevronDownIcon className="h-4 w-4 inline-block ml-1" />
                </button>
                {allCategoriesOpen && (
                  <div className="absolute right-0 top-full mt-1 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-[60]">
                    <div className="py-1">
                      {categories.map((category) => (
                        <button
                          key={category}
                          className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-gray-700"
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              </div>

              {/* Search Suggestions Overlay */}
              {isSearchFocused && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-2xl shadow-xl z-[50] max-h-[600px] overflow-y-auto">
                <div className="p-6 space-y-6">
                  {/* Popular Categories - Prominent */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-3">
                      Popular Categories
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {popularCategories.map((category, index) => (
                        <button
                          key={index}
                          onClick={() => handleSearchClick(category)}
                          className="px-4 py-2 bg-white border border-gray-300 hover:border-orange-400 hover:bg-orange-50 text-gray-700 hover:text-orange-700 rounded-lg text-sm font-medium transition-colors"
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Browsing History - Prominent */}
                  {browsingHistory.length > 0 && (
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900 mb-3">
                        Browsing History
                      </h3>
                      <div className="flex gap-4 overflow-x-auto pb-2 hide-scrollbar">
                        {browsingHistory.map((item) => (
                          <button
                            key={item.id}
                            onClick={() =>
                              handleSearchClick(`${item.year} ${item.make} ${item.model}`)
                            }
                            className="flex-shrink-0 w-48 group"
                          >
                            <div className={`relative rounded-lg overflow-hidden ${item.color} aspect-video mb-2 border border-gray-200 group-hover:border-orange-400 transition-colors`}>
                            </div>
                            <p className="text-sm font-medium text-gray-900 text-left">
                              {item.year} {item.make} {item.model}
                            </p>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Recent Searches */}
                  {recentSearches.length > 0 && (
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-sm font-semibold text-gray-900">
                          Recent Searches
                        </h3>
                        <button className="text-xs text-gray-500 hover:text-gray-700">
                          Clear
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {recentSearches.map((search, index) => (
                          <button
                            key={index}
                            onClick={() => handleSearchClick(search)}
                            className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2"
                          >
                            <ClockIcon className="h-4 w-4" />
                            <span>{search}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Trending Items */}
                  <div>
                    <div className="flex items-center space-x-2 mb-3">
                      <FireIcon className="h-4 w-4 text-orange-500" />
                      <h3 className="text-sm font-semibold text-gray-900">
                        Trending Now
                      </h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {trendingItems.map((item, index) => (
                        <button
                          key={index}
                          onClick={() => handleSearchClick(item)}
                          className="px-3 py-1.5 bg-orange-50 hover:bg-orange-100 text-orange-700 border border-orange-200 rounded-lg text-sm font-medium transition-colors"
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Narrow Search Results */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-3">
                      Narrow Your Search
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {searchNarrowPills.map((pill, index) => (
                        <button
                          key={index}
                          onClick={() => handleSearchClick(pill)}
                          className="px-3 py-1.5 bg-white border border-gray-300 hover:border-orange-400 hover:bg-orange-50 text-gray-700 hover:text-orange-700 rounded-lg text-sm font-medium transition-colors"
                        >
                          {pill}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Closing Today */}
                  <div>
                    <div className="flex items-center space-x-2 mb-3">
                      <ClockIcon className="h-4 w-4 text-red-500" />
                      <h3 className="text-sm font-semibold text-gray-900">
                        Closing Today
                      </h3>
                    </div>
                    <div className="space-y-2">
                      {closingToday.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => handleSearchClick(item.title)}
                          className="w-full text-left px-4 py-3 bg-red-50 hover:bg-red-100 border border-red-200 rounded-lg transition-colors"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-gray-900">
                                {item.title}
                              </p>
                              <p className="text-xs text-gray-500 mt-0.5">
                                {item.time} remaining
                              </p>
                            </div>
                            <p className="text-sm font-semibold text-gray-900">
                              {item.price}
                            </p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Deals of the Day */}
                  <div>
                    <div className="flex items-center space-x-2 mb-3">
                      <FireIcon className="h-4 w-4 text-orange-500" />
                      <h3 className="text-sm font-semibold text-gray-900">
                        Deals of the Day
                      </h3>
                    </div>
                    <div className="space-y-2">
                      {dealsOfDay.map((deal) => (
                        <button
                          key={deal.id}
                          onClick={() => handleSearchClick(deal.title)}
                          className="w-full text-left px-4 py-3 bg-orange-50 hover:bg-orange-100 border border-orange-200 rounded-lg transition-colors"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-gray-900">
                                {deal.title}
                              </p>
                              <p className="text-xs text-orange-600 font-semibold mt-0.5">
                                {deal.discount}
                              </p>
                            </div>
                            <p className="text-sm font-semibold text-gray-900">
                              {deal.price}
                            </p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              )}
            </div>
            <button
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2.5 rounded-full font-medium transition-colors flex items-center space-x-2 flex-shrink-0 shadow-sm"
              aria-label="Search"
            >
              <MagnifyingGlassIcon className="h-5 w-5" />
              <span className="hidden sm:inline">Search</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}