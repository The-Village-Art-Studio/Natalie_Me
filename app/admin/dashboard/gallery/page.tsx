"use client"

import { useEffect, useState } from "react"
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
    Check
} from "lucide-react"
import Image from "next/image"
import { toast } from "sonner"

interface Artwork {
    id: string
    title: string
    year: string
    medium: string
    description: string
    image_url: string
    order: number
}

export default function GalleryManager() {
    const [artworks, setArtworks] = useState<Artwork[]>([])
    const [loading, setLoading] = useState(true)
    const [isAdding, setIsAdding] = useState(false)
    const [isEditing, setIsEditing] = useState<Artwork | null>(null)
    const [uploading, setUploading] = useState(false)

    // Form state
    const [formData, setFormData] = useState({
        title: "",
        year: "",
        medium: "",
        description: "",
        image_url: ""
    })

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
            image_url: ""
        })
        setIsAdding(false)
        setIsEditing(null)
    }

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        setUploading(true)
        const fileExt = file.name.split('.').pop()
        const fileName = `${Math.random()}.${fileExt}`
        const filePath = `gallery/${fileName}`

        const { error: uploadError, data } = await supabase.storage
            .from('gallery')
            .upload(filePath, file)

        if (uploadError) {
            toast.error("Failed to upload image")
            console.error(uploadError)
        } else {
            const { data: { publicUrl } } = supabase.storage
                .from('gallery')
                .getPublicUrl(filePath)
            
            setFormData({ ...formData, image_url: publicUrl })
            toast.success("Image uploaded successfully")
        }
        setUploading(false)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        if (isEditing) {
            const { error } = await supabase
                .from('artworks')
                .update(formData)
                .eq('id', isEditing.id)
            
            if (error) toast.error("Failed to update artwork")
            else toast.success("Artwork updated!")
        } else {
            const { error } = await supabase
                .from('artworks')
                .insert([{ ...formData, order: artworks.length }])
            
            if (error) toast.error("Failed to add artwork")
            else toast.success("Artwork added!")
        }

        fetchArtworks()
        resetForm()
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
            image_url: artwork.image_url
        })
        setIsAdding(true)
    }

    return (
        <div className="space-y-12">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-light text-white mb-2">Gallery <span className="font-medium">Manager</span></h1>
                    <p className="text-white/40 text-sm font-light uppercase tracking-widest">Manage your artwork collection</p>
                </div>
                {!isAdding && (
                    <button
                        onClick={() => setIsAdding(true)}
                        className="flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black text-sm font-medium hover:bg-white/90 transition-all active:scale-[0.98]"
                    >
                        <Plus className="w-4 h-4" />
                        Add New Artwork
                    </button>
                )}
            </div>

            <AnimatePresence>
                {isAdding && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                    >
                        <form onSubmit={handleSubmit} className="p-8 rounded-3xl bg-white/5 border border-white/10 space-y-8 mb-12 relative">
                            <button 
                                type="button" 
                                onClick={resetForm}
                                className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/10 text-white/40 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                {/* Image Upload */}
                                <div className="space-y-4">
                                    <label className="text-white/60 text-xs font-light tracking-wide uppercase">Artwork Image</label>
                                    <div className="relative aspect-square rounded-2xl bg-white/5 border border-dashed border-white/20 flex flex-col items-center justify-center overflow-hidden group">
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
                                                    <Loader2 className="w-8 h-8 text-white/40 animate-spin mx-auto mb-2" />
                                                ) : (
                                                    <Upload className="w-8 h-8 text-white/40 mx-auto mb-2" />
                                                )}
                                                <p className="text-white/40 text-xs font-light">Click to upload or drag and drop</p>
                                                <p className="text-white/20 text-[10px] uppercase mt-2">JPG, PNG, WebP (Max 5MB)</p>
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
                                </div>

                                {/* Form Fields */}
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-white/60 text-xs font-light tracking-wide uppercase">Title</label>
                                        <input
                                            type="text"
                                            value={formData.title}
                                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                            required
                                            className="w-full px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-light focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all"
                                            placeholder="Artpiece Name"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-white/60 text-xs font-light tracking-wide uppercase">Year</label>
                                            <input
                                                type="text"
                                                value={formData.year}
                                                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                                                required
                                                className="w-full px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-light focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all"
                                                placeholder="2025"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-white/60 text-xs font-light tracking-wide uppercase">Medium</label>
                                            <input
                                                type="text"
                                                value={formData.medium}
                                                onChange={(e) => setFormData({ ...formData, medium: e.target.value })}
                                                required
                                                className="w-full px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-light focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all"
                                                placeholder="Oil on Canvas"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-white/60 text-xs font-light tracking-wide uppercase">Description</label>
                                        <textarea
                                            value={formData.description}
                                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                            required
                                            rows={4}
                                            className="w-full px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-light focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all resize-none"
                                            placeholder="Tell the story behind this piece..."
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={loading || uploading || !formData.image_url}
                                        className="w-full py-4 rounded-xl bg-white text-black text-sm font-medium hover:bg-white/90 active:scale-[0.98] transition-all disabled:opacity-50"
                                    >
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
                    <Loader2 className="w-8 h-8 text-white/20 animate-spin" />
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {artworks.map((artwork) => (
                        <motion.div
                            key={artwork.id}
                            layout
                            className="group relative rounded-2xl bg-white/5 border border-white/10 overflow-hidden hover:border-white/30 transition-all duration-300"
                        >
                            <div className="relative aspect-square overflow-hidden bg-white/5">
                                <Image 
                                    src={artwork.image_url} 
                                    alt={artwork.title} 
                                    fill 
                                    className="object-cover group-hover:scale-105 transition-transform duration-500" 
                                    unoptimized
                                />
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
                            </div>
                            <div className="p-4">
                                <h3 className="text-white font-medium truncate">{artwork.title}</h3>
                                <p className="text-white/40 text-[10px] uppercase tracking-widest mt-1">{artwork.medium}, {artwork.year}</p>
                            </div>
                        </motion.div>
                    ))}
                    {artworks.length === 0 && !isAdding && (
                        <div className="col-span-full py-20 text-center border border-dashed border-white/10 rounded-3xl">
                            <ImageIcon className="w-12 h-12 text-white/10 mx-auto mb-4" />
                            <p className="text-white/40 font-light">Your gallery is empty. Add your first artwork above.</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}
