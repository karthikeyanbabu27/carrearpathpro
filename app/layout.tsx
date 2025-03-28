import { GeistSans, GeistMono } from 'geist/font'
import './globals.css'
import AuthProvider from './components/AuthProvider'
import Navbar from './components/navbar'

export const metadata = {
  title: 'Career Path Assessment',
  description: 'Take our test to discover the perfect course for your skills',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="antialiased bg-gray-50">
        
        <AuthProvider>
        <Navbar/>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}