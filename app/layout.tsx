import './globals.css'
import { AuthProvider } from './context/AuthContext'

export const metadata = {
  title: 'InfluenceMe',
  description: 'Your social media influence platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
