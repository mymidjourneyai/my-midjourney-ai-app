import Providers from "@modules/providers"
import clsx from "clsx"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import CommonClient from "./CommonClient"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: `AI-Generated Artwork | Powered by MyMidjourney API | ${process.env.NEXT_PUBLIC_SITE_NAME}`,
  description: `Experience the magic of AI-generated artwork at ${process.env.NEXT_PUBLIC_SITE_NAME}. Create, customize, and visualize unique artworks with mymidjourney.ai. Explore your creative potential with AI art.`,
  keywords: [
    "AI-Generated Painting",
    "Create Art Online",
    "Customize Artwork",
    "Artistic Innovation",
    `${process.env.NEXT_PUBLIC_SITE_NAME} AI Art`,
    `MyMidjourney API`,
    "Visualize Art",
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={clsx(
          inter.className,
          "bg-white text-base text-neutral-900 dark:bg-neutral-900 dark:text-neutral-200"
        )}
      >
        <Providers>
          <main className="relative">
            {children}
            <CommonClient />
          </main>
        </Providers>
      </body>
    </html>
  )
}
