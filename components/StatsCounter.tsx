'use client'

import { useState, useEffect } from 'react'

interface Stat {
  label: string
  value: string
  prefix?: string
  suffix?: string
}

const stats: Stat[] = [
  {
    label: 'Items Sold',
    value: '2,847,392',
    suffix: '',
  },
  {
    label: 'Bids Placed',
    value: '18,234,567',
    suffix: '',
  },
  {
    label: 'GTV',
    value: '45.8',
    prefix: '$',
    suffix: 'B',
  },
]

// Helper function to get initial display value
const getInitialDisplayValue = (statIndex: number) => {
  const currentStat = stats[statIndex]
  const numericValue = parseFloat(currentStat.value.replace(/,/g, ''))
  if (currentStat.suffix === 'B') {
    return numericValue.toFixed(1)
  } else {
    return Math.floor(numericValue).toLocaleString()
  }
}

export default function StatsCounter() {
  const [currentStatIndex, setCurrentStatIndex] = useState(0)
  const [displayValue, setDisplayValue] = useState(() =>
    getInitialDisplayValue(0)
  )
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentStatIndex((prev) => (prev + 1) % stats.length)
        setIsAnimating(false)
      }, 300)
    }, 4000) // Switch every 4 seconds

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const currentStat = stats[currentStatIndex]
    const targetValue = currentStat.value
    const numericValue = parseFloat(targetValue.replace(/,/g, ''))

    if (isNaN(numericValue)) {
      setDisplayValue(targetValue)
      return
    }

    // Animate the number
    const duration = 1000
    const steps = 60
    const increment = numericValue / steps
    let current = 0
    let step = 0

    const timer = setInterval(() => {
      step++
      current += increment
      if (step >= steps) {
        current = numericValue
        clearInterval(timer)
      }

      // Format based on stat type
      if (currentStat.suffix === 'B') {
        // Billions
        setDisplayValue(current.toFixed(1))
      } else {
        // Regular numbers with commas
        setDisplayValue(Math.floor(current).toLocaleString())
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [currentStatIndex, isAnimating])

  const currentStat = stats[currentStatIndex]

  return (
    <div className="bg-gradient-to-r from-orange-50 to-orange-100 border-b border-orange-200 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center space-x-8">
          <div
            className={`text-center transition-all duration-500 ${
              isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
            }`}
          >
            <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">
              {currentStat.prefix}
              <span className="tabular-nums">{displayValue}</span>
              {currentStat.suffix && (
                <span className="text-2xl md:text-3xl ml-1">
                  {currentStat.suffix}
                </span>
              )}
            </div>
            <div className="text-sm md:text-base font-medium text-gray-700">
              {currentStat.label}
            </div>
          </div>
        </div>

        {/* Indicator Dots */}
        <div className="flex justify-center space-x-2 mt-4">
          {stats.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setIsAnimating(true)
                setTimeout(() => {
                  setCurrentStatIndex(index)
                  setIsAnimating(false)
                }, 300)
              }}
              className={`h-2 rounded-full transition-all ${
                index === currentStatIndex
                  ? 'w-8 bg-orange-600'
                  : 'w-2 bg-orange-300 hover:bg-orange-400'
              }`}
              aria-label={`Show ${stats[index].label}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
