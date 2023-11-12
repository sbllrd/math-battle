import Logo from "@/components/Logo"
import { GlobalProviders } from "./global-providers"
import { Box, Container, Heading } from '@chakra-ui/react'

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
          </Container>
        </GlobalProviders>
      </body>
    </html>
  )
}
