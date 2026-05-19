"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { motion, AnimatePresence } from "framer-motion"
import { 
    MessageSquare, 
    Trash2, 
    Check, 
    Mail, 
    Loader2, 
    X, 
    User,
    ArrowRight
} from "lucide-react"
import { toast } from "sonner"

interface Message {
    id: string
    name: string
    email: string
    subject: string
    message: string
    status: string
    created_at: string
}

export default function MessagesInbox() {
    const [messages, setMessages] = useState<Message[]>([])
    const [loading, setLoading] = useState(true)
    const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)

    useEffect(() => {
        fetchMessages()
    }, [])

    const fetchMessages = async () => {
        setLoading(true)
        const { data } = await supabase
            .from('messages')
            .select('*')
            .order('created_at', { ascending: false })
        
        if (data) setMessages(data)
        setLoading(false)
    }

    const toggleStatus = async (id: string, currentStatus: string) => {
        const newStatus = currentStatus === 'unread' ? 'read' : 'unread'
        const { error } = await supabase
            .from('messages')
            .update({ status: newStatus })
            .eq('id', id)
        
        if (error) toast.error("Failed to update status")
        else {
            setMessages(messages.map(m => m.id === id ? { ...m, status: newStatus } : m))
            if (selectedMessage?.id === id) {
                setSelectedMessage({ ...selectedMessage, status: newStatus })
            }
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this message?")) return
        
        const { error } = await supabase
            .from('messages')
            .delete()
            .eq('id', id)
        
        if (error) toast.error("Failed to delete message")
        else {
            toast.success("Message deleted")
            setMessages(messages.filter(m => m.id !== id))
            if (selectedMessage?.id === id) setSelectedMessage(null)
        }
    }

    return (
        <div className="h-[calc(100vh-200px)] flex flex-col lg:flex-row gap-8">
            {/* Inbox List */}
            <div className="lg:w-1/3 flex flex-col space-y-6">
                <div>
                    <h1 className="text-4xl font-light text-stone-900 mb-2">Inbox</h1>
                    <p className="text-stone-400 text-sm font-light uppercase tracking-widest">Manage your inquiries</p>
                </div>

                <div className="flex-1 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
                    {loading ? (
                        <div className="flex justify-center py-10">
                            <Loader2 className="w-6 h-6 text-stone-300 animate-spin" />
                        </div>
                    ) : messages.length > 0 ? (
                        messages.map((msg) => (
                            <button
                                key={msg.id}
                                onClick={() => setSelectedMessage(msg)}
                                className={`w-full text-left p-6 rounded-2xl border transition-all duration-300 ${
                                    selectedMessage?.id === msg.id 
                                        ? "bg-stone-900 border-stone-900 text-white" 
                                        : "bg-white/50 backdrop-blur-md border-black/[0.06] text-stone-900 hover:bg-white/70 hover:border-black/[0.12]"
                                }`}
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <span className={`text-[10px] uppercase tracking-widest ${
                                        selectedMessage?.id === msg.id ? "text-white/50" : "text-stone-400"
                                    }`}>
                                        {new Date(msg.created_at).toLocaleDateString()}
                                    </span>
                                    {msg.status === 'unread' && (
                                        <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                                    )}
                                </div>
                                <h3 className="text-sm font-medium truncate">{msg.name}</h3>
                                <p className={`text-xs mt-1 truncate ${
                                    selectedMessage?.id === msg.id ? "text-white/60" : "text-stone-500"
                                }`}>
                                    {msg.subject}
                                </p>
                            </button>
                        ))
                    ) : (
                        <div className="py-20 text-center border border-dashed border-black/[0.08] rounded-3xl bg-white/20">
                            <MessageSquare className="w-8 h-8 text-stone-300 mx-auto mb-4" />
                            <p className="text-stone-400 text-xs font-light">Inbox is empty</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Message Detail */}
            <div className="flex-1 flex flex-col">
                <AnimatePresence mode="wait">
                    {selectedMessage ? (
                        <motion.div
                            key={selectedMessage.id}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="h-full flex flex-col p-8 md:p-12 rounded-3xl bg-white/60 backdrop-blur-md border border-black/[0.06] shadow-sm"
                        >
                            <div className="flex items-center justify-between mb-12">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center">
                                        <User className="w-5 h-5 text-stone-500" />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-medium text-stone-900">{selectedMessage.name}</h2>
                                        <p className="text-sm text-stone-500 font-light">{selectedMessage.email}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <button 
                                        onClick={() => toggleStatus(selectedMessage.id, selectedMessage.status)}
                                        className={`p-3 rounded-xl border transition-all ${
                                            selectedMessage.status === 'read' 
                                                ? "bg-blue-500/10 text-blue-600 border-blue-500/20" 
                                                : "text-stone-400 border-black/[0.08] hover:text-stone-900 bg-white/60"
                                        }`}
                                        title={selectedMessage.status === 'unread' ? "Mark as read" : "Mark as unread"}
                                    >
                                        <Check className="w-4 h-4" />
                                    </button>
                                    <button 
                                        onClick={() => handleDelete(selectedMessage.id)}
                                        className="p-3 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white border border-red-500/20 transition-all"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            <div className="flex-1 space-y-8">
                                <div>
                                    <label className="text-[10px] uppercase tracking-widest text-stone-400 mb-2 block">Subject</label>
                                    <p className="text-lg font-light text-stone-900">{selectedMessage.subject}</p>
                                </div>
                                <div className="h-px w-full bg-gradient-to-r from-black/[0.06] to-transparent" />
                                <div>
                                    <label className="text-[10px] uppercase tracking-widest text-stone-400 mb-2 block">Message</label>
                                    <p className="text-base font-light text-stone-700 leading-relaxed whitespace-pre-wrap">
                                        {selectedMessage.message}
                                    </p>
                                </div>
                            </div>

                            <div className="mt-auto pt-8">
                                <a 
                                    href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`}
                                    className="inline-flex items-center gap-3 px-8 py-3 rounded-full bg-stone-900 text-white text-sm font-medium hover:bg-stone-800 transition-all"
                                >
                                    Reply via Email
                                    <Mail className="w-4 h-4" />
                                </a>
                            </div>
                        </motion.div>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center p-12 rounded-3xl border border-dashed border-black/[0.08] bg-white/20 text-center">
                            <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center mb-6">
                                <MessageSquare className="w-8 h-8 text-stone-300" />
                            </div>
                            <h2 className="text-xl font-light text-stone-900 mb-2">Select a message</h2>
                            <p className="text-sm text-stone-400 font-light max-w-xs">Click on an inquiry from the list on the left to read its details and reply.</p>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}
