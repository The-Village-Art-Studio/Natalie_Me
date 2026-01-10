"use client"

import Header from "@/components/header"
import ShaderBackground from "@/components/shader-background"
import Link from "next/link"

export default function BioPage() {
    return (
        <ShaderBackground>
            <Header />
            <main className="relative z-10 flex items-center justify-center min-h-screen px-8 py-24">
                <div className="max-w-2xl">
                    {/* Page Title */}
                    <div className="mb-8">
                        <div
                            className="inline-flex items-center px-3 py-1 rounded-full bg-white/5 backdrop-blur-sm mb-4 relative"
                            style={{ filter: "url(#glass-effect)" }}
                        >
                            <div className="absolute top-0 left-1 right-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full" />
                            <span className="text-white/90 text-xs font-light relative z-10">🇺🇦 Ukrainian-born Artist</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-light text-white mb-2">
                            <span className="font-medium italic instrument">About</span> Natalie
                        </h1>
                    </div>

                    {/* Bio Content */}
                    <div className="space-y-6 text-white/70 text-sm font-light leading-relaxed">
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

                    {/* CTA Buttons */}
                    <div className="flex items-center gap-4 flex-wrap mt-10">
                        <Link
                            href="/gallery"
                            className="px-8 py-3 rounded-full bg-white text-black font-normal text-xs transition-all duration-200 hover:bg-white/90 cursor-pointer"
                        >
                            View My Work
                        </Link>
                        <Link
                            href="/contact"
                            className="px-8 py-3 rounded-full bg-transparent border border-white/30 text-white font-normal text-xs transition-all duration-200 hover:bg-white/10 hover:border-white/50 cursor-pointer"
                        >
                            Get in Touch
                        </Link>
                    </div>

                    {/* Back to Home */}
                    <div className="mt-12">
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
