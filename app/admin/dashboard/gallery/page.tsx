"use client"

import { useEffect, useState, useRef, useCallback } from "react"
import { supabase } from "@/lib/supabase"
import { motion, AnimatePresence } from "framer-motion"
import { 
    Plus, 
    Trash2, 
    Edit2, 
    Image as ImageIcon, 
    Loader2, 
    X, 
    Upload,
    Check,
    Crosshair,
    RotateCcw,
    GripVertical,
    ArrowUpDown,
    ArrowUp,
    ArrowDown
} from "lucide-react"
import Image from "next/image"
import { toast } from "sonner"
import { Slider } from "@/components/ui/slider"

interface Artwork {
    id: string
    title: string
    year: string
    medium: string
    description: string
    image_url: string
    order: number
    preview_position_x: number
    preview_position_y: number
}

export default function GalleryManager() {
    const [artworks, setArtworks] = useState<Artwork[]>([])
    const [loading, setLoading] = useState(true)
    const [isAdding, setIsAdding] = useState(false)
    const [isEditing, setIsEditing] = useState<Artwork | null>(null)
    const [uploading, setUploading] = useState(false)
    const [draggedIndex, setDraggedIndex] = useState<number | null>(null)
    const [dragOverIndex, setDragOverIndex] = useState<number | null>(null)
    const [isReordering, setIsReordering] = useState(false)
    const [saving, setSaving] = useState(false)

    // Form state
    const [formData, setFormData] = useState({
        title: "",
        year: "",
        medium: "",
        description: "",
        image_url: "",
        preview_position_x: 50,
        preview_position_y: 50
    })

    // Preview positioning drag state
    const previewRef = useRef<HTMLDivElement>(null)
    const [isDragging, setIsDragging] = useState(false)

    const handlePositionFromEvent = useCallback((clientX: number, clientY: number) => {
        if (!previewRef.current) return
        const rect = previewRef.current.getBoundingClientRect()
        const x = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100))
        const y = Math.max(0, Math.min(100, ((clientY - rect.top) / rect.height) * 100))
        setFormData(prev => ({ ...prev, preview_position_x: Math.round(x), preview_position_y: Math.round(y) }))
    }, [])

    const handlePointerDown = useCallback((e: React.PointerEvent) => {
        setIsDragging(true)
        ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
        handlePositionFromEvent(e.clientX, e.clientY)
    }, [handlePositionFromEvent])

    const handlePointerMove = useCallback((e: React.PointerEvent) => {
        if (!isDragging) return
        handlePositionFromEvent(e.clientX, e.clientY)
    }, [isDragging, handlePositionFromEvent])

    const handlePointerUp = useCallback(() => {
        setIsDragging(false)
    }, [])

    useEffect(() => {
        fetchArtworks()
    }, [])

    const fetchArtworks = async () => {
        setLoading(true)
        const { data } = await supabase
            .from('artworks')
            .select('*')
            .order('order', { ascending: true })
        
        if (data) setArtworks(data)
        setLoading(false)
    }

    const resetForm = () => {
        setFormData({
            title: "",
            year: "",
            medium: "",
            description: "",
            image_url: "",
            preview_position_x: 50,
            preview_position_y: 50
        })
        setIsAdding(false)
        setIsEditing(null)
    }

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        setUploading(true)
        const fileExt = file.name.split('.').pop()
        const fileName = `${Date.now()}.${fileExt}`

        const uploadForm = new FormData()
        uploadForm.append('file', file)
        uploadForm.append('bucket', 'gallery')
        uploadForm.append('path', fileName)

        try {
            const res = await fetch('/api/upload', { method: 'POST', body: uploadForm })
            const json = await res.json()
            if (!res.ok) throw new Error(json.error)
            setFormData(prev => ({ ...prev, image_url: json.publicUrl }))
            toast.success("Image uploaded successfully")
        } catch (err: any) {
            toast.error("Upload failed: " + err.message)
            console.error(err)
        } finally {
            setUploading(false)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSaving(true)

        try {
            if (isEditing) {
                let res = await supabase
                    .from('artworks')
                    .update(formData)
                    .eq('id', isEditing.id)
                
                // Fallback for missing columns if migration hasn't been run
                if (res.error && (res.error.code === 'PGRST204' || res.error.message.includes('Could not find'))) {
                    const { preview_position_x, preview_position_y, ...safeData } = formData
                    res = await supabase.from('artworks').update(safeData).eq('id', isEditing.id)
                    if (!res.error) {
                        toast.success("Artwork updated (Note: focal point requires DB update)")
                        await fetchArtworks()
                        resetForm()
                        return
                    }
                }

                if (res.error) {
                    console.error('Update error:', res.error)
                    toast.error("Failed to update artwork: " + res.error.message)
                    return
                }
                toast.success("Artwork updated!")
            } else {
                const insertData = { ...formData, order: artworks.length }
                let res = await supabase
                    .from('artworks')
                    .insert([insertData])
                
                // Fallback for missing columns if migration hasn't been run
                if (res.error && (res.error.code === 'PGRST204' || res.error.message.includes('Could not find'))) {
                    const { preview_position_x, preview_position_y, ...safeData } = formData
                    const safeInsertData = { ...safeData, order: artworks.length }
                    res = await supabase.from('artworks').insert([safeInsertData as any])
                    if (!res.error) {
                        toast.success("Artwork added (Note: focal point requires DB update)")
                        await fetchArtworks()
                        resetForm()
                        return
                    }
                }

                if (res.error) {
                    console.error('Insert error:', res.error)
                    toast.error("Failed to add artwork: " + res.error.message)
                    return
                }
                toast.success("Artwork added!")
            }

            await fetchArtworks()
            resetForm()
        } finally {
            setSaving(false)
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this artwork?")) return
        
        const { error } = await supabase
            .from('artworks')
            .delete()
            .eq('id', id)
        
        if (error) toast.error("Failed to delete artwork")
        else {
            toast.success("Artwork deleted")
            fetchArtworks()
        }
    }

    const startEditing = (artwork: Artwork) => {
        setIsEditing(artwork)
        setFormData({
            title: artwork.title,
            year: artwork.year,
            medium: artwork.medium,
            description: artwork.description,
            image_url: artwork.image_url,
            preview_position_x: artwork.preview_position_x ?? 50,
            preview_position_y: artwork.preview_position_y ?? 50
        })
        setIsAdding(true)
    }

    // --- Drag-to-reorder handlers ---
    const handleDragStart = (index: number) => {
        setDraggedIndex(index)
    }

    const handleDragOver = (e: React.DragEvent, index: number) => {
        e.preventDefault()
        setDragOverIndex(index)
    }

    const handleDragEnd = async () => {
        if (draggedIndex === null || dragOverIndex === null || draggedIndex === dragOverIndex) {
            setDraggedIndex(null)
            setDragOverIndex(null)
            return
        }

        const reordered = [...artworks]
        const [moved] = reordered.splice(draggedIndex, 1)
        reordered.splice(dragOverIndex, 0, moved)

        // Optimistic update
        setArtworks(reordered)
        setDraggedIndex(null)
        setDragOverIndex(null)

        // Persist order to database
        try {
            const updates = reordered.map((art, i) =>
                supabase.from('artworks').update({ order: i }).eq('id', art.id)
            )
            await Promise.all(updates)
            toast.success("Order saved")
        } catch {
            toast.error("Failed to save order")
            await fetchArtworks()
        }
    }

    const handleSortByYear = async () => {
        const sorted = [...artworks].sort((a, b) => {
            const yearA = parseInt(a.year) || 0
            const yearB = parseInt(b.year) || 0
            return yearB - yearA // newest first
        })

        setArtworks(sorted)

        try {
            const updates = sorted.map((art, i) =>
                supabase.from('artworks').update({ order: i }).eq('id', art.id)
            )
            await Promise.all(updates)
            toast.success("Sorted by year (newest first)")
        } catch {
            toast.error("Failed to save sort order")
            await fetchArtworks()
        }
    }

    const moveArtwork = async (fromIndex: number, direction: 'up' | 'down') => {
        const toIndex = direction === 'up' ? fromIndex - 1 : fromIndex + 1
        if (toIndex < 0 || toIndex >= artworks.length) return

        const reordered = [...artworks]
        const [moved] = reordered.splice(fromIndex, 1)
        reordered.splice(toIndex, 0, moved)

        setArtworks(reordered)

        try {
            await Promise.all([
                supabase.from('artworks').update({ order: toIndex }).eq('id', moved.id),
                supabase.from('artworks').update({ order: fromIndex }).eq('id', reordered[fromIndex].id)
            ])
        } catch {
            toast.error("Failed to reorder")
            await fetchArtworks()
        }
    }

    return (
        <div className="space-y-12">
            <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                    <h1 className="text-4xl font-light text-stone-900 mb-2">Gallery <span className="font-medium">Manager</span></h1>
                    <p className="text-stone-400 text-sm font-light uppercase tracking-widest">Manage your artwork collection</p>
                </div>
                <div className="flex items-center gap-3">
                    {!isAdding && artworks.length > 1 && (
                        <>
                            <button
                                onClick={() => setIsReordering(!isReordering)}
                                className={`flex items-center gap-2 px-5 py-3 rounded-full text-sm font-medium transition-all active:scale-[0.98] ${
                                    isReordering 
                                        ? 'bg-stone-900 text-white border border-stone-900' 
                                        : 'bg-white/60 text-stone-700 border border-black/[0.08] hover:bg-white hover:text-stone-900'
                                }`}
                            >
                                <GripVertical className="w-4 h-4" />
                                {isReordering ? 'Done' : 'Reorder'}
                            </button>
                            <button
                                onClick={handleSortByYear}
                                className="flex items-center gap-2 px-5 py-3 rounded-full bg-white/60 text-stone-700 border border-black/[0.08] text-sm font-medium hover:bg-white hover:text-stone-900 transition-all active:scale-[0.98]"
                            >
                                <ArrowUpDown className="w-4 h-4" />
                                Sort by Year
                            </button>
                        </>
                    )}
                    {!isAdding && (
                        <button
                            onClick={() => setIsAdding(true)}
                            className="flex items-center gap-2 px-6 py-3 rounded-full bg-stone-900 text-white text-sm font-medium hover:bg-stone-800 transition-all active:scale-[0.98]"
                        >
                            <Plus className="w-4 h-4" />
                            Add New Artwork
                        </button>
                    )}
                </div>
            </div>

            <AnimatePresence>
                {isAdding && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                    >
                        <form onSubmit={handleSubmit} className="p-8 rounded-3xl bg-white/60 backdrop-blur-md border border-black/[0.06] shadow-sm space-y-8 mb-12 relative">
                            <button 
                                type="button" 
                                onClick={resetForm}
                                className="absolute top-6 right-6 p-2 rounded-full hover:bg-black/[0.06] text-stone-400 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                {/* Image Upload */}
                                <div className="space-y-4">
                                    <label className="text-stone-600 text-xs font-light tracking-wide uppercase">Artwork Image</label>
                                    <div className="relative aspect-square rounded-2xl bg-white/40 border border-dashed border-black/[0.1] flex flex-col items-center justify-center overflow-hidden group">
                                        {formData.image_url ? (
                                            <>
                                                <Image 
                                                    src={formData.image_url} 
                                                    alt="Preview" 
                                                    fill 
                                                    className="object-cover opacity-80 group-hover:opacity-100 transition-opacity" 
                                                />
                                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                    <label className="cursor-pointer px-4 py-2 rounded-lg bg-black/60 text-white text-xs border border-white/20">Change Image</label>
                                                </div>
                                            </>
                                        ) : (
                                            <div className="text-center p-8">
                                                {uploading ? (
                                                    <Loader2 className="w-8 h-8 text-stone-300 animate-spin mx-auto mb-2" />
                                                ) : (
                                                    <Upload className="w-8 h-8 text-stone-300 mx-auto mb-2" />
                                                )}
                                                <p className="text-stone-400 text-xs font-light">Click to upload or drag and drop</p>
                                                <p className="text-stone-300 text-[10px] uppercase mt-2">JPG, PNG, WebP (Max 5MB)</p>
                                            </div>
                                        )}
                                        <input 
                                            type="file" 
                                            accept="image/*" 
                                            onChange={handleFileUpload}
                                            className="absolute inset-0 opacity-0 cursor-pointer" 
                                            disabled={uploading}
                                        />
                                    </div>

                                    {/* Preview Positioning Tool */}
                                    {formData.image_url && (
                                        <div className="space-y-4 mt-6">
                                            <div className="flex items-center justify-between">
                                                <label className="text-stone-600 text-xs font-light tracking-wide uppercase flex items-center gap-2">
                                                    <Crosshair className="w-3.5 h-3.5" />
                                                    Preview Positioning
                                                </label>
                                                <button
                                                    type="button"
                                                    onClick={() => setFormData(prev => ({ ...prev, preview_position_x: 50, preview_position_y: 50 }))}
                                                    className="flex items-center gap-1.5 text-stone-400 hover:text-stone-700 text-[10px] uppercase tracking-widest transition-colors"
                                                >
                                                    <RotateCcw className="w-3 h-3" />
                                                    Reset
                                                </button>
                                            </div>

                                            {/* Interactive Preview */}
                                            <div
                                                ref={previewRef}
                                                onPointerDown={handlePointerDown}
                                                onPointerMove={handlePointerMove}
                                                onPointerUp={handlePointerUp}
                                                className="relative aspect-square rounded-xl overflow-hidden cursor-crosshair border border-black/[0.08] select-none touch-none"
                                            >
                                                <Image
                                                    src={formData.image_url}
                                                    alt="Position preview"
                                                    fill
                                                    className="object-cover pointer-events-none"
                                                    style={{ objectPosition: `${formData.preview_position_x}% ${formData.preview_position_y}%` }}
                                                    unoptimized
                                                />
                                                {/* Crosshair overlay */}
                                                <div className="absolute inset-0 pointer-events-none">
                                                    {/* Vertical line */}
                                                    <div
                                                        className="absolute top-0 bottom-0 w-px bg-white/40"
                                                        style={{ left: `${formData.preview_position_x}%` }}
                                                    />
                                                    {/* Horizontal line */}
                                                    <div
                                                        className="absolute left-0 right-0 h-px bg-white/40"
                                                        style={{ top: `${formData.preview_position_y}%` }}
                                                    />
                                                    {/* Center dot */}
                                                    <div
                                                        className="absolute w-4 h-4 rounded-full border-2 border-white bg-white/20 shadow-lg shadow-black/50 -translate-x-1/2 -translate-y-1/2"
                                                        style={{ left: `${formData.preview_position_x}%`, top: `${formData.preview_position_y}%` }}
                                                    />
                                                </div>
                                                {/* Instruction overlay */}
                                                <div className="absolute bottom-2 left-0 right-0 text-center">
                                                    <span className="text-[10px] text-white/50 bg-black/50 backdrop-blur-sm px-2 py-1 rounded-full">
                                                        Click or drag to set focal point
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Sliders */}
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-stone-400 text-[10px] uppercase tracking-widest">Horizontal</span>
                                                        <span className="text-stone-600 text-[10px] font-mono">{formData.preview_position_x}%</span>
                                                    </div>
                                                    <Slider
                                                        value={[formData.preview_position_x]}
                                                        min={0}
                                                        max={100}
                                                        step={1}
                                                        onValueChange={([v]) => setFormData(prev => ({ ...prev, preview_position_x: v }))}
                                                        className="[&_[data-slot=slider-track]]:bg-white/10 [&_[data-slot=slider-range]]:bg-white/30 [&_[data-slot=slider-thumb]]:border-white/50 [&_[data-slot=slider-thumb]]:bg-white [&_[data-slot=slider-thumb]]:w-3 [&_[data-slot=slider-thumb]]:h-3"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-stone-400 text-[10px] uppercase tracking-widest">Vertical</span>
                                                        <span className="text-stone-600 text-[10px] font-mono">{formData.preview_position_y}%</span>
                                                    </div>
                                                    <Slider
                                                        value={[formData.preview_position_y]}
                                                        min={0}
                                                        max={100}
                                                        step={1}
                                                        onValueChange={([v]) => setFormData(prev => ({ ...prev, preview_position_y: v }))}
                                                        className="[&_[data-slot=slider-track]]:bg-white/10 [&_[data-slot=slider-range]]:bg-white/30 [&_[data-slot=slider-thumb]]:border-white/50 [&_[data-slot=slider-thumb]]:bg-white [&_[data-slot=slider-thumb]]:w-3 [&_[data-slot=slider-thumb]]:h-3"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Form Fields */}
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-stone-600 text-xs font-light tracking-wide uppercase">Title</label>
                                        <input
                                            type="text"
                                            value={formData.title}
                                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                            required
                                            className="w-full px-5 py-3 rounded-xl bg-white/60 border border-black/[0.08] text-stone-900 text-sm font-light placeholder:text-stone-400 focus:outline-none focus:border-stone-400 focus:bg-white transition-all"
                                            placeholder="Artpiece Name"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-stone-600 text-xs font-light tracking-wide uppercase">Year</label>
                                             <input
                                                type="text"
                                                value={formData.year}
                                                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                                                required
                                                className="w-full px-5 py-3 rounded-xl bg-white/60 border border-black/[0.08] text-stone-900 text-sm font-light placeholder:text-stone-400 focus:outline-none focus:border-stone-400 focus:bg-white transition-all"
                                                placeholder="2025"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-stone-600 text-xs font-light tracking-wide uppercase">Medium</label>
                                            <input
                                                type="text"
                                                value={formData.medium}
                                                onChange={(e) => setFormData({ ...formData, medium: e.target.value })}
                                                required
                                                className="w-full px-5 py-3 rounded-xl bg-white/60 border border-black/[0.08] text-stone-900 text-sm font-light placeholder:text-stone-400 focus:outline-none focus:border-stone-400 focus:bg-white transition-all"
                                                placeholder="Oil on Canvas"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-stone-600 text-xs font-light tracking-wide uppercase">Description</label>
                                        <textarea
                                            value={formData.description}
                                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                            required
                                            rows={4}
                                            className="w-full px-5 py-3 rounded-xl bg-white/60 border border-black/[0.08] text-stone-900 text-sm font-light placeholder:text-stone-400 focus:outline-none focus:border-stone-400 focus:bg-white transition-all resize-none"
                                            placeholder="Tell the story behind this piece..."
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={saving || uploading || !formData.image_url}
                                        className="w-full py-4 rounded-xl bg-stone-900 text-white text-sm font-medium hover:bg-stone-800 active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                                    >
                                        {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                                        {isEditing ? "Update Artwork" : "Save Artwork"}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Artworks List */}
            {loading && artworks.length === 0 ? (
                <div className="flex justify-center py-20">
                    <Loader2 className="w-8 h-8 text-stone-300 animate-spin" />
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {artworks.map((artwork, index) => (
                        <motion.div
                            key={artwork.id}
                            layout
                            draggable={isReordering}
                            onDragStart={() => handleDragStart(index)}
                            onDragOver={(e: React.DragEvent) => handleDragOver(e, index)}
                            onDragEnd={handleDragEnd}
                            className={`group relative rounded-2xl bg-white/50 backdrop-blur-md border shadow-sm overflow-hidden transition-all duration-300 ${
                                isReordering 
                                    ? 'cursor-grab active:cursor-grabbing border-black/[0.10] hover:border-black/[0.18]' 
                                    : 'border-black/[0.06] hover:border-black/[0.12]'
                            } ${
                                dragOverIndex === index ? 'ring-2 ring-stone-400 scale-[1.02]' : ''
                            } ${
                                draggedIndex === index ? 'opacity-50' : ''
                            }`}
                        >
                            {/* Reorder controls */}
                            {isReordering && (
                                <div className="absolute top-3 right-3 z-20 flex flex-col gap-1">
                                    <button
                                        onClick={(e) => { e.stopPropagation(); moveArtwork(index, 'up') }}
                                        disabled={index === 0}
                                        className="p-1.5 rounded-lg bg-black/60 backdrop-blur-sm text-white/70 hover:text-white border border-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                                    >
                                        <ArrowUp className="w-3.5 h-3.5" />
                                    </button>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); moveArtwork(index, 'down') }}
                                        disabled={index === artworks.length - 1}
                                        className="p-1.5 rounded-lg bg-black/60 backdrop-blur-sm text-white/70 hover:text-white border border-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                                    >
                                        <ArrowDown className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            )}
                            {isReordering && (
                                <div className="absolute top-3 left-3 z-20">
                                    <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-white/80 backdrop-blur-sm border border-black/[0.06]">
                                        <GripVertical className="w-3.5 h-3.5 text-stone-400" />
                                        <span className="text-stone-600 text-[10px] font-mono">#{index + 1}</span>
                                    </div>
                                </div>
                            )}
                            <div className="relative aspect-square overflow-hidden bg-white/5">
                                <Image 
                                    src={artwork.image_url} 
                                    alt={artwork.title} 
                                    fill 
                                    className="object-cover group-hover:scale-105 transition-transform duration-500" 
                                    style={{ objectPosition: `${artwork.preview_position_x ?? 50}% ${artwork.preview_position_y ?? 50}%` }}
                                    unoptimized
                                />
                                {!isReordering && (
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                                        <button 
                                            onClick={() => startEditing(artwork)}
                                            className="p-3 rounded-full bg-white text-black hover:scale-110 transition-transform"
                                        >
                                            <Edit2 className="w-4 h-4" />
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(artwork.id)}
                                            className="p-3 rounded-full bg-red-500 text-white hover:scale-110 transition-transform"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                )}
                            </div>
                            <div className="p-4">
                                <h3 className="text-stone-900 font-medium truncate">{artwork.title}</h3>
                                <p className="text-stone-400 text-[10px] uppercase tracking-widest mt-1">{artwork.medium}, {artwork.year}</p>
                            </div>
                        </motion.div>
                    ))}
                    {artworks.length === 0 && !isAdding && (
                        <div className="col-span-full py-20 text-center border border-dashed border-black/[0.08] rounded-3xl bg-white/20">
                            <ImageIcon className="w-12 h-12 text-stone-300 mx-auto mb-4" />
                            <p className="text-stone-400 font-light">Your gallery is empty. Add your first artwork above.</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}
