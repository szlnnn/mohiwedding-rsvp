import { extendTheme, theme as baseTheme } from '@chakra-ui/react'

const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
}

const theme = extendTheme({
  config,
  fonts: {
    heading: `'Playfair Display', ${baseTheme.fonts?.heading}`,
    body: `'Open Sans', ${baseTheme.fonts?.body}`,
  },
  colors: {
    brand: {
      red: '#d44d3f',
      green: '#91a07d',
      beige: '#fdfcf9',
    },
  },
  styles: {
    global: {
      body: {
        bg: '#fdfcf9',
        color: 'gray.800',
        fontFamily: 'body',
      },
    },
  },
 components: {
      Switch: {
        baseStyle: {
          track: {
            bg: "#e0d6c9", // Soft sand (visible on beige)
            _checked: {
              bg: "#A3C49A", // your theme's green
            },
          },
          thumb: {
            bg: "#b29785", // muted mocha for visibility
            _checked: {
              bg: "white",
            },
          },
        },
      },
    }
})

export default theme
