'use client'

import HorizontalScroll from './HorizontalScroll'

// Heavy machinery images from Unsplash - varied equipment types
const heavyMachineryImages = [
  'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=300&fit=crop', // Excavator
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop', // Bulldozer
  'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop', // Loader
  'https://images.unsplash.com/photo-1581091870623-1d2c5a0b2a5b?w=400&h=300&fit=crop', // Crane
  'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=300&fit=crop&q=80', // Excavator variant
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop&q=80', // Bulldozer variant
  'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop&q=80', // Loader variant
  'https://images.unsplash.com/photo-1581091870623-1d2c5a0b2a5b?w=400&h=300&fit=crop&q=80', // Crane variant
  'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=300&fit=crop&q=80', // Excavator
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop&q=80', // Bulldozer
  'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop&q=80', // Loader
  'https://images.unsplash.com/photo-1581091870623-1d2c5a0b2a5b?w=400&h=300&fit=crop&q=80', // Crane
  'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=300&fit=crop&q=80', // Excavator
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop&q=80', // Bulldozer
  'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop&q=80', // Loader
]

const generateItems = (
  count: number,
  baseTitle: string,
  basePrice: number,
  badge?: string
) => {
  return Array.from({ length: count }, (_, i) => ({
    id: `${baseTitle}-${i + 1}`,
    title: `${baseTitle} ${i + 1}`,
    price: `$${(basePrice + i * 5000).toLocaleString()}`,
    image: heavyMachineryImages[i % heavyMachineryImages.length],
    badge,
  }))
}

export default function HorizontalScrollSections() {
  const watchlistItems = generateItems(10, 'Excavator', 45000)
  const similarItems = generateItems(12, 'Loader', 55000)
  const trendingItems = generateItems(15, 'Bulldozer', 75000, 'TRENDING')
  const priceDropsItems = generateItems(10, 'Crane', 95000, 'PRICE DROP')
  const dealOfDayItems = generateItems(8, 'Dump Truck', 65000, 'DEAL')

  return (
    <div className="bg-gray-50 py-8">
      <HorizontalScroll title="Watchlist" items={watchlistItems} />
      <HorizontalScroll title="Similar Items" items={similarItems} />
      <HorizontalScroll title="Trending Items" items={trendingItems} />
      <HorizontalScroll title="Price Drops" items={priceDropsItems} />
      <HorizontalScroll title="Deal of the Day" items={dealOfDayItems} />
    </div>
  )
}
