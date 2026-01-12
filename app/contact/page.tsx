"use client"

import Header from "@/components/header"
import ShaderBackground from "@/components/shader-background"
import Link from "next/link"

export default function ContactPage() {
    return (
        <ShaderBackground>
            <Header />
            <main className="relative z-10 flex items-center justify-center min-h-screen px-8">
                <div className="max-w-lg text-center">
                    {/* Page Title */}
                    <h1 className="text-4xl md:text-5xl font-light text-white mb-6">
                        <span className="font-medium italic instrument">Get in Touch</span>
                    </h1>

                    {/* Bio */}
                    <p className="text-white/60 text-sm font-light mb-8 leading-relaxed">
                        Hi! My name is Natalie, and I&apos;m a painter with a Ukrainian background. For inquiries about commissions, collaborations, or to purchase artwork, feel free to reach out through Instagram.
                    </p>

                    {/* Contact Form */}
                    <form className="w-full max-w-md mx-auto p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 space-y-5">
                        {/* Name Field */}
                        <div className="space-y-2">
                            <label htmlFor="name" className="block text-white/80 text-xs font-light tracking-wide">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                required
                                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-light placeholder:text-white/30 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all duration-200"
                                placeholder="Your name"
                            />
                        </div>

                        {/* Email Field */}
                        <div className="space-y-2">
                            <label htmlFor="email" className="block text-white/80 text-xs font-light tracking-wide">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                required
                                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-light placeholder:text-white/30 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all duration-200"
                                placeholder="your@email.com"
                            />
                        </div>

                        {/* Subject Field */}
                        <div className="space-y-2">
                            <label htmlFor="subject" className="block text-white/80 text-xs font-light tracking-wide">
                                Subject
                            </label>
                            <input
                                type="text"
                                id="subject"
                                name="subject"
                                required
                                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-light placeholder:text-white/30 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all duration-200"
                                placeholder="Commission inquiry, collaboration, etc."
                            />
                        </div>

                        {/* Message Field */}
                        <div className="space-y-2">
                            <label htmlFor="message" className="block text-white/80 text-xs font-light tracking-wide">
                                Message
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                rows={4}
                                required
                                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-light placeholder:text-white/30 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all duration-200 resize-none"
                                placeholder="Tell me about your project..."
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full py-3.5 mt-2 rounded-xl bg-white text-black text-sm font-medium hover:bg-white/90 active:scale-[0.98] transition-all duration-200"
                        >
                            Send Message
                        </button>
                    </form>

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
