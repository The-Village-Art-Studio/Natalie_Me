"use client"

import { useEffect, useState } from "react"

export default function AtmosphereBackground() {
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    // Check for prefers-reduced-motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReducedMotion(mediaQuery.matches)
    
    const handleMotionChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches)
    }
    
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleMotionChange)
    }
    
    return () => {
      if (mediaQuery.removeEventListener) {
         mediaQuery.removeEventListener("change", handleMotionChange)
      }
    }
  }, [])

  useEffect(() => {
    if (reducedMotion) return

    let currentX = 0
    let currentY = 0
    let targetX = 0
    let targetY = 0
    let animationFrameId: number

    const handleMouseMove = (e: MouseEvent) => {
      // Normalize to -1 to 1 based on screen size
      targetX = (e.clientX / window.innerWidth) * 2 - 1
      targetY = (e.clientY / window.innerHeight) * 2 - 1
    }

    if (typeof window !== "undefined") {
      window.addEventListener("mousemove", handleMouseMove)
    }

    const animate = () => {
      // Smooth lerp
      currentX += (targetX - currentX) * 0.05
      currentY += (targetY - currentY) * 0.05

      const el = document.getElementById("atmosphere-shadow")
      if (el) {
        // Translation boundaries: ~20px max movement
        const moveX = currentX * -20 
        const moveY = currentY * -20
        el.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("mousemove", handleMouseMove)
      }
      cancelAnimationFrame(animationFrameId)
    }
  }, [reducedMotion])

  // ============================================
  // TWEAK POINTS (Adjust these constants quickly)
  // ============================================
  const MOVEMENT_RANGE = -20 // Adjust max pixel movement
  const FABRIC_OPACITY = 0.12 // Recommended range: 0.05 - 0.20
  const BACKGROUND_OPACITY = 0.6 // Adjust 0.1 to 1.0 to control brightness (lower is darker)
  // ============================================

  return (
    <div className="fixed inset-0 z-[-100] pointer-events-none overflow-hidden bg-black">
      
      {/* Full Background (Leaf Shadow HD image) drifting with pointer */}
      <div 
        id="atmosphere-shadow"
        className="absolute w-[110%] h-[110%] -left-[5%] -top-[5%] transition-transform duration-75"
        style={{
          backgroundImage: "url('/backgrounds/leaf-shadow-hd.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: BACKGROUND_OPACITY,
          transform: "translate3d(0, 0, 0)",
          willChange: "transform"
        }}
      />

      {/* Fabric Texture Overlay (Static canvas feel) */}
      <div 
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{
          backgroundImage: "url('/backgrounds/fabric.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: FABRIC_OPACITY,
          mixBlendMode: "overlay"
        }}
      />

      {/* Optional vignette overlay to help frame the content and keep edge text readable */}
      <div 
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(0,0,0,0) 60%, rgba(0,0,0,0.4) 100%)",
        }}
      />
    </div>
  )
}
