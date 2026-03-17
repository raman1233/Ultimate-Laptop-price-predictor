import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Laptop Price Predictor - AI-Powered Valuation',
  description: 'Get accurate laptop price predictions powered by machine learning. Analyze specs and market trends to find the best value.',
  keywords: 'laptop price predictor, laptop valuation, price estimation, machine learning',
  authors: [{ name: 'Raman' }],
  openGraph: {
    title: 'Laptop Price Predictor',
    description: 'AI-powered laptop price prediction tool',
    type: 'website',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#000000',
  colorScheme: 'dark',
  userScalable: true,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
