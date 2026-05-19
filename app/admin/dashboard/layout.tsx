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
import AtmosphereBackground from "@/components/atmosphere-background"

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
            <div className="flex h-screen w-screen items-center justify-center bg-stone-50">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-stone-900"></div>
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
        <div className="min-h-screen text-stone-900 flex relative">
            <AtmosphereBackground />
            
            {/* Sidebar */}
            <aside className={cn(
                "fixed inset-y-0 left-0 z-50 w-64 bg-white/70 backdrop-blur-xl border-r border-stone-200 transition-transform duration-300 lg:static lg:translate-x-0",
                isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                <div className="flex flex-col h-full p-6">
                    <div className="mb-10 px-2">
                        <Link href="/" className="text-xl font-light">
                            <span className="font-medium the-seasons">Natalie<span className="font-sans font-thin">_</span>Me Admin</span>
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
                                            ? "bg-stone-900 text-white font-medium" 
                                            : "text-stone-600 hover:text-stone-900 hover:bg-stone-200/50"
                                    )}
                                    onClick={() => setIsSidebarOpen(false)}
                                >
                                    <Icon className={cn("w-4 h-4", isActive ? "text-white" : "text-stone-500")} />
                                    {item.name}
                                </Link>
                            )
                        })}
                    </nav>

                    <div className="mt-auto pt-6 border-t border-stone-200">
                        <button
                            onClick={handleSignOut}
                            className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-sm font-light text-red-600 hover:bg-red-50 transition-all duration-200"
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
                <header className="lg:hidden flex items-center justify-between p-4 border-b border-stone-200 bg-white/70 backdrop-blur-md">
                    <span className="text-lg font-light">
                        <span className="font-medium the-seasons">Natalie<span className="font-sans font-thin">_</span>Me</span>
                    </span>
                    <button 
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="p-2 rounded-lg bg-stone-100 border border-stone-200"
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
