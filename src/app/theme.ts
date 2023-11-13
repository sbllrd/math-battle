import { extendTheme } from "@chakra-ui/react"

export const theme = extendTheme({
    styles: {
        global: {
            'html': {
                minH: '100vh',
                color: 'cyan.50',
            },
            'body': {
                color: 'cyan.100',
                bgImage: "linear-gradient(rgba(0, 0, 0, 0.527),rgba(0, 0, 0, 0.5)), url('/images/bg.jpg')",
                bgPosition: "center",
                bgRepeat: "no-repeat",
            }
        },
    },
})