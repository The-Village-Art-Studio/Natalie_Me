"use client"

import Header from "@/components/header"
import ShaderBackground from "@/components/shader-background"
import Link from "next/link"
import { useState } from "react"
import { toast } from "sonner"
import { Loader2, Send, CheckCircle2 } from "lucide-react"

export default function ContactPage() {
    const [loading, setLoading] = useState(false)
    const [submitted, setSubmitted] = useState(false)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)

        const formData = new FormData(e.currentTarget)
        const data = Object.fromEntries(formData.entries())

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            })

            if (response.ok) {
                setSubmitted(true)
                toast.success("Message sent successfully!")
            } else {
                toast.error("Failed to send message. Please try again.")
            }
        } catch (error) {
            console.error(error)
            toast.error("An error occurred. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <ShaderBackground>
            <Header />
            <main className="relative z-10 flex items-center justify-center min-h-screen px-8 py-24">
                <div className="max-w-lg text-center">
                    {/* Page Title */}
                    <h1 className="text-4xl md:text-5xl font-light text-white mb-6">
                        <span className="font-medium">Get in Touch</span>
                    </h1>

                    {/* Bio */}
                    <p className="text-white/60 text-sm font-light mb-8 leading-relaxed">
                        Hi! My name is Natalie, and I&apos;m a painter with a Ukrainian background. For inquiries about commissions, collaborations, or to purchase artwork, feel free to reach out through the form below or Instagram.
                    </p>

                    {/* Contact Form */}
                    {submitted ? (
                        <div className="w-full max-w-md mx-auto p-12 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 flex flex-col items-center space-y-4">
                            <CheckCircle2 className="w-12 h-12 text-green-400 mb-2" />
                            <h2 className="text-xl font-light text-white">Message Received</h2>
                            <p className="text-white/40 text-sm font-light">Thank you for reaching out! I&apos;ll get back to you as soon as possible.</p>
                            <button 
                                onClick={() => setSubmitted(false)}
                                className="mt-6 text-white/60 hover:text-white text-xs uppercase tracking-widest underline underline-offset-4"
                            >
                                Send another message
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 space-y-5">
                            {/* Name Field */}
                            <div className="space-y-2 text-left">
                                <label htmlFor="name" className="block text-white/80 text-xs font-light tracking-wide uppercase px-2">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    required
                                    disabled={loading}
                                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-light placeholder:text-white/20 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all duration-200 disabled:opacity-50"
                                    placeholder="Your name"
                                />
                            </div>

                            {/* Email Field */}
                            <div className="space-y-2 text-left">
                                <label htmlFor="email" className="block text-white/80 text-xs font-light tracking-wide uppercase px-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    required
                                    disabled={loading}
                                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-light placeholder:text-white/20 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all duration-200 disabled:opacity-50"
                                    placeholder="your@email.com"
                                />
                            </div>

                            {/* Subject Field */}
                            <div className="space-y-2 text-left">
                                <label htmlFor="subject" className="block text-white/80 text-xs font-light tracking-wide uppercase px-2">
                                    Subject
                                </label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    required
                                    disabled={loading}
                                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-light placeholder:text-white/20 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all duration-200 disabled:opacity-50"
                                    placeholder="Commission inquiry, collaboration, etc."
                                />
                            </div>

                            {/* Message Field */}
                            <div className="space-y-2 text-left">
                                <label htmlFor="message" className="block text-white/80 text-xs font-light tracking-wide uppercase px-2">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows={4}
                                    required
                                    disabled={loading}
                                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-light placeholder:text-white/20 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all duration-200 resize-none disabled:opacity-50"
                                    placeholder="Tell me about your project..."
                                />
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3.5 mt-2 rounded-xl bg-white text-black text-sm font-medium hover:bg-white/90 active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        Send Message
                                        <Send className="w-3.5 h-3.5" />
                                    </>
                                )}
                            </button>
                        </form>
                    )}

                    {/* Back to Home */}
                    <div className="mt-12">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm font-light transition-colors duration-200"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Back to Home
                        </Link>
                    </div>
                </div>
            </main>
        </ShaderBackground>
    )
}
