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
            const { data } = await supabase
                .from('bio')
                .select('*')
                .single()
            
            if (data) setBio(data)
            setLoading(false)
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
                            ) : (
                                <Image
                                    src={bio?.photo_url || "/natalie_profile.jpg"}
                                    alt="Natalie's Portrait in Studio"
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    priority
                                    unoptimized
                                />
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
                        ) : (
                            <div className="whitespace-pre-wrap">
                                {bio?.statement || "Bio content coming soon..."}
                            </div>
                        )}
                    </div>

                    {/* Exhibitions Section */}
                    <div className="p-8 md:p-10 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 mb-20">
                        <h2 className="text-white text-xl font-light tracking-[0.1em] uppercase mb-10 text-center">
                            Exhibitions and Awards
                        </h2>
                        <div className="space-y-12">
                            {loading ? (
                                <div className="space-y-12">
                                    <div className="h-20 bg-white/5 rounded-2xl animate-pulse" />
                                    <div className="h-20 bg-white/5 rounded-2xl animate-pulse" />
                                </div>
                            ) : bio?.exhibitions?.length > 0 ? (
                                bio.exhibitions.map((item: string | any, index: number) => (
                                    <div key={index} className="flex flex-col md:flex-row gap-4 md:gap-12 group">
                                        <div className="flex-1">
                                            {typeof item === 'string' ? (
                                                <p className="text-white font-light text-base">{item}</p>
                                            ) : (
                                                <div className="flex flex-col md:flex-row gap-4 md:gap-12">
                                                    <div className="md:w-32 flex-shrink-0">
                                                        <div className="text-white/80 text-sm font-medium mb-1">{item.date}</div>
                                                        <div className="text-white/40 text-[10px] tracking-wider uppercase">{item.location}</div>
                                                    </div>
                                                    <div className="flex-1 space-y-2">
                                                        <h3 className="text-white text-lg font-light tracking-tight group-hover:text-white transition-colors uppercase">
                                                            {item.title}
                                                        </h3>
                                                        <div className="text-white/70 text-sm font-light">
                                                            {item.venue}
                                                        </div>
                                                        <p className="text-white/60 text-sm font-light leading-relaxed max-w-2xl">
                                                            {item.description}
                                                        </p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-white/20 text-center text-sm font-light italic">No exhibitions listed yet.</p>
                            )}
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
