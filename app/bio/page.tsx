"use client"

import Header from "@/components/header"
import ShaderBackground from "@/components/shader-background"
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"

export default function BioPage() {
    const [bio, setBio] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchBio = async () => {
            try {
                const { data } = await supabase
                    .from('bio')
                    .select('*')
                    .maybeSingle()
                
                setBio(data ?? null)
            } catch (error) {
                console.error("Error fetching bio:", error)
                setBio(null)
            } finally {
                setLoading(false)
            }
        }
        fetchBio()
    }, [])

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
                            <span className="text-white/90 text-xs font-light relative z-10">🇨🇦 Toronto-based Artist with 🇺🇦 Ukrainian roots</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-light text-white mb-8">
                            <span className="font-medium">About</span> Natalie
                        </h1>

                        <div className="relative w-48 h-48 md:w-64 md:h-64 mx-auto rounded-full overflow-hidden mb-12 border-2 border-white/20 group shadow-xl shadow-black/20 bg-white/5">
                            {loading ? (
                                <div className="absolute inset-0 animate-pulse bg-white/5" />
                            ) : bio?.photo_url ? (
                                <Image
                                    src={bio.photo_url}
                                    alt="Natalie's Portrait in Studio"
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    priority
                                    unoptimized
                                />
                            ) : (
                                <div className="absolute inset-0 flex items-center justify-center text-white/20 text-sm font-light">
                                    Photo coming soon
                                </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                        </div>
                    </div>

                    {/* Bio Content */}
                    <div className="p-8 md:p-10 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 text-white text-sm font-light leading-relaxed mb-16 space-y-4">
                        {loading ? (
                            Array.from({ length: 4 }).map((_, i) => (
                                <div key={i} className="h-4 bg-white/5 rounded w-full animate-pulse" />
                            ))
                        ) : bio?.statement ? (
                            <div className="whitespace-pre-wrap">
                                {bio.statement}
                            </div>
                        ) : (
                            <p className="text-white/40 italic text-center">Artist statement coming soon.</p>
                        )}
                    </div>

                    {/* Exhibitions Section */}
                    {(!loading && (bio?.exhibitions?.length > 0 || bio?.awards?.length > 0)) && (
                        <div className="p-8 md:p-10 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 mb-20">
                            <h2 className="text-white text-xl font-light tracking-[0.1em] uppercase mb-10 text-center">
                                Exhibitions and Awards
                            </h2>
                            <div className="space-y-4">
                                {bio?.exhibitions?.map((item: any, index: number) => {
                                    const title = typeof item === 'string' ? item : item.title
                                    const year = typeof item === 'object' ? item.year : ''
                                    const location = typeof item === 'object' ? item.location : ''
                                    return (
                                        <div key={index} className="flex items-baseline justify-between gap-4 pb-4 border-b border-white/5">
                                            <span className="text-white font-light text-sm">{title}</span>
                                            <span className="text-white/40 text-xs font-light whitespace-nowrap">
                                                {[year, location].filter(Boolean).join(' · ')}
                                            </span>
                                        </div>
                                    )
                                })}
                                {bio?.awards?.map((item: any, index: number) => {
                                    const title = typeof item === 'string' ? item : item.title
                                    const year = typeof item === 'object' ? item.year : ''
                                    const location = typeof item === 'object' ? item.location : ''
                                    return (
                                        <div key={`award-${index}`} className="flex items-baseline justify-between gap-4 pb-4 border-b border-white/5">
                                            <span className="text-white/70 font-light text-sm">🏆 {title}</span>
                                            <span className="text-white/40 text-xs font-light whitespace-nowrap">
                                                {[year, location].filter(Boolean).join(' · ')}
                                            </span>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )}

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
