"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { motion } from "framer-motion"
import { 
    Loader2, 
    Upload,
    Plus,
    Trash2,
    Save
} from "lucide-react"
import Image from "next/image"
import { toast } from "sonner"

export default function BioEditor() {
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [uploading, setUploading] = useState(false)
    
    const [formData, setFormData] = useState({
        statement: "",
        photo_url: "",
        exhibitions: [] as string[],
        awards: [] as string[]
    })

    useEffect(() => {
        fetchBio()
    }, [])

    const fetchBio = async () => {
        setLoading(true)
        const { data, error } = await supabase
            .from('bio')
            .select('*')
            .maybeSingle()
        
        if (data) {
            setFormData({
                statement: data.statement || "",
                photo_url: data.photo_url || "",
                exhibitions: data.exhibitions || [],
                awards: data.awards || []
            })
        }
        setLoading(false)
    }

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        setUploading(true)
        const fileExt = file.name.split('.').pop()
        const fileName = `profile.${fileExt}`
        const filePath = `profile/${fileName}`

        // Delete existing if needed, or just overwrite
        const { error: uploadError } = await supabase.storage
            .from('profile')
            .upload(filePath, file, { upsert: true })

        if (uploadError) {
            toast.error("Failed to upload photo")
            console.error(uploadError)
        } else {
            const { data: { publicUrl } } = supabase.storage
                .from('profile')
                .getPublicUrl(filePath)
            
            setFormData({ ...formData, photo_url: publicUrl })
            toast.success("Photo uploaded successfully")
        }
        setUploading(false)
    }

    const handleSave = async () => {
        setSaving(true)
        const { data: existing } = await supabase.from('bio').select('id').maybeSingle()

        let error
        if (existing) {
            const { error: updateError } = await supabase
                .from('bio')
                .update(formData)
                .eq('id', existing.id)
            error = updateError
        } else {
            const { error: insertError } = await supabase
                .from('bio')
                .insert([formData])
            error = insertError
        }

        if (error) {
            toast.error("Failed to save changes")
            console.error(error)
        } else {
            toast.success("Profile updated successfully")
        }
        setSaving(false)
    }

    const addItem = (type: 'exhibitions' | 'awards') => {
        setFormData({
            ...formData,
            [type]: [...formData[type], ""]
        })
    }

    const updateItem = (type: 'exhibitions' | 'awards', index: number, value: string) => {
        const newList = [...formData[type]]
        newList[index] = value
        setFormData({ ...formData, [type]: newList })
    }

    const removeItem = (type: 'exhibitions' | 'awards', index: number) => {
        const newList = formData[type].filter((_, i) => i !== index)
        setFormData({ ...formData, [type]: newList })
    }

    if (loading) {
        return (
            <div className="flex justify-center py-20">
                <Loader2 className="w-8 h-8 text-white/20 animate-spin" />
            </div>
        )
    }

    return (
        <div className="space-y-12 pb-20">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-light text-white mb-2">Bio & <span className="font-medium">Profile</span></h1>
                    <p className="text-white/40 text-sm font-light uppercase tracking-widest">Manage your personal details</p>
                </div>
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center gap-2 px-8 py-3 rounded-full bg-white text-black text-sm font-medium hover:bg-white/90 transition-all active:scale-[0.98] disabled:opacity-50"
                >
                    {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    Save Changes
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Left Column: Photo & Statement */}
                <div className="lg:col-span-2 space-y-12">
                    {/* Photo */}
                    <div className="p-8 rounded-3xl bg-white/5 border border-white/10 space-y-4">
                        <label className="text-white/60 text-xs font-light tracking-wide uppercase">Profile Photo</label>
                        <div className="flex flex-col md:flex-row gap-8 items-start">
                            <div className="relative w-48 aspect-square rounded-2xl overflow-hidden bg-white/5 border border-white/10 group">
                                {formData.photo_url ? (
                                    <Image src={formData.photo_url} alt="Profile" fill className="object-cover" unoptimized />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <ImageIcon className="w-12 h-12 text-white/10" />
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <Upload className="w-6 h-6 text-white" />
                                </div>
                                <input 
                                    type="file" 
                                    accept="image/*" 
                                    onChange={handleFileUpload}
                                    className="absolute inset-0 opacity-0 cursor-pointer" 
                                    disabled={uploading}
                                />
                            </div>
                            <div className="flex-1 space-y-4">
                                <p className="text-white/40 text-sm font-light leading-relaxed">
                                    Upload a high-quality photo of yourself. This will be displayed on your Bio page. Recommended size: 1000x1000px.
                                </p>
                                {uploading && (
                                    <div className="flex items-center gap-2 text-white/60 text-xs italic">
                                        <Loader2 className="w-3 h-3 animate-spin" />
                                        Uploading photo...
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Artist Statement */}
                    <div className="p-8 rounded-3xl bg-white/5 border border-white/10 space-y-4">
                        <label className="text-white/60 text-xs font-light tracking-wide uppercase">Artist Statement</label>
                        <textarea
                            value={formData.statement}
                            onChange={(e) => setFormData({ ...formData, statement: e.target.value })}
                            rows={12}
                            className="w-full px-6 py-5 rounded-2xl bg-white/5 border border-white/10 text-white text-base font-light leading-relaxed focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all resize-none"
                            placeholder="Tell your story..."
                        />
                    </div>
                </div>

                {/* Right Column: Lists */}
                <div className="space-y-12">
                    {/* Exhibitions */}
                    <div className="p-8 rounded-3xl bg-white/5 border border-white/10 space-y-6">
                        <div className="flex items-center justify-between">
                            <label className="text-white/60 text-xs font-light tracking-wide uppercase">Exhibitions</label>
                            <button onClick={() => addItem('exhibitions')} className="p-1.5 rounded-full bg-white/5 border border-white/10 text-white/40 hover:text-white transition-all">
                                <Plus className="w-3.5 h-3.5" />
                            </button>
                        </div>
                        <div className="space-y-3">
                            {formData.exhibitions.map((item, index) => (
                                <div key={index} className="group flex items-center gap-2">
                                    <input
                                        type="text"
                                        value={item}
                                        onChange={(e) => updateItem('exhibitions', index, e.target.value)}
                                        className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm font-light text-white focus:outline-none focus:border-white/30"
                                        placeholder="Exhibition Name"
                                    />
                                    <button onClick={() => removeItem('exhibitions', index)} className="opacity-0 group-hover:opacity-100 p-2 text-red-400/60 hover:text-red-400 transition-all">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Awards */}
                    <div className="p-8 rounded-3xl bg-white/5 border border-white/10 space-y-6">
                        <div className="flex items-center justify-between">
                            <label className="text-white/60 text-xs font-light tracking-wide uppercase">Awards</label>
                            <button onClick={() => addItem('awards')} className="p-1.5 rounded-full bg-white/5 border border-white/10 text-white/40 hover:text-white transition-all">
                                <Plus className="w-3.5 h-3.5" />
                            </button>
                        </div>
                        <div className="space-y-3">
                            {formData.awards.map((item, index) => (
                                <div key={index} className="group flex items-center gap-2">
                                    <input
                                        type="text"
                                        value={item}
                                        onChange={(e) => updateItem('awards', index, e.target.value)}
                                        className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm font-light text-white focus:outline-none focus:border-white/30"
                                        placeholder="Award Name"
                                    />
                                    <button onClick={() => removeItem('awards', index)} className="opacity-0 group-hover:opacity-100 p-2 text-red-400/60 hover:text-red-400 transition-all">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
