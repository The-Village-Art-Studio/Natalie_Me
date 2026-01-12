"use client"

import Link from "next/link"
import { useState, useEffect } from "react"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  const closeMenu = () => setIsMenuOpen(false)

  return (
    <>
      <header className="relative z-20 flex items-center justify-between p-6">
        {/* Logo / Name */}
        <div className="flex items-center">
          <Link href="/" className="text-white text-xl tracking-tight">
            <span className="font-medium italic instrument">Natalie_Me</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-2">
          <Link
            href="/bio"
            className="text-white/80 hover:text-white text-sm font-light px-3 py-2 rounded-full hover:bg-white/10 transition-all duration-200"
          >
            Bio
          </Link>
          <Link
            href="/gallery"
            className="text-white/80 hover:text-white text-sm font-light px-3 py-2 rounded-full hover:bg-white/10 transition-all duration-200"
          >
            Gallery
          </Link>
          <Link
            href="/events"
            className="text-white/80 hover:text-white text-sm font-light px-3 py-2 rounded-full hover:bg-white/10 transition-all duration-200"
          >
            Events
          </Link>
          <Link
            href="/contact"
            className="text-white/80 hover:text-white text-sm font-light px-3 py-2 rounded-full hover:bg-white/10 transition-all duration-200"
          >
            Contact
          </Link>
        </nav>

        {/* Desktop Instagram Button Group with Arrow */}
        <div id="gooey-btn" className="hidden md:flex relative items-center group" style={{ filter: "url(#gooey-filter)" }}>
          <a
            href="https://www.instagram.com/natalie_me.art"
            target="_blank"
            rel="noopener noreferrer"
            className="absolute right-0 px-2.5 py-2 rounded-full bg-white text-black font-normal text-xs transition-all duration-300 hover:bg-white/90 cursor-pointer h-8 flex items-center justify-center -translate-x-10 group-hover:-translate-x-19 z-0"
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </a>
          <a
            href="https://www.instagram.com/natalie_me.art"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 rounded-full bg-white text-black font-normal text-xs transition-all duration-300 hover:bg-white/90 cursor-pointer h-8 flex items-center z-10"
          >
            Instagram
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden flex flex-col justify-center items-center w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 transition-all duration-300 hover:bg-white/20"
          aria-label="Toggle menu"
        >
          <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1' : ''}`} />
          <span className={`block w-5 h-0.5 bg-white my-1 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1' : ''}`} />
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-50 md:hidden transition-all duration-300 ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
          onClick={closeMenu}
        />

        {/* Menu Content */}
        <div
          className={`absolute top-0 right-0 h-full w-full max-w-sm bg-gradient-to-br from-purple-900/90 via-black/95 to-black/95 backdrop-blur-xl border-l border-white/10 transition-transform duration-500 ease-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
        >
          {/* Close Button */}
          <button
            onClick={closeMenu}
            className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 border border-white/20 text-white transition-all duration-300 hover:bg-white/20"
            aria-label="Close menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Navigation Links */}
          <nav className="flex flex-col items-start justify-center h-full px-12 space-y-2">
            <Link
              href="/"
              onClick={closeMenu}
              className="text-white/60 hover:text-white text-sm font-light tracking-wider uppercase transition-colors duration-200"
            >
              Home
            </Link>
            <Link
              href="/bio"
              onClick={closeMenu}
              className="text-white text-4xl font-light tracking-tight hover:text-white/80 transition-colors duration-200"
            >
              Bio
            </Link>
            <Link
              href="/gallery"
              onClick={closeMenu}
              className="text-white text-4xl font-light tracking-tight hover:text-white/80 transition-colors duration-200"
            >
              Gallery
            </Link>
            <Link
              href="/events"
              onClick={closeMenu}
              className="text-white text-4xl font-light tracking-tight hover:text-white/80 transition-colors duration-200"
            >
              Events
            </Link>
            <Link
              href="/contact"
              onClick={closeMenu}
              className="text-white text-4xl font-light tracking-tight hover:text-white/80 transition-colors duration-200"
            >
              Contact
            </Link>

            {/* Mobile Instagram Button */}
            <div className="pt-8 w-full">
              <a
                href="https://www.instagram.com/natalie_me.art"
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenu}
                className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white text-black font-medium text-sm transition-all duration-300 hover:bg-white/90"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
                Follow on Instagram
              </a>
            </div>
          </nav>
        </div>
      </div>
    </>
  )
}
