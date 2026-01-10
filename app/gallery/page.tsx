"use client"

import Header from "@/components/header"
import ShaderBackground from "@/components/shader-background"
import Image from "next/image"
import Link from "next/link"

const artworks = [
    {
        id: 1,
        src: "https://cdn.prod.website-files.com/67ab77b0c518eeb5b3f7bb80/686ea1c42da4640cc8844d4f_20250518_222807-1-.webp",
        alt: "Artwork by Natalie",
    },
    {
        id: 2,
        src: "https://cdn.prod.website-files.com/67ab77b0c518eeb5b3f7bb80/686ea1c5b15fadce8728c538_20250607_165959.webp",
        alt: "Artwork by Natalie",
    },
    {
        id: 3,
        src: "https://cdn.prod.website-files.com/67ab77b0c518eeb5b3f7bb80/686ea1c98c8b7f686f86f104_20240819_213706.webp",
        alt: "Artwork by Natalie",
    },
    {
        id: 4,
        src: "https://cdn.prod.website-files.com/67ab77b0c518eeb5b3f7bb80/686ea1cc945d429204faa4b9_20250426_141642.webp",
        alt: "Artwork by Natalie",
    },
    {
        id: 5,
        src: "https://cdn.prod.website-files.com/67ab77b0c518eeb5b3f7bb80/686ea1cf4c11b0f0cd7b1704_20250615_195502.webp",
        alt: "Artwork by Natalie",
    },
]

export default function GalleryPage() {
    return (
        <ShaderBackground>
            <Header />
            <main className="relative z-10 px-8 pt-24 pb-16">
                <div className="max-w-6xl mx-auto">
                    {/* Page Title */}
                    <div className="mb-12">
                        <h1 className="text-4xl md:text-5xl font-light text-white mb-4">
                            <span className="font-medium italic instrument">Gallery</span>
                        </h1>
                        <p className="text-white/60 text-sm font-light max-w-md">
                            A collection of original paintings that capture the beauty in everyday moments.
                        </p>
                    </div>

                    {/* Artwork Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {artworks.map((artwork) => (
                            <div
                                key={artwork.id}
                                className="group relative aspect-square overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 transition-all duration-300 hover:border-white/30 hover:scale-[1.02]"
                            >
                                <Image
                                    src={artwork.src}
                                    alt={artwork.alt}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    unoptimized
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </div>
                        ))}
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
