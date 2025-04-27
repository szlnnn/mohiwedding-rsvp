import { extendTheme, theme as baseTheme } from '@chakra-ui/react';

const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  fonts: {
    heading: `'EB Garamond', ${baseTheme.fonts?.heading}`,
    body: `'EB Garamond', ${baseTheme.fonts?.body}`,
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
          bg: '#e0d6c9',
          _checked: {
            bg: '#A3C49A',
          },
        },
        thumb: {
          bg: '#b29785',
          _checked: {
            bg: 'white',
          },
        },
      },
    },
  },
});

export default theme;
