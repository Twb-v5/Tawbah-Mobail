import type { Metadata, Viewport } from "next"
import { Tajawal, Amiri } from "next/font/google"
import "./globals.css"

const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-sans",
})

const amiri = Amiri({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-display",
})

export const metadata: Metadata = {
  title: "دليل التوبة النصوح",
  description: "تطبيق إسلامي للمساعدة على التوبة والرجوع إلى الله",
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf9f6" },
    { media: "(prefers-color-scheme: dark)", color: "#0D1F15" },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body className={`${tajawal.variable} ${amiri.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}
