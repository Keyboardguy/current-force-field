import type { Metadata } from 'next'
import './globals.css'


export const metadata: Metadata = {
  title: 'Force, Current, Field',
  description: 'Becase Im really bad at these questions',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
