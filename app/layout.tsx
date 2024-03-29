import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Nav from './components/Nav'
import AuthContext from './context/AuthContext'
import 'react-datepicker/dist/react-datepicker.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'OpenTable',
  description: 'OpenTable Clone',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className+ ' text-black'}>
      <main className="bg-gray-100 min-h-screen w-screen">
        <AuthContext>
          <main className="max-w-screen-2xl m-auto bg-white">
            <Nav/>
            {children}
          </main>
        </AuthContext>
      </main>
      </body>
    </html>
  )
}
