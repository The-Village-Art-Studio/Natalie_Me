"use client"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { supabase } from "@/lib/supabase"
import Link from "next/link"
import { 
    LayoutDashboard, 
    Image as ImageIcon, 
    Calendar, 
    User, 
    MessageSquare, 
    LogOut,
    Menu,
    X
} from "lucide-react"
import { cn } from "@/lib/utils"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState<any>(null)
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const router = useRouter()
    const pathname = usePathname()

    useEffect(() => {
        const fetchUser = async () => {
            const { data: { session } } = await supabase.auth.getSession()
            if (!session) {
                router.push("/admin/login")
            } else {
                setUser(session.user)
                setLoading(false)
            }
        }
        fetchUser()
    }, [router])

    const handleSignOut = async () => {
        await supabase.auth.signOut()
        router.push("/admin/login")
    }

    if (loading) {
        return (
            <div className="flex h-screen w-screen items-center justify-center bg-black">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-white"></div>
            </div>
        )
    }

    const navItems = [
        { name: "Overview", href: "/admin/dashboard", icon: LayoutDashboard },
        { name: "Gallery", href: "/admin/dashboard/gallery", icon: ImageIcon },
        { name: "Events", href: "/admin/dashboard/events", icon: Calendar },
        { name: "Bio/Profile", href: "/admin/dashboard/bio", icon: User },
        { name: "Messages", href: "/admin/dashboard/messages", icon: MessageSquare },
    ]

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white flex">
            {/* Sidebar */}
            <aside className={cn(
                "fixed inset-y-0 left-0 z-50 w-64 bg-black/50 backdrop-blur-xl border-r border-white/10 transition-transform duration-300 lg:static lg:translate-x-0",
                isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                <div className="flex flex-col h-full p-6">
                    <div className="mb-10 px-2">
                        <Link href="/" className="text-xl font-light">
                            Natalie<span className="font-medium the-seasons">_</span>Me Admin
                        </Link>
                    </div>

                    <nav className="flex-1 space-y-1">
                        {navItems.map((item) => {
                            const Icon = item.icon
                            const isActive = pathname === item.href
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={cn(
                                        "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-light transition-all duration-200",
                                        isActive 
                                            ? "bg-white text-black font-medium" 
                                            : "text-white/60 hover:text-white hover:bg-white/5"
                                    )}
                                    onClick={() => setIsSidebarOpen(false)}
                                >
                                    <Icon className={cn("w-4 h-4", isActive ? "text-black" : "text-white/60")} />
                                    {item.name}
                                </Link>
                            )
                        })}
                    </nav>

                    <div className="mt-auto pt-6 border-t border-white/10">
                        <button
                            onClick={handleSignOut}
                            className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-sm font-light text-red-400 hover:bg-red-400/10 transition-all duration-200"
                        >
                            <LogOut className="w-4 h-4" />
                            Sign Out
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Mobile Header */}
                <header className="lg:hidden flex items-center justify-between p-4 border-b border-white/10 bg-black/50 backdrop-blur-md">
                    <span className="text-lg font-light">Natalie<span className="font-medium the-seasons">_</span>Me</span>
                    <button 
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="p-2 rounded-lg bg-white/5 border border-white/10"
                    >
                        {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </header>

                <main className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-12">
                    <div className="max-w-6xl mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    )
}
