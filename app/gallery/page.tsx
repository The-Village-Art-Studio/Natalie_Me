"use client"

import Header from "@/components/header"
import ShaderBackground from "@/components/shader-background"
import Image from "next/image"
import Link from "next/link"

const DEFAULT_ARTWORKS: Artwork[] = [
    {
        id: "1",
        src: "/gallery/mossy_depths.jpg",
        alt: "Mossy Depths - Mixed Media Painting",
        title: "Mossy Depths",
        year: "2025",
        medium: "Mixed Media on Canvas",
        description: "A deep exploration of organic textures and muted greens, inspired by the forest floor."
    },
    {
        id: "2",
        src: "/gallery/pink_bloom.jpg",
        alt: "Pink Bloom - Acrylic Painting",
        title: "Pink Bloom",
        year: "2025",
        medium: "Acrylic on Canvas",
        description: "An expressive floral piece capturing the vibrant energy of a spring blossom in full light."
    },
    {
        id: "3",
        src: "/gallery/celestial_drift.jpg",
        alt: "Celestial Drift - Oil and Acrylic Painting",
        title: "Celestial Drift",
        year: "2024",
        medium: "Oil and Acrylic on Canvas",
        description: "A cosmic journey through ethereal light and color, blending classical oil techniques with modern acrylics."
    },
    {
        id: "4",
        src: "/gallery/frosted_berries.jpg",
        alt: "Frosted Berries - Textured Acrylic Painting",
        title: "Frosted Berries",
        year: "2025",
        medium: "Textured Acrylic",
        description: "A tactile representation of winter's first frost on wild berries, using heavy-body acrylics for depth."
    },
    {
        id: "5",
        src: "/gallery/alpine_quiet.jpg",
        alt: "Alpine Quiet - Oil Painting",
        title: "Alpine Quiet",
        year: "2025",
        medium: "Oil on Canvas",
        description: "The stillness of the mountains reflected in a calm, monochromatic palette of blues and grays."
    }
]

import GalleryModal from "@/components/gallery-modal"
import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"

export default function GalleryPage() {
    const [artworks, setArtworks] = useState<Artwork[]>([])
    const [selectedArtworkIndex, setSelectedArtworkIndex] = useState<number | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchArtworks = async () => {
            try {
                const { data, error } = await supabase
                    .from('artworks')
                    .select('*')
                    .order('order', { ascending: true })
                
                if (data && data.length > 0) {
                    setArtworks(data)
                } else {
                    setArtworks(DEFAULT_ARTWORKS)
                }
            } catch (error) {
                console.error("Error fetching artworks:", error)
                setArtworks(DEFAULT_ARTWORKS)
            } finally {
                setLoading(false)
            }
        }
        fetchArtworks()
    }, [])

    return (
        <ShaderBackground>
            <Header />
            <main className="relative z-10 px-8 pt-24 pb-16">
                <div className="max-w-6xl mx-auto">
                    {/* Page Title */}
                    <div className="mb-12">
                        <h1 className="text-4xl md:text-5xl font-light text-white mb-4">
                            <span className="font-medium">Gallery</span>
                        </h1>
                        <p className="text-white/60 text-sm font-light max-w-md">
                            A collection of original paintings that capture the beauty in everyday moments.
                        </p>
                    </div>

                    {/* Artwork Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {loading ? (
                            Array.from({ length: 6 }).map((_, i) => (
                                <div key={i} className="aspect-square rounded-2xl bg-white/5 animate-pulse" />
                            ))
                        ) : artworks.length > 0 ? (
                            artworks.map((artwork, index) => (
                                <div
                                    key={artwork.id}
                                    onClick={() => {
                                        setSelectedArtworkIndex(index)
                                        setIsModalOpen(true)
                                    }}
                                    className="group relative aspect-square overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 transition-all duration-300 hover:border-white/30 hover:scale-[1.02] cursor-pointer"
                                >
                                    <Image
                                        src={artwork.image_url || artwork.src}
                                        alt={artwork.alt || artwork.title}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        unoptimized
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                                        <h3 className="text-white font-medium text-lg translate-y-2 group-hover:translate-y-0 transition-transform duration-300">{artwork.title}</h3>
                                        <p className="text-white/60 text-xs font-light translate-y-2 group-hover:translate-y-0 transition-transform duration-300 delay-75">{artwork.medium}, {artwork.year}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full py-20 text-center">
                                <p className="text-white/40 text-sm font-light">No artworks found in the gallery.</p>
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

            <GalleryModal
                isOpen={isModalOpen}
                setIsOpen={setIsModalOpen}
                artworks={artworks}
                currentIndex={selectedArtworkIndex}
                setCurrentIndex={setSelectedArtworkIndex}
            />
        </ShaderBackground>
    )
}
