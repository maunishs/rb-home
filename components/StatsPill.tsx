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

export default function StatsPill() {
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
    }, 8000) // Switch every 8 seconds (slower)

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

    // Start from a value close to target (only animate last few digits)
    const incrementAmount = currentStat.suffix === 'B' ? 0.1 : (numericValue > 1000000 ? 2 : 1)
    const startValue = numericValue - incrementAmount
    const target = numericValue

    // Animate only the last few digits (subtle increment)
    const duration = 2000
    const steps = 20
    const increment = incrementAmount / steps
    let current = startValue
    let step = 0

    const timer = setInterval(() => {
      step++
      current += increment
      if (step >= steps) {
        current = target
        clearInterval(timer)
      }

      // Format based on stat type
      if (currentStat.suffix === 'B') {
        setDisplayValue(current.toFixed(1))
      } else {
        setDisplayValue(Math.floor(current).toLocaleString())
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [currentStatIndex, isAnimating])

  const currentStat = stats[currentStatIndex]

  return (
    <div
      className={`bg-orange-50 border border-orange-200 rounded-full px-3 py-1.5 flex items-center space-x-2 transition-opacity duration-500 w-[185px] ${
        isAnimating ? 'opacity-60' : 'opacity-80'
      }`}
      title={currentStat.label}
    >
      <span className="text-xs font-medium text-gray-500 whitespace-nowrap flex-shrink-0">
        {currentStat.label}:
      </span>
      <span className="text-sm font-semibold text-gray-700 tabular-nums text-right flex-1">
        {currentStat.prefix}
        {displayValue}
        {currentStat.suffix && (
          <span className="text-xs ml-0.5">{currentStat.suffix}</span>
        )}
      </span>
    </div>
  )
}
