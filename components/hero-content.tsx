"use client"

import Link from "next/link"

export default function HeroContent() {
  return (
    <main className="absolute inset-0 z-20 flex items-center justify-center pl-[10%] pr-[20%] pointer-events-none">
      <div className="max-w-lg pointer-events-auto">
        <div className="text-left">
          <div
            className="inline-flex items-center px-3 py-1 rounded-full bg-black/[0.03] backdrop-blur-sm mb-4 relative border border-black/[0.05]"
            style={{
              filter: "url(#glass-effect)",
            }}
          >
            <div className="absolute top-0 left-1 right-1 h-px bg-gradient-to-r from-transparent via-black/10 to-transparent rounded-full" />
            <span className="text-stone-800 text-xs font-light relative z-10">🇨🇦 Toronto-based Artist with 🇺🇦 Ukrainian roots</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-6xl md:leading-16 tracking-tight font-light text-stone-900 mb-4">
            <span className="font-medium the-seasons">Natalie<span className="font-sans font-thin">_</span>Me</span>
            <br />
            <span className="text-3xl md:text-4xl font-light tracking-tight text-stone-750 mt-2 block">Visual Artist</span>
          </h1>

          {/* Description */}
          <p className="text-xs font-light text-stone-600 mb-4 leading-relaxed">
            Painting is a meditative and relaxing process, a way to express my feelings and emotional state. I love noticing beauty in the world and drawing others&apos; attention to it.
          </p>

          {/* Buttons */}
          <div className="flex items-center gap-4 flex-wrap">
            <Link
              href="/gallery"
              className="px-8 py-3 rounded-full bg-transparent border border-stone-300 text-stone-800 font-normal text-xs transition-all duration-200 hover:bg-black/[0.04] hover:border-stone-400 cursor-pointer"
            >
              View Gallery
            </Link>
            <Link
              href="/contact"
              className="px-8 py-3 rounded-full bg-stone-900 text-white font-normal text-xs transition-all duration-200 hover:bg-stone-850 cursor-pointer"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
