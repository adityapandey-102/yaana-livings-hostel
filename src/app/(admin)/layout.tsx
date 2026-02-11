export const metadata = {
  title: 'Yaana Admin',
  description: 'Admin dashboard for Yaana Livings',
  robots: {
    index: false,
    follow: false,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
    </>
  )
}
