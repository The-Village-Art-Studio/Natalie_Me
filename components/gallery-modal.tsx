"use client"

import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Artwork } from "@/app/types"
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
                className="max-w-6xl w-[95vw] sm:max-w-none h-[100dvh] md:h-fit md:max-h-[95vh] p-0 border-none bg-transparent shadow-none flex flex-col items-center justify-start md:justify-center overflow-hidden"
                showCloseButton={false}
            >
                <div className="relative flex flex-col items-center group w-full h-full md:h-auto">
                    {/* Desktop-only close button (overlays top-right of card) */}
                    <button
                        onClick={() => setIsOpen(false)}
                        className="hidden md:flex absolute top-4 right-4 z-[60] p-2 rounded-full bg-white/80 backdrop-blur-md border border-black/[0.05] text-stone-700 hover:text-stone-900 hover:bg-white hover:border-black/[0.1] shadow-sm transition-all duration-300"
                        aria-label="Close gallery"
                    >
                        <X className="w-5 h-5" />
                    </button>

                    {/* Desktop Navigation Buttons */}
                    <button
                        onClick={handlePrevious}
                        className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/80 backdrop-blur-md border border-black/[0.05] text-stone-700 hover:text-stone-900 hover:bg-white hover:border-black/[0.1] shadow-sm transition-all duration-300 opacity-0 group-hover:opacity-100 hidden md:flex"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>

                    <button
                        onClick={handleNext}
                        className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/80 backdrop-blur-md border border-black/[0.05] text-stone-700 hover:text-stone-900 hover:bg-white hover:border-black/[0.1] shadow-sm transition-all duration-300 opacity-0 group-hover:opacity-100 hidden md:flex"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>

                    {/* Content Container */}
                    <div className="flex flex-col md:flex-row max-w-6xl w-full h-full md:h-auto bg-white/95 md:bg-white/80 backdrop-blur-2xl md:rounded-3xl border border-black/[0.06] shadow-2xl md:overflow-hidden">

                        {/* === MOBILE LAYOUT (scrollable column) === */}
                        <div className="flex flex-col w-full h-full md:hidden overflow-y-auto" style={{ WebkitOverflowScrolling: 'touch' }}>
                            {/* Mobile Header Bar with Close Button */}
                            <div className="flex items-center justify-between px-4 py-3 border-b border-black/[0.05] flex-shrink-0 sticky top-0 z-10 bg-white/90 backdrop-blur-md">
                                <span className="text-stone-450 text-xs font-light">
                                    {currentIndex + 1} / {artworks.length}
                                </span>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 rounded-full bg-black/[0.04] border border-black/[0.05] text-stone-700 hover:text-stone-900 hover:bg-black/[0.08] transition-all duration-300"
                                    aria-label="Close gallery"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Mobile Image */}
                            <div className="relative w-full h-[45vh] flex-shrink-0 overflow-hidden bg-black/[0.01]">
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
                                            src={artwork.image_url || artwork.src || ''}
                                            alt={artwork.alt || artwork.title}
                                            fill
                                            className="object-contain p-4"
                                            priority
                                            unoptimized
                                        />
                                    </motion.div>
                                </AnimatePresence>
                            </div>

                            {/* Mobile Metadata */}
                            <div className="p-6 border-t border-black/[0.05]">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={artwork.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                                        className="space-y-5"
                                    >
                                        <div>
                                            <h2 className="text-2xl font-light text-stone-900 mb-2 leading-tight">
                                                {artwork.title}
                                            </h2>
                                            <div className="flex items-center gap-3 text-stone-400 text-sm font-light uppercase tracking-widest">
                                                <span>{artwork.year}</span>
                                                <span className="w-1 h-1 rounded-full bg-black/[0.1]" />
                                                <span>{artwork.medium}</span>
                                            </div>
                                        </div>

                                        <div className="h-px w-full bg-gradient-to-r from-black/[0.08] to-transparent" />

                                        <p className="text-stone-600 text-base font-light leading-relaxed">
                                            {artwork.description}
                                        </p>

                                        {/* Mobile Navigation */}
                                        <div className="flex items-center justify-between pt-6 pb-2">
                                            <button
                                                onClick={handlePrevious}
                                                className="flex items-center gap-2 text-stone-400 hover:text-stone-900 transition-colors"
                                            >
                                                <ChevronLeft className="w-5 h-5" />
                                                <span className="text-xs uppercase tracking-widest">Prev</span>
                                            </button>
                                            <button
                                                onClick={handleNext}
                                                className="flex items-center gap-2 text-stone-400 hover:text-stone-900 transition-colors"
                                            >
                                                <span className="text-xs uppercase tracking-widest">Next</span>
                                                <ChevronRight className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </div>

                        {/* === DESKTOP LAYOUT (side-by-side, unchanged) === */}
                        {/* Image Section */}
                        <div className="relative hidden md:block md:w-2/3 md:h-[80vh] overflow-hidden bg-black/[0.01]">
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
                                        src={artwork.image_url || artwork.src || ''}
                                        alt={artwork.alt || artwork.title}
                                        fill
                                        className="object-contain p-8"
                                        priority
                                        unoptimized
                                    />
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Metadata Section */}
                        <div className="hidden md:flex md:w-1/3 p-8 flex-col justify-center border-l border-black/[0.05]">
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
                                        <h2 className="text-3xl font-light text-stone-900 mb-2 leading-tight">
                                            {artwork.title}
                                        </h2>
                                        <div className="flex items-center gap-3 text-stone-400 text-sm font-light uppercase tracking-widest">
                                            <span>{artwork.year}</span>
                                            <span className="w-1 h-1 rounded-full bg-black/[0.1]" />
                                            <span>{artwork.medium}</span>
                                        </div>
                                    </div>
                                    
                                    <div className="h-px w-full bg-gradient-to-r from-black/[0.08] to-transparent" />
                                    
                                    <p className="text-stone-600 text-base font-light leading-relaxed">
                                        {artwork.description}
                                    </p>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
