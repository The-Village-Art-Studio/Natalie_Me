"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { 
    Loader2, 
    Upload,
    Plus,
    Trash2,
    Save,
    Image as ImageIcon
} from "lucide-react"
import Image from "next/image"
import { toast } from "sonner"

interface ExhibitionEntry {
    title: string
    year: string
    location: string
}

interface AwardEntry {
    title: string
    year: string
    location: string
}

export default function BioEditor() {
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [uploading, setUploading] = useState(false)
    
    const [formData, setFormData] = useState({
        statement: "",
        photo_url: "",
        exhibitions: [] as ExhibitionEntry[],
        awards: [] as AwardEntry[]
    })

    useEffect(() => {
        fetchBio()
    }, [])

    const fetchBio = async () => {
        setLoading(true)
        const { data } = await supabase
            .from('bio')
            .select('*')
            .maybeSingle()
        
        if (data) {
            // Normalize: handle both old string[] and new object[] formats
            const normalizeEntries = (arr: any[]): ExhibitionEntry[] =>
                (arr || []).map(item =>
                    typeof item === 'string'
                        ? { title: item, year: '', location: '' }
                        : item
                )

            setFormData({
                statement: data.statement || "",
                photo_url: data.photo_url || "",
                exhibitions: normalizeEntries(data.exhibitions),
                awards: normalizeEntries(data.awards)
            })
        }
        setLoading(false)
    }

    const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        setUploading(true)
        const fileExt = file.name.split('.').pop()
        const fileName = `profile.${fileExt}`

        const uploadForm = new FormData()
        uploadForm.append('file', file)
        uploadForm.append('bucket', 'profile')
        uploadForm.append('path', fileName)

        try {
            const res = await fetch('/api/upload', { method: 'POST', body: uploadForm })
            const json = await res.json()
            if (!res.ok) throw new Error(json.error)
            setFormData(prev => ({ ...prev, photo_url: json.publicUrl }))
            toast.success("Photo uploaded successfully")
        } catch (err: any) {
            toast.error("Upload failed: " + err.message)
            console.error(err)
        } finally {
            setUploading(false)
        }
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

    const addExhibition = () => {
        setFormData(prev => ({
            ...prev,
            exhibitions: [...prev.exhibitions, { title: "", year: "", location: "" }]
        }))
    }

    const updateExhibition = (index: number, field: keyof ExhibitionEntry, value: string) => {
        const updated = [...formData.exhibitions]
        updated[index] = { ...updated[index], [field]: value }
        setFormData(prev => ({ ...prev, exhibitions: updated }))
    }

    const removeExhibition = (index: number) => {
        setFormData(prev => ({
            ...prev,
            exhibitions: prev.exhibitions.filter((_, i) => i !== index)
        }))
    }

    const addAward = () => {
        setFormData(prev => ({
            ...prev,
            awards: [...prev.awards, { title: "", year: "", location: "" }]
        }))
    }

    const updateAward = (index: number, field: keyof AwardEntry, value: string) => {
        const updated = [...formData.awards]
        updated[index] = { ...updated[index], [field]: value }
        setFormData(prev => ({ ...prev, awards: updated }))
    }

    const removeAward = (index: number) => {
        setFormData(prev => ({
            ...prev,
            awards: prev.awards.filter((_, i) => i !== index)
        }))
    }

    if (loading) {
        return (
            <div className="flex justify-center py-20">
                <Loader2 className="w-8 h-8 text-stone-300 animate-spin" />
            </div>
        )
    }

    return (
        <div className="space-y-12 pb-20">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-light text-stone-900 mb-2">Bio & <span className="font-medium">Profile</span></h1>
                    <p className="text-stone-400 text-sm font-light uppercase tracking-widest">Manage your personal details</p>
                </div>
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center gap-2 px-8 py-3 rounded-full bg-stone-900 text-white text-sm font-medium hover:bg-stone-800 transition-all active:scale-[0.98] disabled:opacity-50"
                >
                    {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    Save Changes
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Left Column: Photo & Statement */}
                <div className="lg:col-span-2 space-y-12">
                    {/* Photo Upload */}
                    <div className="p-8 rounded-3xl bg-white/60 backdrop-blur-md border border-black/[0.06] shadow-sm space-y-4">
                        <label className="text-stone-600 text-xs font-light tracking-wide uppercase">Profile Photo</label>
                        <div className="flex flex-col md:flex-row gap-8 items-start">
                            <div className="relative w-48 aspect-square rounded-2xl overflow-hidden bg-white/40 border border-black/[0.08] group flex-shrink-0">
                                {formData.photo_url ? (
                                    <Image src={formData.photo_url} alt="Profile" fill className="object-cover" unoptimized />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <ImageIcon className="w-12 h-12 text-stone-300" />
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <Upload className="w-6 h-6 text-white" />
                                </div>
                                <input 
                                    type="file" 
                                    accept="image/*" 
                                    onChange={handlePhotoUpload}
                                    className="absolute inset-0 opacity-0 cursor-pointer" 
                                    disabled={uploading}
                                />
                            </div>
                            <div className="flex-1 space-y-3">
                                <p className="text-stone-500 text-sm font-light leading-relaxed">
                                    Upload a high-quality portrait photo. Recommended: 1000×1000px.
                                </p>
                                {uploading && (
                                    <div className="flex items-center gap-2 text-stone-500 text-xs">
                                        <Loader2 className="w-3 h-3 animate-spin" />
                                        Uploading photo...
                                    </div>
                                )}
                                {formData.photo_url && (
                                    <button
                                        type="button"
                                        onClick={() => setFormData(prev => ({ ...prev, photo_url: "" }))}
                                        className="text-red-400/60 hover:text-red-400 text-xs transition-colors"
                                    >
                                        Remove photo
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Artist Statement */}
                    <div className="p-8 rounded-3xl bg-white/60 backdrop-blur-md border border-black/[0.06] shadow-sm space-y-4">
                        <label className="text-stone-600 text-xs font-light tracking-wide uppercase">Artist Statement</label>
                        <textarea
                            value={formData.statement}
                            onChange={(e) => setFormData(prev => ({ ...prev, statement: e.target.value }))}
                            rows={12}
                            className="w-full px-6 py-5 rounded-2xl bg-white/60 border border-black/[0.08] text-stone-900 text-base font-light leading-relaxed placeholder:text-stone-400 focus:outline-none focus:border-stone-400 focus:bg-white transition-all resize-none"
                            placeholder="Tell your story..."
                        />
                    </div>
                </div>

                {/* Right Column: Exhibitions & Awards */}
                <div className="space-y-12">
                    {/* Exhibitions */}
                    <div className="p-8 rounded-3xl bg-white/60 backdrop-blur-md border border-black/[0.06] shadow-sm space-y-6">
                        <div className="flex items-center justify-between">
                            <label className="text-stone-600 text-xs font-light tracking-wide uppercase">Exhibitions</label>
                            <button onClick={addExhibition} className="p-1.5 rounded-full bg-white/60 border border-black/[0.08] text-stone-500 hover:text-stone-900 transition-all">
                                <Plus className="w-3.5 h-3.5" />
                            </button>
                        </div>
                        <div className="space-y-6">
                            {formData.exhibitions.length === 0 && (
                                <p className="text-stone-400 text-xs font-light italic">No exhibitions yet. Click + to add one.</p>
                            )}
                            {formData.exhibitions.map((item, index) => (
                                <div key={index} className="group space-y-2 p-4 rounded-xl bg-white/60 border border-black/[0.06] relative">
                                    <button
                                        onClick={() => removeExhibition(index)}
                                        className="absolute top-3 right-3 p-1 text-red-400/60 hover:text-red-500 transition-colors"
                                    >
                                        <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                    <input
                                        type="text"
                                        value={item.title}
                                        onChange={(e) => updateExhibition(index, 'title', e.target.value)}
                                        className="w-full bg-transparent border-b border-black/[0.1] pb-1 text-sm font-light text-stone-900 focus:outline-none focus:border-stone-400 transition-all"
                                        placeholder="Exhibition Title"
                                    />
                                    <div className="grid grid-cols-2 gap-2 pt-1">
                                        <input
                                            type="text"
                                            value={item.year}
                                            onChange={(e) => updateExhibition(index, 'year', e.target.value)}
                                            className="w-full bg-transparent border-b border-black/[0.1] pb-1 text-xs font-light text-stone-600 focus:outline-none focus:border-stone-400 transition-all"
                                            placeholder="Year (e.g. 2025)"
                                        />
                                        <input
                                            type="text"
                                            value={item.location}
                                            onChange={(e) => updateExhibition(index, 'location', e.target.value)}
                                            className="w-full bg-transparent border-b border-black/[0.1] pb-1 text-xs font-light text-stone-600 focus:outline-none focus:border-stone-400 transition-all"
                                            placeholder="Location / City"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Awards */}
                    <div className="p-8 rounded-3xl bg-white/60 backdrop-blur-md border border-black/[0.06] shadow-sm space-y-6">
                        <div className="flex items-center justify-between">
                            <label className="text-stone-600 text-xs font-light tracking-wide uppercase">Awards</label>
                            <button onClick={addAward} className="p-1.5 rounded-full bg-white/60 border border-black/[0.08] text-stone-500 hover:text-stone-900 transition-all">
                                <Plus className="w-3.5 h-3.5" />
                            </button>
                        </div>
                        <div className="space-y-6">
                            {formData.awards.length === 0 && (
                                <p className="text-stone-400 text-xs font-light italic">No awards yet. Click + to add one.</p>
                            )}
                            {formData.awards.map((item, index) => (
                                <div key={index} className="group space-y-2 p-4 rounded-xl bg-white/60 border border-black/[0.06] relative">
                                    <button
                                        onClick={() => removeAward(index)}
                                        className="absolute top-3 right-3 p-1 text-red-400/60 hover:text-red-500 transition-colors"
                                    >
                                        <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                    <input
                                        type="text"
                                        value={item.title}
                                        onChange={(e) => updateAward(index, 'title', e.target.value)}
                                        className="w-full bg-transparent border-b border-black/[0.1] pb-1 text-sm font-light text-stone-900 focus:outline-none focus:border-stone-400 transition-all"
                                        placeholder="Award Title"
                                    />
                                    <div className="grid grid-cols-2 gap-2 pt-1">
                                        <input
                                            type="text"
                                            value={item.year}
                                            onChange={(e) => updateAward(index, 'year', e.target.value)}
                                            className="w-full bg-transparent border-b border-black/[0.1] pb-1 text-xs font-light text-stone-600 focus:outline-none focus:border-stone-400 transition-all"
                                            placeholder="Year (e.g. 2024)"
                                        />
                                        <input
                                            type="text"
                                            value={item.location}
                                            onChange={(e) => updateAward(index, 'location', e.target.value)}
                                            className="w-full bg-transparent border-b border-black/[0.1] pb-1 text-xs font-light text-stone-600 focus:outline-none focus:border-stone-400 transition-all"
                                            placeholder="Organization / City"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
