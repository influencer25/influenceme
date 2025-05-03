import './globals.css'

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
      <body className="min-h-screen">{children}</body>
    </html>
  )
}
