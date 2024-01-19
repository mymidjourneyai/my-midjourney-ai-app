"use client"

import { ImagineProvider } from "@lib/context/imagine-context"
import { ThemeProvider } from "next-themes"
import React from "react"

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <ImagineProvider>{children}</ImagineProvider>
    </ThemeProvider>
  )
}
