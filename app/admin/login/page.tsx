"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"
import AtmosphereBackground from "@/components/atmosphere-background"
import { motion } from "framer-motion"

export default function LoginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()

    useEffect(() => {
        const checkUser = async () => {
            const { data: { session } } = await supabase.auth.getSession()
            if (session) {
                router.push("/admin/dashboard")
            }
        }
        checkUser()
    }, [router])

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        if (error) {
            setError(error.message)
            setLoading(false)
        } else {
            router.push("/admin/dashboard")
        }
    }

    return (
        <div className="relative min-h-screen">
            <AtmosphereBackground />
            <main className="relative z-10 flex min-h-screen items-center justify-center px-8">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="w-full max-w-md p-10 rounded-3xl bg-white/70 backdrop-blur-2xl border border-black/[0.06] shadow-xl"
                >
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-light text-stone-900 mb-2">
                            Natalie<span className="font-medium the-seasons">_</span>Me Admin
                        </h1>
                        <p className="text-stone-400 text-sm font-light uppercase tracking-widest">
                            Sign in to manage your portfolio
                        </p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-stone-600 text-xs font-light tracking-wide uppercase">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full px-5 py-3 rounded-xl bg-white/60 border border-black/[0.08] text-stone-900 text-sm font-light placeholder:text-stone-400 focus:outline-none focus:border-stone-400 focus:bg-white transition-all duration-200"
                                placeholder="hello@example.com"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-stone-600 text-xs font-light tracking-wide uppercase">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full px-5 py-3 rounded-xl bg-white/60 border border-black/[0.08] text-stone-900 text-sm font-light placeholder:text-stone-400 focus:outline-none focus:border-stone-400 focus:bg-white transition-all duration-200"
                                placeholder="••••••••"
                            />
                        </div>

                        {error && (
                            <motion.p 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-red-500 text-xs font-light text-center"
                            >
                                {error}
                            </motion.p>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-4 mt-4 rounded-xl bg-stone-900 text-white text-sm font-medium hover:bg-stone-800 active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? "Signing in..." : "Sign In"}
                        </button>
                    </form>
                </motion.div>
            </main>
        </div>
    )
}
