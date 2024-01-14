import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Experience } from './Experience/Experience'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'Portfolio of abhishek bansal',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className='w-screen h-screen bg-black'>
          <Experience />
          {children}
        </div>
      </body>
    </html>
  )
}
