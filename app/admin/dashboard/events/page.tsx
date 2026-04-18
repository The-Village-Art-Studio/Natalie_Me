"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { motion, AnimatePresence } from "framer-motion"
import { 
    Plus, 
    Trash2, 
    Edit2, 
    Calendar, 
    Loader2, 
    X, 
    ExternalLink,
    MapPin
} from "lucide-react"
import { toast } from "sonner"

interface Event {
    id: string
    title: string
    date_string: string
    description: string
    location: string
    link: string
    date_actual: string
}

export default function EventsManager() {
    const [events, setEvents] = useState<Event[]>([])
    const [loading, setLoading] = useState(true)
    const [isAdding, setIsAdding] = useState(false)
    const [isEditing, setIsEditing] = useState<Event | null>(null)

    // Form state
    const [formData, setFormData] = useState({
        title: "",
        date_string: "",
        description: "",
        location: "",
        link: "",
        date_actual: ""
    })

    useEffect(() => {
        fetchEvents()
    }, [])

    const fetchEvents = async () => {
        setLoading(true)
        const { data } = await supabase
            .from('events')
            .select('*')
            .order('date_actual', { ascending: false })
        
        if (data) setEvents(data)
        setLoading(false)
    }

    const resetForm = () => {
        setFormData({
            title: "",
            date_string: "",
            description: "",
            location: "",
            link: "",
            date_actual: ""
        })
        setIsAdding(false)
        setIsEditing(null)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        if (isEditing) {
            const { error } = await supabase
                .from('events')
                .update(formData)
                .eq('id', isEditing.id)
            
            if (error) toast.error("Failed to update event")
            else toast.success("Event updated!")
        } else {
            const { error } = await supabase
                .from('events')
                .insert([formData])
            
            if (error) toast.error("Failed to add event")
            else toast.success("Event added!")
        }

        fetchEvents()
        resetForm()
    }

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this event?")) return
        
        const { error } = await supabase
            .from('events')
            .delete()
            .eq('id', id)
        
        if (error) toast.error("Failed to delete event")
        else {
            toast.success("Event deleted")
            fetchEvents()
        }
    }

    const startEditing = (event: Event) => {
        setIsEditing(event)
        setFormData({
            title: event.title,
            date_string: event.date_string,
            description: event.description,
            location: event.location,
            link: event.link,
            date_actual: event.date_actual ? new Date(event.date_actual).toISOString().split('T')[0] : ""
        })
        setIsAdding(true)
    }

    return (
        <div className="space-y-12">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-light text-white mb-2">Events <span className="font-medium">Manager</span></h1>
                    <p className="text-white/40 text-sm font-light uppercase tracking-widest">Manage your exhibitions and shows</p>
                </div>
                {!isAdding && (
                    <button
                        onClick={() => setIsAdding(true)}
                        className="flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black text-sm font-medium hover:bg-white/90 transition-all active:scale-[0.98]"
                    >
                        <Plus className="w-4 h-4" />
                        New Event
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

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-white/60 text-xs font-light tracking-wide uppercase">Event Title</label>
                                        <input
                                            type="text"
                                            value={formData.title}
                                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                            required
                                            className="w-full px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-light focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all"
                                            placeholder="Miami Art Week"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-white/60 text-xs font-light tracking-wide uppercase">Date Display Text</label>
                                            <input
                                                type="text"
                                                value={formData.date_string}
                                                onChange={(e) => setFormData({ ...formData, date_string: e.target.value })}
                                                required
                                                className="w-full px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-light focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all"
                                                placeholder="Dec 3 - 7, 2025"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-white/60 text-xs font-light tracking-wide uppercase">Sort Date</label>
                                            <input
                                                type="date"
                                                value={formData.date_actual}
                                                onChange={(e) => setFormData({ ...formData, date_actual: e.target.value })}
                                                required
                                                className="w-full px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-light focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-white/60 text-xs font-light tracking-wide uppercase">Location</label>
                                        <div className="relative">
                                            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                                            <input
                                                type="text"
                                                value={formData.location}
                                                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                                required
                                                className="w-full pl-12 pr-5 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-light focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all"
                                                placeholder="Convention Center"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-white/60 text-xs font-light tracking-wide uppercase">External Link (Optional)</label>
                                        <input
                                            type="url"
                                            value={formData.link}
                                            onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                                            className="w-full px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-light focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all"
                                            placeholder="https://..."
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-white/60 text-xs font-light tracking-wide uppercase">Description</label>
                                        <textarea
                                            value={formData.description}
                                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                            required
                                            rows={5}
                                            className="w-full px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-light focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all resize-none"
                                            placeholder="Group Exhibition by ARTBOXY..."
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full py-4 rounded-xl bg-white text-black text-sm font-medium hover:bg-white/90 active:scale-[0.98] transition-all disabled:opacity-50"
                                    >
                                        {isEditing ? "Update Event" : "Save Event"}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Events List */}
            {loading && events.length === 0 ? (
                <div className="flex justify-center py-20">
                    <Loader2 className="w-8 h-8 text-white/20 animate-spin" />
                </div>
            ) : (
                <div className="space-y-4">
                    {events.map((event) => (
                        <motion.div
                            key={event.id}
                            layout
                            className="p-8 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between group hover:border-white/20 transition-all duration-300"
                        >
                            <div className="space-y-2 max-w-2xl">
                                <div className="flex items-center gap-3">
                                    <span className="text-[10px] uppercase tracking-widest text-white/40">{event.date_string}</span>
                                    {event.link && <ExternalLink className="w-3 h-3 text-white/20" />}
                                </div>
                                <h3 className="text-xl font-medium text-white">{event.title}</h3>
                                <div className="flex items-center gap-2 text-white/40 text-xs">
                                    <MapPin className="w-3 h-3" />
                                    {event.location}
                                </div>
                            </div>

                            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button 
                                    onClick={() => startEditing(event)}
                                    className="p-3 rounded-xl bg-white/5 text-white/60 hover:text-white hover:bg-white/10 border border-white/10 transition-all"
                                >
                                    <Edit2 className="w-4 h-4" />
                                </button>
                                <button 
                                    onClick={() => handleDelete(event.id)}
                                    className="p-3 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white border border-red-500/20 transition-all"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                    {events.length === 0 && !isAdding && (
                        <div className="py-20 text-center border border-dashed border-white/10 rounded-3xl">
                            <Calendar className="w-12 h-12 text-white/10 mx-auto mb-4" />
                            <p className="text-white/40 font-light">No events scheduled. Add your first exhibition above.</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}
