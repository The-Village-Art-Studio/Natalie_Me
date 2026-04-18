"use client"

import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Artwork } from "@/app/gallery/page.tsx"
import Image from "next/image"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface GalleryModalProps {
    isOpen: boolean
    setIsOpen: (open: boolean) => void
    artworks: Artwork[]
    currentIndex: number | null
    setCurrentIndex: (index: number | null) => void
}

export default function GalleryModal({
    isOpen,
    setIsOpen,
    artworks,
    currentIndex,
    setCurrentIndex,
}: GalleryModalProps) {
    const handlePrevious = useCallback(() => {
        if (currentIndex === null) return
        const nextIndex = (currentIndex - 1 + artworks.length) % artworks.length
        setCurrentIndex(nextIndex)
    }, [currentIndex, artworks.length, setCurrentIndex])

    const handleNext = useCallback(() => {
        if (currentIndex === null) return
        const nextIndex = (currentIndex + 1) % artworks.length
        setCurrentIndex(nextIndex)
    }, [currentIndex, artworks.length, setCurrentIndex])

    const handleKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (!isOpen) return
            if (e.key === "ArrowLeft") handlePrevious()
            if (e.key === "ArrowRight") handleNext()
            if (e.key === "Escape") setIsOpen(false)
        },
        [isOpen, handlePrevious, handleNext, setIsOpen]
    )

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [handleKeyDown])

    if (currentIndex === null) return null

    const artwork = artworks[currentIndex]

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent
                className="max-w-6xl w-[95vw] sm:max-w-none h-fit max-h-[95vh] p-0 border-none bg-transparent shadow-none flex flex-col items-center justify-center overflow-hidden"
                showCloseButton={false}
            >
                <div className="relative flex flex-col items-center group w-full">
                    {/* Close Button */}
                    <button
                        onClick={() => setIsOpen(false)}
                        className="absolute top-4 right-4 z-50 p-2 rounded-full bg-black/20 backdrop-blur-md border border-white/10 text-white/70 hover:text-white hover:bg-black/40 transition-all duration-300"
                    >
                        <X className="w-5 h-5" />
                    </button>

                    {/* Navigation Buttons */}
                    <button
                        onClick={handlePrevious}
                        className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-black/20 backdrop-blur-md border border-white/10 text-white/70 hover:text-white hover:bg-black/40 transition-all duration-300 opacity-0 group-hover:opacity-100 hidden md:flex"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>

                    <button
                        onClick={handleNext}
                        className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-black/20 backdrop-blur-md border border-white/10 text-white/70 hover:text-white hover:bg-black/40 transition-all duration-300 opacity-0 group-hover:opacity-100 hidden md:flex"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>

                    {/* Content Container */}
                    <div className="flex flex-col md:flex-row max-w-6xl w-full bg-black/40 backdrop-blur-2xl rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
                        {/* Image Section */}
                        <div className="relative aspect-square md:aspect-auto md:w-2/3 h-[50vh] md:h-[80vh] overflow-hidden bg-white/5">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={artwork.id}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 1.05 }}
                                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                                    className="relative w-full h-full"
                                >
                                    <Image
                                        src={artwork.src}
                                        alt={artwork.alt}
                                        fill
                                        className="object-contain p-4 md:p-8"
                                        priority
                                        unoptimized
                                    />
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Metadata Section */}
                        <div className="md:w-1/3 p-8 flex flex-col justify-center border-t md:border-t-0 md:border-l border-white/10">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={artwork.id}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                                    className="space-y-6"
                                >
                                    <div>
                                        <h2 className="text-3xl font-light text-white mb-2 leading-tight">
                                            {artwork.title}
                                        </h2>
                                        <div className="flex items-center gap-3 text-white/40 text-sm font-light uppercase tracking-widest">
                                            <span>{artwork.year}</span>
                                            <span className="w-1 h-1 rounded-full bg-white/20" />
                                            <span>{artwork.medium}</span>
                                        </div>
                                    </div>
                                    
                                    <div className="h-px w-full bg-gradient-to-r from-white/10 to-transparent" />
                                    
                                    <p className="text-white/60 text-base font-light leading-relaxed">
                                        {artwork.description}
                                    </p>

                                    {/* Mobile Navigation */}
                                    <div className="flex items-center justify-between pt-8 md:hidden">
                                        <button
                                            onClick={handlePrevious}
                                            className="flex items-center gap-2 text-white/40 hover:text-white transition-colors"
                                        >
                                            <ChevronLeft className="w-5 h-5" />
                                            <span className="text-xs uppercase tracking-widest">Prev</span>
                                        </button>
                                        <span className="text-white/20 text-xs font-light">
                                            {currentIndex + 1} / {artworks.length}
                                        </span>
                                        <button
                                            onClick={handleNext}
                                            className="flex items-center gap-2 text-white/40 hover:text-white transition-colors"
                                        >
                                            <span className="text-xs uppercase tracking-widest">Next</span>
                                            <ChevronRight className="w-5 h-5" />
                                        </button>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
