'use client'

export default function QuickActions() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Complete Outbid */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-2">
            Complete outbid
          </h3>
          <p className="text-xs text-gray-600">You&apos;ve been outbid on items</p>
        </div>

        {/* Closing Now */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-2">
            Closing Now
          </h3>
          <ul className="space-y-1 text-xs text-gray-600">
            <li>• Auction #12345 - Heavy Equipment</li>
            <li>• Auction #12346 - Construction Vehicles</li>
            <li>• Auction #12347 - Industrial Machinery</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
