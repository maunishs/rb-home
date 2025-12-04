'use client'

import { useState } from 'react'
import Link from 'next/link'
import LiveTicker from '@/components/LiveTicker'
import RBHeader from '@/components/RBHeader'
import CategoryPills from '@/components/CategoryPills'
import Footer from '@/components/Footer'
import ScrollToTop from '@/components/ScrollToTop'
import {
  CalendarIcon,
  MapPinIcon,
  ClockIcon,
  ShareIcon,
  HeartIcon,
  ChevronRightIcon,
  BookOpenIcon,
  DocumentTextIcon,
  AcademicCapIcon,
  ArrowUpTrayIcon,
  DocumentDuplicateIcon,
  ComputerDesktopIcon,
  UserGroupIcon,
  ArchiveBoxIcon,
} from '@heroicons/react/24/outline'
import {
  HeartIcon as HeartIconSolid,
} from '@heroicons/react/24/solid'

export default function AuctionPage() {
  const [activeTab, setActiveTab] = useState('information')
  const [isWatching, setIsWatching] = useState(false)
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

  // Sample auction data
  const auctionData = {
    id: '5575',
    title: '2025 December 3 Heavy Equipment & Machinery Signature® Auction #5575',
    currentBidTotal: '$7,638,472',
    totalLots: 77,
    auctionDate: 'December 3, 2025',
    auctionStatus: 'Auction in progress',
    location: {
      name: 'Ritchie Bros - Dallas',
      address: '2801 W. Airport Freeway',
      city: 'Dallas, TX 75261',
    },
    sessions: [
      {
        type: '1-Signature® Floor Session',
        lots: 'Lots 55001-55255',
        time: '10:00 AM Central Time',
        date: 'Wednesday, December 3, 2025',
        methods: 'Live Phone, Live Proxy, Mail, Fax, Internet, and Heritage Live',
      },
    ],
    lotsPerHour: 36,
  }

  const previewEvents = [
    {
      type: 'Full Preview',
      date: 'Saturday, November 1, 2025',
      time: '10:00 AM - 06:00 PM CT',
      location: 'Ritchie Bros - Dallas',
      access: 'Appointment Only',
    },
    {
      type: 'Reception Preview',
      date: 'Sunday, November 2, 2025',
      time: '11:00 AM - 02:00 PM CT',
      location: 'Ritchie Bros - Dallas',
      access: 'Public',
    },
    {
      type: 'Full Preview',
      date: 'Sunday, November 2, 2025',
      time: '11:00 AM - 05:00 PM CT',
      location: 'Ritchie Bros - Dallas',
      access: 'Public',
    },
  ]

  const featuredItems = [
    { id: 1, title: 'Caterpillar 336F Excavator', price: '$195,000' },
    { id: 2, title: 'Komatsu PC490LC Excavator', price: '$175,000' },
    { id: 3, title: 'Volvo EC480E Excavator', price: '$165,000' },
    { id: 4, title: 'John Deere 850K Dozer', price: '$145,000' },
  ]

  const mostPopular = [
    { id: 1, title: 'Caterpillar 336F Excavator', views: 4269 },
    { id: 2, title: 'Komatsu PC490LC Excavator', views: 4261 },
    { id: 3, title: 'Volvo EC480E Excavator', views: 3501 },
    { id: 4, title: 'John Deere 850K Dozer', views: 2983 },
  ]

  const mostActive = [
    { id: 1, title: 'Caterpillar 336F Excavator', bids: 3, tracks: 130 },
    { id: 2, title: 'Komatsu PC490LC Excavator', bids: 5, tracks: 90 },
    { id: 3, title: 'Volvo EC480E Excavator', bids: 11, tracks: 93 },
    { id: 4, title: 'John Deere 850K Dozer', bids: 4, tracks: 84 },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <LiveTicker />
      <RBHeader />
      <CategoryPills />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Breadcrumbs */}
        <div className="mb-6">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-blue-600 hover:text-blue-800 hover:underline font-mono">
              /home
            </Link>
            <span className="text-gray-400">/</span>
            <Link href="/auctions" className="text-blue-600 hover:text-blue-800 hover:underline font-mono">
              auctions
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-700 font-mono truncate max-w-2xl">{auctionData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}</span>
          </nav>
        </div>

        {/* Auction Title and Hero Image */}
        <div className="mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="relative aspect-video bg-gradient-to-br from-orange-200 to-orange-300 rounded-lg overflow-hidden mb-4">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl font-bold text-white/20 mb-2">RB</div>
                    <div className="text-white/30 text-sm">Heavy Equipment</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-1">
              <h1 className="text-2xl font-bold text-gray-900 mb-6">{auctionData.title}</h1>
              
              {/* Primary Action Button */}
              <div className="mb-3">
                <button className="w-full bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors shadow-md">
                  Bid Now
                </button>
              </div>

              {/* Secondary Action Button - Watch Auction */}
              <div className="mb-6">
                <button
                  onClick={() => setIsWatching(!isWatching)}
                  className="w-full flex items-center justify-center gap-2 border border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-lg font-semibold transition-colors bg-white"
                >
                  {isWatching ? (
                    <>
                      <HeartIconSolid className="h-5 w-5 text-red-500" />
                      <span>Watching</span>
                    </>
                  ) : (
                    <>
                      <HeartIcon className="h-5 w-5" />
                      <span>Watch Auction</span>
                    </>
                  )}
                </button>
              </div>

              {/* Current Bid Total */}
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-5 mb-6 border border-gray-200">
                <div className="text-xs text-gray-600 uppercase tracking-wide mb-2">Current Bid Total</div>
                <div className="text-3xl font-bold text-gray-900">{auctionData.currentBidTotal}</div>
                <div className="text-sm text-gray-600 mt-2">{auctionData.totalLots} Total Lots</div>
              </div>


              {/* Search within auction */}
              <div className="mb-4">
                <label className="block text-xs font-medium text-gray-700 mb-2 uppercase tracking-wide">
                  Search within this auction
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Search lots..."
                  />
                  <button className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-md text-sm font-medium transition-colors">
                    Search
                  </button>
                </div>
              </div>

              {/* Jump to lot */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-2 uppercase tracking-wide">
                  Jump to lot
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Enter lot number"
                  />
                  <button className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-md text-sm font-medium transition-colors">
                    Go
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Auction Overview */}
        <div className="mb-8">
          <p className="text-gray-700 leading-relaxed">
            This auction features a comprehensive selection of <strong>heavy equipment</strong> and 
            <strong> construction machinery</strong>, including premium <strong>excavators</strong>, 
            <strong> bulldozers</strong>, <strong>loaders</strong>, <strong>cranes</strong>, and 
            <strong> specialized equipment</strong> from leading manufacturers like 
            <strong> Caterpillar</strong>, <strong>Komatsu</strong>, <strong>Volvo</strong>, 
            <strong> John Deere</strong>, and <strong>Liebherr</strong>.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="flex space-x-8">
            {[
              { id: 'featured', label: 'Featured Items' },
              { id: 'type', label: 'Auction type' },
              { id: 'information', label: 'Auction information' },
              { id: 'faqs', label: 'Auction FAQs' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'information' && (
          <div className="space-y-12">
            {/* Auction Info Header */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                <ShareIcon className="h-5 w-5 text-orange-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Auction Info</h2>
            </div>

            {/* Status Bar */}
            <div className="flex items-center gap-4">
              <div className="bg-gray-100 px-5 py-2.5 rounded-md">
                <span className="text-sm font-medium text-gray-700">Live Auction in Progress</span>
              </div>
            </div>

            {/* Main Content - Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Left Column - Main Content */}
              <div className="lg:col-span-2 space-y-12">
                {/* Sessions Section */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">Sessions</h3>
                  <div className="space-y-4 mb-8">
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Proxy bidding ends ten minutes prior to the session start time.
                    </p>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Live Proxy bidding on Ritchie Bros Live now starts within 2 hours of when the auction opens for proxy bidding, and continues through the live session.
                    </p>
                  </div>
                  {auctionData.sessions.map((session, idx) => (
                    <div key={idx} className="bg-white rounded-lg p-6 border border-gray-200">
                      <div className="font-semibold text-gray-900 mb-3 text-lg">{session.type}</div>
                      <div className="text-sm text-gray-700 mb-2">
                        {session.lots} - {session.time}, {session.date}
                      </div>
                      <div className="text-sm text-gray-600">
                        {session.methods}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Buyer's Premium */}
                <div className="pt-8 border-t border-gray-200">
                  <div className="text-base text-gray-700 leading-relaxed">
                    <strong className="text-gray-900">Buyer's Premium per Lot:</strong> 25% of the successful bid (minimum <span className="text-red-600 font-semibold">$49</span>) per lot.
                  </div>
                </div>

                {/* Rate of Lots Sold */}
                <div className="pt-8 border-t border-gray-200">
                  <div className="text-sm text-gray-600">
                    Approximate rate of lots sold per hour: <strong className="text-gray-900">{auctionData.lotsPerHour} lots</strong>
                  </div>
                </div>
              </div>

              {/* Right Column - Sidebar */}
              <div className="space-y-12">
                {/* Auction Dates */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-600 mb-6 uppercase tracking-wide">Auction Dates</h3>
                  <div className="space-y-3">
                    <div className="bg-red-600 text-white px-5 py-2 rounded-full inline-block">
                      <span className="text-sm font-semibold">DECEMBER</span>
                    </div>
                    <div className="text-6xl font-bold text-gray-900 leading-none">3rd</div>
                    <div className="text-base text-gray-600">Wednesday</div>
                  </div>
                </div>

                {/* Auction Location */}
                <div className="pt-8 border-t border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">Auction Location</h3>
                  <div className="space-y-2 text-gray-700">
                    <div className="font-medium">{auctionData.location.name}</div>
                    <div>{auctionData.location.address}</div>
                    <div>{auctionData.location.city}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Lot Viewing Section */}
            <div className="pt-12 border-t border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-8">Lot Viewing</h3>
              <div className="space-y-4">
                {previewEvents.map((event, idx) => (
                  <div
                    key={idx}
                    className="bg-white border border-gray-200 rounded-lg p-6 hover:border-gray-300 transition-colors"
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex-1 space-y-1">
                        <div className="font-medium text-gray-900 text-base">{event.type}</div>
                        <div className="text-sm text-gray-600">
                          {event.date}, {event.time}
                        </div>
                        <div className="text-sm text-gray-600">{event.location}</div>
                      </div>
                      <div>
                        <span className={`px-4 py-2 rounded-full text-xs font-medium ${
                          event.access === 'Public'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {event.access}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'type' && (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Auction Type</h2>
              
              <div className="space-y-6">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Signature® Ritchie Bros Live</h3>
                  <p className="text-gray-700 mb-4">
                    This auction combines live floor bidding with online proxy bidding through Ritchie Bros Live. 
                    Bidders can participate in real-time during the live session or place proxy bids in advance.
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Signature Floor Session</h3>
                  <p className="text-gray-700 mb-4">
                    The floor session allows for live bidding at the auction location. Bidders can also participate 
                    via phone, proxy, mail, fax, or internet during this session.
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Proxy Bidding</h3>
                  <p className="text-gray-700 mb-4">
                    Place your maximum bid in advance, and our system will automatically bid on your behalf up to 
                    your maximum. Proxy bidding ends ten minutes prior to the session start time.
                  </p>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Other Information</h3>
                <div className="space-y-2">
                  {[
                    'Sales Tax Information',
                    'Terms and Conditions of Auction',
                    'Mail/Fax Your Bid',
                    'Telephone Bidding Times',
                    'Absentee Bidding Times',
                    'Download Printable Catalog',
                    'Request a View of the Auction',
                    'View the entire catalog on RB.com/5575',
                    'View List of Lots with Internet Bids',
                    'View Floor Session and License Information',
                    'Auction Location & Local Hotels',
                  ].map((link, idx) => (
                    <button
                      key={idx}
                      className="block text-left text-orange-600 hover:text-orange-700 hover:underline text-sm"
                    >
                      {link}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-8 bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Batch Tracking</h3>
                <p className="text-sm text-gray-700 mb-4">
                  Track specific groups of lots by entering lot numbers below.
                </p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter lot numbers (e.g., 55001-55010)"
                    className="flex-1 border border-gray-300 rounded-md px-4 py-2 text-sm"
                  />
                  <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-md text-sm font-medium">
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Featured Items Section - Always visible */}
        <div className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Featured Items</h2>
            <button className="text-sm text-gray-900 hover:text-gray-700 font-medium flex items-center space-x-1">
              <span>See all</span>
              <ChevronRightIcon className="h-4 w-4" />
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {featuredItems.map((item) => (
              <div key={item.id} className="group/item cursor-pointer">
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-lg transition-all overflow-hidden">
                  {/* Image with Badges */}
                  <div className="relative aspect-video overflow-hidden" style={{ backgroundColor: '#FFEDD5' }}>
                    {/* New Badge */}
                    <div className="absolute top-3 left-3 z-10 bg-blue-600 text-white text-xs font-semibold px-2.5 py-1 rounded-md shadow-lg">
                      New
                    </div>
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
                        <HeartIconSolid className="h-4 w-4 text-red-500" />
                      ) : (
                        <HeartIcon className="h-4 w-4 text-gray-600" />
                      )}
                    </button>
                    {/* RB Logo in center */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-white/20">RB</div>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    {/* Title */}
                    <h3 className="text-sm font-semibold text-gray-900 mb-3 line-clamp-2 leading-snug min-h-[2.5rem]">
                      {item.title}
                    </h3>

                    {/* Pricing */}
                    <div className="space-y-2">
                      {/* Price */}
                      <p className="text-lg font-bold text-gray-900">
                        {item.price}
                      </p>
                      {/* Great Price Badge */}
                      <div className="inline-block bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-1 rounded-md">
                        Great Price
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Most Popular Section */}
        <div className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Most Popular</h2>
            <button className="text-sm text-gray-900 hover:text-gray-700 font-medium flex items-center space-x-1">
              <span>See all</span>
              <ChevronRightIcon className="h-4 w-4" />
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {mostPopular.map((item) => (
              <div key={item.id} className="group/item cursor-pointer">
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-lg transition-all overflow-hidden">
                  {/* Image with Badges */}
                  <div className="relative aspect-video overflow-hidden" style={{ backgroundColor: '#FFEDD5' }}>
                    {/* New Badge */}
                    <div className="absolute top-3 left-3 z-10 bg-blue-600 text-white text-xs font-semibold px-2.5 py-1 rounded-md shadow-lg">
                      New
                    </div>
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
                        <HeartIconSolid className="h-4 w-4 text-red-500" />
                      ) : (
                        <HeartIcon className="h-4 w-4 text-gray-600" />
                      )}
                    </button>
                    {/* RB Logo in center */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-white/20">RB</div>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    {/* Title */}
                    <h3 className="text-sm font-semibold text-gray-900 mb-3 line-clamp-2 leading-snug min-h-[2.5rem]">
                      {item.title}
                    </h3>

                    {/* Views */}
                    <p className="text-xs text-gray-600">
                      Views: {item.views.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Most Active Section */}
        <div className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Most Active</h2>
            <button className="text-sm text-gray-900 hover:text-gray-700 font-medium flex items-center space-x-1">
              <span>See all</span>
              <ChevronRightIcon className="h-4 w-4" />
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {mostActive.map((item) => (
              <div key={item.id} className="group/item cursor-pointer">
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-lg transition-all overflow-hidden">
                  {/* Image with Badges */}
                  <div className="relative aspect-video overflow-hidden" style={{ backgroundColor: '#FFEDD5' }}>
                    {/* New Badge */}
                    <div className="absolute top-3 left-3 z-10 bg-blue-600 text-white text-xs font-semibold px-2.5 py-1 rounded-md shadow-lg">
                      New
                    </div>
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
                        <HeartIconSolid className="h-4 w-4 text-red-500" />
                      ) : (
                        <HeartIcon className="h-4 w-4 text-gray-600" />
                      )}
                    </button>
                    {/* RB Logo in center */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-white/20">RB</div>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    {/* Title */}
                    <h3 className="text-sm font-semibold text-gray-900 mb-3 line-clamp-2 leading-snug min-h-[2.5rem]">
                      {item.title}
                    </h3>

                    {/* Bids and Tracks */}
                    <div className="flex gap-4 text-xs text-gray-600">
                      <span>Bids: {item.bids}</span>
                      <span>Tracks: {item.tracks}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Auction Resources */}
        <div className="mt-12 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Auction Resources</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              {
                icon: BookOpenIcon,
                title: 'Order our auction catalogs',
                color: 'text-amber-700',
                bgColor: 'bg-amber-50',
              },
              {
                icon: BookOpenIcon, // Placeholder, will be replaced with custom render
                title: 'Nine ways to bid in a Ritchie Bros Auction',
                color: 'text-amber-700',
                bgColor: 'bg-amber-50',
              },
              {
                icon: AcademicCapIcon,
                title: 'Should you consign to a Ritchie Bros Auction?',
                color: 'text-amber-700',
                bgColor: 'bg-amber-50',
              },
              {
                icon: ArrowUpTrayIcon,
                title: 'From consignment to settlement walkthrough',
                color: 'text-amber-700',
                bgColor: 'bg-amber-50',
              },
              {
                icon: DocumentTextIcon,
                title: 'Terms and conditions of auction',
                color: 'text-amber-700',
                bgColor: 'bg-amber-50',
              },
              {
                icon: DocumentDuplicateIcon,
                title: 'Learn about our family of auctions',
                color: 'text-amber-700',
                bgColor: 'bg-amber-50',
              },
              {
                icon: ComputerDesktopIcon,
                title: 'Internet bidding tutorial',
                color: 'text-amber-700',
                bgColor: 'bg-amber-50',
              },
              {
                icon: UserGroupIcon,
                title: 'See What Other Collectors Have to Say About Ritchie Bros',
                color: 'text-amber-700',
                bgColor: 'bg-amber-50',
              },
              {
                icon: ArchiveBoxIcon,
                title: 'Permanent auction archives',
                color: 'text-amber-700',
                bgColor: 'bg-amber-50',
              },
            ].map((resource, idx) => {
              const IconComponent = resource.icon
              const isCustomIcon = idx === 1 // The "9" icon is at index 1
              
              return (
                <button
                  key={idx}
                  className={`${resource.bgColor} hover:bg-amber-100 rounded-lg p-6 text-center transition-all hover:shadow-md group`}
                >
                  <div className="flex flex-col items-center justify-center space-y-3">
                    <div className={`${resource.color} group-hover:scale-110 transition-transform`}>
                      {isCustomIcon ? (
                        <div className="w-12 h-12 rounded-full bg-amber-700 text-white flex items-center justify-center font-bold text-lg mx-auto">
                          9
                        </div>
                      ) : (
                        <IconComponent className="h-12 w-12" />
                      )}
                    </div>
                    <p className="text-sm font-medium text-gray-900 leading-tight">
                      {resource.title}
                    </p>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* FAQs Section */}
        <div className="mt-12 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              {
                question: "What is Ritchie Bros' return policy?",
                answer: "All items are sold 'as is, where is' without warranty. For Internet auctions (excluding Signature Auctions), we offer a three (3) day return policy. Please note that return policies may vary by auction type. For specific terms, please refer to the Additional Terms and Conditions for each auction. We strongly recommend inspecting items before bidding.",
              },
              {
                question: "Do I have to pay sales tax?",
                answer: "Lots are subject to sales/use taxes unless we have a valid resale certificate or tax exemption permit on file. By bidding, you agree to pay any applicable sales tax unless you provide a valid resale certificate or tax exemption permit. For a list of states where Ritchie Bros collects sales tax, please contact our customer service team.",
              },
              {
                question: "What is the Buyer's Premium?",
                answer: "A Buyer's Premium is an additional charge added per lot to the successful bid price. The minimum Buyer's Premium varies by category and auction type. For specific Buyer's Premium rates for individual lots, please check the lot details page. The Buyer's Premium is clearly displayed on each lot page before you place your bid.",
              },
              {
                question: "How much will my fees, shipping, and handling be?",
                answer: "Fees, shipping, handling, and private carrier insurance vary by item type, quantity, and value. For wine shipments, special handling and insurance requirements may apply. You can use our Shipping Calculator on each lot page to estimate shipping costs. For detailed fee information or assistance, please contact us through our customer service portal.",
              },
              {
                question: "If I win, when will I receive my lots?",
                answer: "Most items ship within 7-14 business days after payment is received and processed. Certain categories such as Action Figures & Toys, African Art, Animation Art, and oversized items may require 14-21 business days for shipping. Premium Domain Transfers typically take 7-30 days. Please note that payment method may affect shipping times. For specific shipping timelines, please refer to the Terms & Conditions for your auction.",
              },
            ].map((faq, idx) => (
              <div key={idx} className="border-l-4 border-orange-500 bg-gray-50 rounded-r-lg p-6 hover:bg-gray-100 transition-colors">
                <h3 className="text-lg font-semibold text-blue-600 mb-3">{faq.question}</h3>
                <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <Footer />
      <ScrollToTop />
    </div>
  )
}

