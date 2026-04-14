import type React from "react"
import type { Metadata } from "next"
import { Josefin_Sans } from "next/font/google"
import localFont from "next/font/local"
import { GeistMono } from "geist/font/mono"
import "./globals.css"
import BackToTop from "@/components/back-to-top"
import AtmosphereBackground from "@/components/atmosphere-background"

const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  variable: "--font-josefin-sans",
  display: "swap",
})

const theSeasons = localFont({
  src: [
    {
      path: "../public/the-seasons/Fontspring-DEMO-theseasons-lt.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/the-seasons/Fontspring-DEMO-theseasons-reg.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/the-seasons/Fontspring-DEMO-theseasons-bd.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-the-seasons",
})

export const metadata: Metadata = {
  title: "Natalie_Me | Contemporary Artist",
  description: "Ukrainian-born painter creating meditative artwork that captures beauty in everyday life.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <style>{`
html {
  font-family: ${josefin.style.fontFamily};
  --font-sans: ${josefin.variable};
  --font-mono: ${GeistMono.variable};
  --font-the-seasons: ${theSeasons.variable};
}
        `}</style>
      </head>
      <body className={`${josefin.variable} ${theSeasons.variable} bg-transparent`}>
        <AtmosphereBackground />
        {children}
        <BackToTop />
      </body>
    </html>
  )
}
