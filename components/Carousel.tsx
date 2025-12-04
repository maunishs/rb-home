'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'

export default function Carousel() {
  const router = useRouter()
  const [currentSlide, setCurrentSlide] = useState(0)
  const slides = [
    {
      id: 1,
      title: 'Featured Auction',
      subtitle: 'Heavy Equipment & Machinery',
      color: 'bg-orange-200',
    },
    {
      id: 2,
      title: 'Construction Vehicles',
      subtitle: 'Excavators, Loaders & More',
      color: 'bg-blue-200',
    },
    {
      id: 3,
      title: 'Industrial Equipment',
      subtitle: 'Premium Quality Machinery',
      color: 'bg-green-200',
    },
    {
      id: 4,
      title: 'Fleet Vehicles',
      subtitle: 'Trucks & Commercial Vehicles',
      color: 'bg-purple-200',
    },
    {
      id: 5,
      title: 'Special Event',
      subtitle: 'Limited Time Offers',
      color: 'bg-red-200',
    },
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  return (
    <div className="relative h-56 md:h-[300px] rounded-xl overflow-hidden shadow-lg bg-gray-100">
        {/* Slide Background Color */}
        <div
          className={`absolute inset-0 transition-opacity duration-500 ${slides[currentSlide].color}`}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent" />
        </div>

        {/* Slide Content */}
        <div className="relative h-full flex items-center justify-start px-6 md:px-12">
          <div className="text-gray-800 max-w-2xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">
              {slides[currentSlide].title}
            </h2>
            <p className="text-base md:text-lg mb-4 text-gray-700">
              {slides[currentSlide].subtitle}
            </p>
            <button
              onClick={() => router.push('/auction')}
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg text-sm font-semibold transition-colors"
            >
              View Auction
            </button>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all"
          aria-label="Previous slide"
        >
          <ChevronLeftIcon className="h-6 w-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all"
          aria-label="Next slide"
        >
          <ChevronRightIcon className="h-6 w-6" />
        </button>

        {/* Dots Indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentSlide
                  ? 'w-8 bg-white'
                  : 'w-2 bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
    </div>
  )
}
