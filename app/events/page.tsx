"use client"

import Header from "@/components/header"
import ShaderBackground from "@/components/shader-background"
import Link from "next/link"

const events = [
  {
    id: 1,
    title: "THE GREAT OUTDOORS",
    date: "January 15 - January 27 2026",
    location: "NORTHERN CONTEMPORARY GALLERY",
    description: "A NATURE THEMED ART SHOW.",
  },
  {
    id: 2,
    title: "MIAMI ART WEEK 2025",
    date: "Decemebr 3 - 7 2025",
    location: "Mana Wynwood Convention Center",
    description: "Group Exhibition by ARTBOXY.",
  },
]

export default function EventsPage() {
  return (
    <ShaderBackground>
      <Header />
      <main className="relative z-10 px-8 pt-24 pb-16">
        <div className="max-w-4xl mx-auto">
          {/* Page Title */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-light text-white mb-4">
              <span className="font-medium italic instrument">Events</span> & Shows
            </h1>
            <p className="text-white/60 text-sm font-light max-w-md">
              Stay updated on upcoming exhibitions, workshops, and artist talks.
            </p>
          </div>

          {/* Events List */}
          <div className="space-y-6">
            {events.length > 0 ? (
              events.map((event) => (
                <div
                  key={event.id}
                  className="p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 group hover:border-white/30 transition-all duration-300"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                    <div>
                      <span className="text-white/40 text-xs font-light tracking-widest uppercase mb-1 block">
                        {event.date}
                      </span>
                      <h2 className="text-2xl font-light text-white group-hover:text-white transition-colors">
                        {event.title}
                      </h2>
                    </div>
                    <div className="flex items-center gap-2 text-white/60 text-xs font-light">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {event.location}
                    </div>
                  </div>
                  <p className="text-white/60 text-sm font-light leading-relaxed max-w-2xl mb-6">
                    {event.description}
                  </p>
                  <button className="px-6 py-2 rounded-full border border-white/20 text-white text-xs font-light hover:bg-white/10 transition-all">
                    Learn More
                  </button>
                </div>
              ))
            ) : (
              <div className="p-12 text-center rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
                <p className="text-white/40 text-sm font-light italic">No upcoming events scheduled at this time. Please check back later.</p>
              </div>
            )}
          </div>

          {/* Back to Home */}
          <div className="mt-16 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm font-light transition-colors duration-200"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </Link>
          </div>
        </div>
      </main>
    </ShaderBackground>
  )
}
