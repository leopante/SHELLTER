import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'The Shellter - Join the Crab Revolution! 🦀',
  description: 'The ultimate meme coin shelter in the crypto storm. Join early, earn more! Be part of the Shellter movement.',
  keywords: 'meme coin, crypto, shellter, crab coin, cryptocurrency, investment',
  openGraph: {
    title: 'The Shellter - Join the Crab Revolution!',
    description: 'The earlier you enter, the more you earn! Join The Shellter now!',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="crab-cursor">
        <div className="ocean-waves"></div>
        <div className="bubbles">
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
        </div>
        {children}
      </body>
    </html>
  )
}
