import './globals.css'
import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Figtree } from 'next/font/google'

const figtree = Figtree({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700'],
  display: 'swap',
  variable: '--font-figtree',
})

export const metadata: Metadata = {
  title: 'Case Montink',
  description: 'Caso de teste para a Montink',
  icons: {
    icon: [
      {
        url: 'https://montink.s3.amazonaws.com/perfil_montink/172302302166b33eadc255c.png',
        sizes: '16x16',
        type: 'image/png',
      },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={figtree.variable}>
      <body className="font-figtree bg-white text-gray-800 antialiased min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
