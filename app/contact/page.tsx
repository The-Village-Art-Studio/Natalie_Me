"use client"

import Header from "@/components/header"
import ShaderBackground from "@/components/shader-background"
import Link from "next/link"

export default function ContactPage() {
    return (
        <ShaderBackground>
            <Header />
            <main className="relative z-10 flex items-center justify-center min-h-screen px-8">
                <div className="max-w-lg text-center">
                    {/* Page Title */}
                    <h1 className="text-4xl md:text-5xl font-light text-white mb-6">
                        <span className="font-medium italic instrument">Get in Touch</span>
                    </h1>

                    {/* Bio */}
                    <p className="text-white/60 text-sm font-light mb-8 leading-relaxed">
                        Hi! My name is Natalie, and I&apos;m a painter with a Ukrainian background. For inquiries about commissions, collaborations, or to purchase artwork, feel free to reach out through Instagram.
                    </p>

                    {/* Contact Card */}
                    <div className="inline-flex flex-col items-center gap-6 p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
                        {/* Instagram */}
                        <a
                            href="https://www.instagram.com/natalie_me.art"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 text-white hover:text-white/80 transition-colors duration-200"
                        >
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                            </svg>
                            <span className="text-sm font-light">@natalie_me.art</span>
                        </a>

                        {/* Agency Profile */}
                        <a
                            href="https://www.publicdisplayagency.ca/artists/natalie-me"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 text-white/60 hover:text-white transition-colors duration-200"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                            </svg>
                            <span className="text-xs font-light">Public Display Agency Profile</span>
                        </a>
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
