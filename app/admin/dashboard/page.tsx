"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { motion } from "framer-motion"
import { 
    Image as ImageIcon, 
    Calendar, 
    MessageSquare, 
    TrendingUp,
    ExternalLink
} from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
    const [stats, setStats] = useState({
        artworks: 0,
        events: 0,
        messages: 0
    })
    const [recentMessages, setRecentMessages] = useState<any[]>([])

    useEffect(() => {
        const fetchStats = async () => {
            const [
                { count: artworkCount },
                { count: eventCount },
                { count: messageCount },
                { data: messages }
            ] = await Promise.all([
                supabase.from('artworks').select('*', { count: 'exact', head: true }),
                supabase.from('events').select('*', { count: 'exact', head: true }),
                supabase.from('messages').select('*', { count: 'exact', head: true }),
                supabase.from('messages').select('*').order('created_at', { ascending: false }).limit(3)
            ])

            setStats({
                artworks: artworkCount || 0,
                events: eventCount || 0,
                messages: messageCount || 0
            })
            setRecentMessages(messages || [])
        }
        fetchStats()
    }, [])

    const cards = [
        { label: "Artworks", value: stats.artworks, icon: ImageIcon, color: "text-blue-400", bg: "bg-blue-400/10" },
        { label: "Events", value: stats.events, icon: Calendar, color: "text-purple-400", bg: "bg-purple-400/10" },
        { label: "Total Messages", value: stats.messages, icon: MessageSquare, color: "text-green-400", bg: "bg-green-400/10" },
    ]

    return (
        <div className="space-y-12">
            <div>
                <h1 className="text-4xl font-light text-white mb-2">Welcome back, <span className="font-medium">Natalie</span></h1>
                <p className="text-white/40 text-sm font-light uppercase tracking-widest">Dashboard Overview</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {cards.map((card, i) => {
                    const Icon = card.icon
                    return (
                        <motion.div
                            key={card.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="p-8 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-between group hover:border-white/20 transition-all duration-300"
                        >
                            <div>
                                <p className="text-white/40 text-xs font-light uppercase tracking-widest mb-1">{card.label}</p>
                                <p className="text-4xl font-light text-white">{card.value}</p>
                            </div>
                            <div className={`p-4 rounded-2xl ${card.bg} ${card.color}`}>
                                <Icon className="w-6 h-6" />
                            </div>
                        </motion.div>
                    )
                })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Messages */}
                <div className="space-y-6">
                    <div className="flex items-center justify-between px-2">
                        <h2 className="text-xl font-light text-white">Recent Messages</h2>
                        <Link href="/admin/dashboard/messages" className="text-white/40 hover:text-white transition-colors">
                            <ExternalLink className="w-4 h-4" />
                        </Link>
                    </div>
                    <div className="space-y-4">
                        {recentMessages.length > 0 ? (
                            recentMessages.map((msg) => (
                                <div key={msg.id} className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300">
                                    <div className="flex items-center justify-between mb-2">
                                        <h3 className="text-sm font-medium text-white">{msg.name}</h3>
                                        <span className="text-[10px] uppercase tracking-tighter text-white/30">
                                            {new Date(msg.created_at).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <p className="text-sm text-white/60 font-light truncate">{msg.subject}</p>
                                </div>
                            ))
                        ) : (
                            <div className="p-8 text-center rounded-2xl bg-white/5 border border-white/10">
                                <p className="text-white/30 text-sm font-light italic">No messages yet</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="space-y-6">
                    <h2 className="text-xl font-light text-white px-2">Quick Actions</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Link href="/admin/dashboard/gallery" className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/30 transition-all duration-300 flex items-center gap-4">
                            <TrendingUp className="w-5 h-5 text-blue-400" />
                            <span className="text-sm font-light">Add Artwork</span>
                        </Link>
                        <Link href="/admin/dashboard/events" className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/30 transition-all duration-300 flex items-center gap-4">
                            <TrendingUp className="w-5 h-5 text-purple-400" />
                            <span className="text-sm font-light">Post Event</span>
                        </Link>
                    </div>
                    
                    <div className="p-8 rounded-3xl bg-gradient-to-br from-white/10 to-transparent border border-white/10 relative overflow-hidden group">
                        <div className="relative z-10">
                            <h3 className="text-lg font-light text-white mb-2">View Your Site</h3>
                            <p className="text-white/40 text-sm font-light mb-6">See how your portfolio looks to the world.</p>
                            <Link 
                                href="/" 
                                target="_blank"
                                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white text-black text-xs font-medium hover:bg-white/90 transition-all"
                            >
                                Visit Live Site
                                <ExternalLink className="w-3 h-3" />
                            </Link>
                        </div>
                        <div className="absolute top-0 right-0 p-8 text-white/5 transform group-hover:scale-110 transition-transform duration-500">
                            <ImageIcon className="w-32 h-32" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
