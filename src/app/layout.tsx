import Logo from "@/components/Logo"
import { GlobalProviders } from "./global-providers"
import { Container } from '@chakra-ui/react'
import { Analytics } from "@vercel/analytics/react"

export const metadata = {
  title: 'Math Battle'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <GlobalProviders>
          <Container>
            <Logo />
            {children}
            <Analytics />
          </Container>
        </GlobalProviders>
      </body>
    </html>
  )
}
