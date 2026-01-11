"use client"

import Header from "@/components/header"
import ShaderBackground from "@/components/shader-background"
import Link from "next/link"
import Image from "next/image"

const exhibitions = [
    {
        date: "07/2025",
        location: "Toronto, Canada",
        title: "64th Toronto Outdoor Art Fair",
        venue: "Nathan Phillips Square, Booth #E515",
        description: "Art Encounters Program",
    },
    {
        date: "08/2024",
        location: "Toronto, Canada",
        title: "FREEDOMNESS",
        venue: "Taras Shevchenko Museum",
        description: "Group exhibition of Ukrainian art by Vytik Art Collective",
    },
    {
        date: "07/2024",
        location: "Toronto, Canada",
        title: "63rd Toronto Outdoor Art Fair",
        venue: "Nathan Phillips Square, Booth #E303",
        description: "Art Encounters Program recipient",
    },
    {
        date: "06/2024",
        location: "Toronto, Canada",
        title: "WORKFLOW X FINELINE.ART",
        venue: "The Drake Hotel",
        description: "Solo exhibition",
    },
    {
        date: "05/2024",
        location: "Toronto, Canada",
        title: "The Reset: REMINISCENCE",
        venue: "Gibson House History Museum",
        description: "City of Toronto grant recipient for implementation of new media installation in one of Toronto History Museums under mentorship of multidisciplinary artist Yung Yemi",
    },
    {
        date: "04/2024",
        location: "Toronto, Canada",
        title: "GRADEX 109",
        venue: "OCAD University",
        description: "Art and design group exhibition",
    },
    {
        date: "02/2024",
        location: "Toronto, Canada",
        title: "YOUTH, TRUTH & IMAGINATION",
        venue: "Joseph D. Carrier Gallery",
        description: "Group art show curated by Ignazio Nicastro (ICC Contemporary Gallery)",
    },
]

export default function BioPage() {
    return (
        <ShaderBackground>
            <Header />
            <main className="relative z-10 min-h-screen px-8 py-24">
                <div className="max-w-3xl mx-auto">
                    {/* Header Info */}
                    <div className="mb-12">
                        <div
                            className="inline-flex items-center px-3 py-1 rounded-full bg-white/5 backdrop-blur-sm mb-4 relative"
                            style={{ filter: "url(#glass-effect)" }}
                        >
                            <div className="absolute top-0 left-1 right-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full" />
                            <span className="text-white/90 text-xs font-light relative z-10">🇨🇦 Toronto-based Artist</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-light text-white mb-8">
                            <span className="font-medium italic instrument">About</span> Natalie
                        </h1>

                        <div className="relative w-full aspect-[4/3] md:aspect-[21/9] rounded-3xl overflow-hidden mb-12 border border-white/10 group">
                            <Image
                                src="/natalie_profile.png"
                                alt="Natalie's Portrait in Studio"
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                priority
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                        </div>
                    </div>

                    {/* Bio Content */}
                    <div className="p-8 md:p-10 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 space-y-6 text-white text-sm font-light leading-relaxed mb-16">
                        <p>
                            Hi! My name is Natalie, and I&apos;m a painter with a Ukrainian background. I&apos;ve been immersed in art since kindergarten, though I&apos;ve never attended a formal art school.
                        </p>
                        <p>
                            For me, painting is a meditative and relaxing process, a way to express my feelings and emotional state. Each brushstroke is an extension of my inner world, capturing moments of tranquility, joy, and reflection.
                        </p>
                        <p>
                            I love noticing beauty in the world and drawing others&apos; attention to it. I believe our world is incredibly beautiful, and you can find that beauty in the small details of everyday life — the way light falls through a window, the colors of a sunset, or the texture of a flower petal.
                        </p>
                        <p>
                            My work aims to share these moments of wonder with you, inviting you to pause and appreciate the extraordinary within the ordinary.
                        </p>
                    </div>

                    {/* Exhibitions Section */}
                    <div className="p-8 md:p-10 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 mb-20">
                        <h2 className="text-white text-xl font-light tracking-[0.1em] uppercase mb-10 text-center">
                            Exhibitions and Awards
                        </h2>
                        <div className="space-y-12">
                            {exhibitions.map((item, index) => (
                                <div key={index} className="flex flex-col md:flex-row gap-4 md:gap-12 group">
                                    <div className="md:w-32 flex-shrink-0">
                                        <div className="text-white/80 text-sm font-medium mb-1">{item.date}</div>
                                        <div className="text-white/40 text-[10px] tracking-wider uppercase">{item.location}</div>
                                    </div>
                                    <div className="flex-1 space-y-2">
                                        <h3 className="text-white text-lg font-light tracking-tight group-hover:text-white transition-colors uppercase">
                                            {item.title}
                                        </h3>
                                        <div className="text-white/70 text-sm font-light italic">
                                            {item.venue}
                                        </div>
                                        <p className="text-white/60 text-sm font-light leading-relaxed max-w-2xl">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Back to Home */}
                    <div className="mt-20 flex justify-center border-t border-white/10 pt-12">
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
