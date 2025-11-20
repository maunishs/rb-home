'use client'

import { useState } from 'react'
import {
  ChevronDownIcon,
  GlobeAltIcon,
} from '@heroicons/react/24/outline'

export default function Footer() {
  const [languageOpen, setLanguageOpen] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState('English')

  const languages = ['English', 'Français', 'Español', 'Deutsch']

  const footerLinks = {
    about: {
      title: 'About Ritchie Bros',
      links: [
        'About Ritchie Bros',
        'Our Team',
        'Careers',
        'Press',
        'Partnering with RB',
        "Collectors' Portal",
      ],
    },
    buy: {
      title: 'Buy',
      links: [
        'How to Buy',
        'Buyer Protection',
        'RB Stories',
        'Buyer Terms',
      ],
    },
    sell: {
      title: 'Sell',
      links: [
        'How to Sell',
        'Seller Tips',
        'Submission Guidelines',
        'Seller Terms',
        'Affiliates',
      ],
    },
    myRB: {
      title: 'My RB',
      links: [
        'Sign In',
        'Register',
        'Help Centre',
      ],
    },
  }

  const socialLinks = [
    {
      name: 'Facebook',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
    },
    {
      name: 'Instagram',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
    },
    {
      name: 'LinkedIn',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
  ]

  return (
    <footer className="bg-white border-t border-gray-100 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {/* About Ritchie Bros */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">
              {footerLinks.about.title}
            </h3>
            <ul className="space-y-3">
              {footerLinks.about.links.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Buy */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">
              {footerLinks.buy.title}
            </h3>
            <ul className="space-y-3">
              {footerLinks.buy.links.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Sell */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">
              {footerLinks.sell.title}
            </h3>
            <ul className="space-y-3">
              {footerLinks.sell.links.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* My RB */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">
              {footerLinks.myRB.title}
            </h3>
            <ul className="space-y-3">
              {footerLinks.myRB.links.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Language Selector and Social Media */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8 pb-8 border-b border-gray-100">
          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => setLanguageOpen(!languageOpen)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <GlobeAltIcon className="h-4 w-4" />
              <span>{selectedLanguage}</span>
              <ChevronDownIcon className="h-3 w-3" />
            </button>
            {languageOpen && (
              <div className="absolute bottom-full left-0 mb-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                <div className="py-1">
                  {languages.map((language) => (
                    <button
                      key={language}
                      onClick={() => {
                        setSelectedLanguage(language)
                        setLanguageOpen(false)
                      }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors ${
                        selectedLanguage === language
                          ? 'bg-orange-50 text-orange-600 font-medium'
                          : 'text-gray-700'
                      }`}
                    >
                      {language}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Social Media Icons */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href="#"
                className="text-gray-600 hover:text-gray-900 transition-colors"
                aria-label={social.name}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Policy Links and Copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-600">
          <div className="flex flex-wrap items-center gap-4 justify-center md:justify-start">
            <a href="#" className="hover:text-gray-900 transition-colors">
              Terms of Use
            </a>
            <a href="#" className="hover:text-gray-900 transition-colors">
              Data Protection & Privacy Notice
            </a>
            <a href="#" className="hover:text-gray-900 transition-colors">
              Cookie Policy
            </a>
            <a href="#" className="hover:text-gray-900 transition-colors">
              Law Enforcement Policy
            </a>
            <a href="#" className="hover:text-gray-900 transition-colors">
              Other Policies
            </a>
          </div>
          <div className="text-gray-600">
            © {new Date().getFullYear()} Ritchie Bros. Auctioneers
          </div>
        </div>
      </div>

      {/* Floating Register Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all">
          Register
        </button>
      </div>
    </footer>
  )
}
