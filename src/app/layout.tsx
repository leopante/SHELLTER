import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'The Shellter | Survive the Storm',
  description: 'Join the crab revolution. When markets crash, crabs survive.',
  keywords: ['crypto', 'memecoin', 'shellter', 'defi'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body>{children}</body>
    </html>
  )
}
