'use client'

import { ReactNode } from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'

interface ThemeProviderProps {
    children: ReactNode
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
    return (
        <NextThemesProvider
        attribute="class"
        forcedTheme="dark"
        >
            {children}
        </NextThemesProvider>
    )
}