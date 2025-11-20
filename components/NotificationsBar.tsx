'use client'

import { useState, useEffect } from 'react'
import { XMarkIcon } from '@heroicons/react/24/outline'

interface Notification {
  id: string
  message: string
  type: 'warning' | 'info' | 'urgent'
  image: string
}

const initialNotifications: Notification[] = [
  {
    id: '1',
    message: 'You were outbid on an item',
    type: 'warning',
    image: '',
  },
  {
    id: '2',
    message: 'Complete profile',
    type: 'info',
    image: '',
  },
  {
    id: '3',
    message: 'Your watched item closes in 30 mins',
    type: 'urgent',
    image: '',
  },
]

export default function NotificationsBar() {
  const [notifications, setNotifications] = useState<Notification[]>(
    initialNotifications
  )
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  // Auto-rotate notifications (slowed down drastically)
  useEffect(() => {
    if (notifications.length === 0) return

    const interval = setInterval(() => {
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % notifications.length)
        setIsAnimating(false)
      }, 500) // Half of transition duration
    }, 15000) // Change every 15 seconds (drastically slowed)

    return () => clearInterval(interval)
  }, [notifications.length])

  const dismissNotification = (id: string) => {
    const index = notifications.findIndex((n) => n.id === id)
    setNotifications((prev) => prev.filter((notif) => notif.id !== id))
    
    // Adjust current index if needed
    if (index <= currentIndex && currentIndex > 0) {
      setCurrentIndex((prev) => Math.max(0, prev - 1))
    } else if (currentIndex >= notifications.length - 1) {
      setCurrentIndex(0)
    }
  }

  if (notifications.length === 0) {
    return null
  }

  const currentNotification = notifications[currentIndex]
  const bgColor =
    currentNotification.type === 'urgent'
      ? 'bg-red-50 border-red-200'
      : currentNotification.type === 'warning'
      ? 'bg-orange-50 border-orange-200'
      : 'bg-blue-50 border-blue-200'

  const textColor =
    currentNotification.type === 'urgent'
      ? 'text-red-700'
      : currentNotification.type === 'warning'
      ? 'text-orange-700'
      : 'text-blue-700'

  return (
    <div className="relative w-[280px] flex items-center">
      <div
        className={`flex items-center gap-3 px-3 py-2 rounded-lg border ${bgColor} w-full transition-all duration-1000 ease-in-out ${
          isAnimating ? 'opacity-0 -translate-x-4' : 'opacity-100 translate-x-0'
        }`}
        style={{ minHeight: '72px' }}
      >
        {/* Placeholder Image */}
        <div className="w-12 h-12 rounded-lg bg-orange-100 flex-shrink-0" />
        
        {/* Title */}
        <span className={`text-xs font-medium ${textColor} whitespace-nowrap flex-1`}>
          {currentNotification.message}
        </span>
        
        {/* X Button */}
        <button
          onClick={() => dismissNotification(currentNotification.id)}
          className={`flex-shrink-0 p-0.5 rounded hover:bg-white/50 transition-colors ${textColor}`}
          aria-label="Dismiss notification"
        >
          <XMarkIcon className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  )
}

