import { extendTheme } from "@chakra-ui/react"

export const theme = extendTheme({
    // fonts: {
    //     heading: `'Press Start 2P', 'Segoe UI', 'sans-serif'`
    // },
    styles: {
        global: {
            'html': {
                minH: '100vh',
                color: 'cyan.50',
            },
            'body': {
                // bg: 'transparent'
                color: 'cyan.100',
                bgGradient: 'linear(to-br, gray.900, purple.900)',
            }
        },
    },
})