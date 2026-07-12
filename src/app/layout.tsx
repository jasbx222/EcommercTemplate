import React from 'react'
import type { Metadata } from 'next'
import { Cairo } from 'next/font/google'
import './css/globals.css'
import { ThemeProvider } from '@/components/theme-provider'

const cairo = Cairo({ subsets: ["arabic", "latin"] });

export const metadata: Metadata = {
  title: 'ماتداش - نكست جي إس',
  description: 'تم إنشاؤه بواسطة create next app',
  icons: {
    icon: '/matdash-nextjs/favicon.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='ar' dir='rtl' suppressHydrationWarning>
      <head>
        <link rel='icon' href='/favicon.svg' type='image/svg+xml' />
        {/* {typeof window !== 'undefined' && <ThemeModeScript />} */}
      </head>
      <body className={`${cairo.className}`}>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
