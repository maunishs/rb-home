'use client'

import { useState, useEffect } from 'react'
import { ChevronUpIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline'

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button when user scrolls down
      if (window.scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)

    return () => {
      window.removeEventListener('scroll', toggleVisibility)
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  const handleChatClick = () => {
    // Handle chat button click
    console.log('Chat clicked')
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col-reverse gap-3">
      {/* Chat Icon - Always Visible */}
      <button
        onClick={handleChatClick}
        className="bg-white border border-gray-300 rounded-full p-3 shadow-lg hover:shadow-xl transition-all hover:bg-gray-50"
        aria-label="Open chat"
      >
        <ChatBubbleLeftRightIcon className="h-6 w-6 text-black" />
      </button>

      {/* Up Arrow - Visible on Scroll, appears above chat icon */}
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="bg-white border border-gray-300 rounded-full p-3 shadow-lg hover:shadow-xl transition-all hover:bg-gray-50"
          aria-label="Scroll to top"
        >
          <ChevronUpIcon className="h-6 w-6 text-black" />
        </button>
      )}
    </div>
  )
}

