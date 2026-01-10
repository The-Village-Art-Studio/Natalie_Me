"use client"

import Link from "next/link"

export default function Header() {
  return (
    <header className="relative z-20 flex items-center justify-between p-6">
      {/* Logo / Name */}
      <div className="flex items-center">
        <Link href="/" className="text-white text-xl tracking-tight">
          <span className="font-medium italic instrument">Natalie_Me</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex items-center space-x-2">
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
          href="/contact"
          className="text-white/80 hover:text-white text-sm font-light px-3 py-2 rounded-full hover:bg-white/10 transition-all duration-200"
        >
          Contact
        </Link>
      </nav>

      {/* Instagram Button Group with Arrow */}
      <div id="gooey-btn" className="relative flex items-center group" style={{ filter: "url(#gooey-filter)" }}>
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
    </header>
  )
}
